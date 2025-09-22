import axios from "axios";

import authCookie from "@/utils/cookie";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const postsApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

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

export const fetchPostById = async (postId) => {
    try {
        const response = await postsApi.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch post: ${error.message}`);
    }
};

export const fetchPostComments = async (postId) => {
    try {
        const response = await postsApi.get(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch comments: ${error.message}`);
    }
};

export const fetchUserById = async (userId) => {
    try {
        const response = await postsApi.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

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

export const createComment = async (commentData) => {
    try {
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
