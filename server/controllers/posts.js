import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
const LIMIT = 8;
export const getPosts = async (req, res) => {
  const { page } = req.query;
  console.log("GETTING");
  try {
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    console.log(posts.length);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  console.log("GETTING BY SEARCH");
  const { searchQuery, tags } = req.query;
  console.log(tags);

  try {
    const title = new RegExp(searchQuery, "i"); // i stands for ignore case
    const regexTags = tags
      ? tags.split(",").map((tag) => new RegExp(tag, "i"))
      : [];
    console.log(regexTags);
    let posts;
    if (searchQuery && tags) {
      posts = await PostMessage.find({
        $or: [{ title }, { tags: { $in: regexTags } }],
      });
    } else if (searchQuery) {
      posts = await PostMessage.find({ title });
    } else if (tags) {
      posts = await PostMessage.find({ tags: { $in: regexTags } });
    } else {
      posts = await PostMessage.find({}).sort({ _id: -1 }).limit(LIMIT);
    }

    console.log(posts.length);
    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  console.log("CREATING");
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("UPDATING");
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  console.log("DELETING");
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  console.log("LIKING POST");

  res.json(updatedPost);
};
