import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment } from "../services/api/posts";

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [ "postComments", variables.postId ],
            });

            queryClient.invalidateQueries({
                queryKey: [ "post", variables.postId ],
            });
        },
        onError: (error) => {
            console.error("Failed to create comment:", error);
        },
    });
};
