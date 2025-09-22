import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchPostComments, fetchPosts, fetchUserById, searchPosts } from '../services/api/posts';

export const useInfinitePosts = ({
    limit = 10,
    searchQuery = '',
    sortBy = 'id',
    order = 'desc'
} = {}) => {
    const queryFn = searchQuery ?
        ({ pageParam }) => searchPosts({
            query: searchQuery,
            pageParam,
            limit,
            sortBy,
            order
        }) :
        ({ pageParam }) => fetchPosts({
            pageParam,
            limit,
            sortBy,
            order
        });

    return useInfiniteQuery({
        queryKey: [ 'posts', { limit, searchQuery, sortBy, order } ],
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
