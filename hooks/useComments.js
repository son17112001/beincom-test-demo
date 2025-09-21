import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "../services/api/posts";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (data, variables) => {
            // Invalidate and refetch comments for the specific post
            queryClient.invalidateQueries({
                queryKey: [ "postComments", variables.postId ],
            });

            // Also invalidate the post query to update comment count if needed
            queryClient.invalidateQueries({
                queryKey: [ "post", variables.postId ],
            });
        },
        onError: (error) => {
            console.error("Failed to create comment:", error);
        },
    });
};
