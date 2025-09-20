import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchPostComments, fetchPosts, fetchUserById, searchPosts } from '../services/api/posts';

export const useInfinitePosts = ({ limit = 10, searchQuery = '' } = {}) => {
    const queryFn = searchQuery ?
        ({ pageParam }) => searchPosts({ query: searchQuery, pageParam, limit }) :
        ({ pageParam }) => fetchPosts({ pageParam, limit });

    return useInfiniteQuery({
        queryKey: [ 'posts', { limit, searchQuery } ],
        queryFn,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};

export const usePost = (postId) => {
    return useQuery({
        queryKey: [ 'post', postId ],
        queryFn: () => fetchPostById(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000,
    });
};

export const usePostComments = (postId) => {
    return useQuery({
        queryKey: [ 'postComments', postId ],
        queryFn: () => fetchPostComments(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000,
    });
};

export const useUser = (userId) => {
    return useQuery({
        queryKey: [ 'user', userId ],
        queryFn: () => fetchUserById(userId),
        enabled: !!userId,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};
