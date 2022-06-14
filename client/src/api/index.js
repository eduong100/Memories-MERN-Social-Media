import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  const storage = localStorage.getItem("profile");
  if (storage) {
    req.headers.Authorization = `Bearer ${JSON.parse(storage).token}`;
    if (JSON.parse(storage).result.locale) {
      console.log("IM GOOGLE");
      req.headers.id = JSON.parse(storage).result.id;
      console.log("SURVIVED");
    }
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`, likePost);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
