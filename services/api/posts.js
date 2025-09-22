import axios from "axios";

import authCookie from "@/utils/cookie";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Create axios instance for posts API
const postsApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Fetch posts with pagination and sorting
export const fetchPosts = async ({ pageParam = 1, limit = 10, sortBy = 'id', order = 'desc' }) => {
    try {
        const response = await postsApi.get("/posts", {
            params: {
                _page: pageParam,
                _limit: limit,
                _sort: sortBy,
                _order: order,
            },
        });

        return {
            posts: response.data,
            nextPage: response.data.length === limit ? pageParam + 1 : undefined,
            hasNextPage: response.data.length === limit,
        };
    } catch (error) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
};

// Fetch single post by ID
export const fetchPostById = async (postId) => {
    try {
        const response = await postsApi.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch post: ${error.message}`);
    }
};

// Fetch comments for a post
export const fetchPostComments = async (postId) => {
    try {
        const response = await postsApi.get(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch comments: ${error.message}`);
    }
};

// Fetch user by ID
export const fetchUserById = async (userId) => {
    try {
        const response = await postsApi.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

// Search posts by title or body with sorting
export const searchPosts = async ({ query, pageParam = 1, limit = 10, sortBy = 'id', order = 'desc' }) => {
    try {
        const response = await postsApi.get("/posts", {
            params: {
                _page: pageParam,
                _limit: limit,
                q: query,
                _sort: sortBy,
                _order: order,
            },
        });

        return {
            posts: response.data,
            nextPage: response.data.length === limit ? pageParam + 1 : undefined,
            hasNextPage: response.data.length === limit,
        };
    } catch (error) {
        throw new Error(`Failed to search posts: ${error.message}`);
    }
};

// Create a new comment
export const createComment = async (commentData) => {
    try {
        // Get token from cookie
        const token = authCookie.get();

        const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create comment");
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to create comment: ${error.message}`);
    }
};
