import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();
    console.log(PostMessages);
    res.status(200).json(PostMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
