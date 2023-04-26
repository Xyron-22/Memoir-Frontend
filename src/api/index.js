import axios from 'axios';

const {REACT_APP_API_URL, REACT_APP_USER} = process.env;

const API = axios.create({ baseURL: REACT_APP_API_URL });

API.interceptors.request.use((req) => {
    if(localStorage.getItem(REACT_APP_USER)) {
        if(JSON.parse(localStorage.getItem(REACT_APP_USER)).credential) {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(REACT_APP_USER)).credential}`
        } else {
            req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(REACT_APP_USER)).token}`
        }
    };

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`); 
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/LikedPost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value});


export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);