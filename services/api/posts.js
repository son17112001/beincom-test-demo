import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance for posts API
const postsApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Fetch posts with pagination
export const fetchPosts = async ({ pageParam = 1, limit = 10 }) => {
    try {
        const response = await postsApi.get('/posts', {
            params: {
                _page: pageParam,
                _limit: limit,
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

// Search posts by title or body
export const searchPosts = async ({ query, pageParam = 1, limit = 10 }) => {
    try {
        const response = await postsApi.get('/posts', {
            params: {
                _page: pageParam,
                _limit: limit,
                q: query,
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
