import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiUtils from '../services/api/utils';

// Custom hook for API calls
export const useApi = () => {
  const queryClient = useQueryClient();

  // GET request hook
  const useGet = (key, url, options = {}) => {
    return useQuery({
      queryKey: key,
      queryFn: () => apiUtils.get(url),
      ...options,
    });
  };

  // POST request hook
  const usePost = (options = {}) => {
    return useMutation({
      mutationFn: ({ url, data }) => apiUtils.post(url, data),
      ...options,
    });
  };

  // PUT request hook
  const usePut = (options = {}) => {
    return useMutation({
      mutationFn: ({ url, data }) => apiUtils.put(url, data),
      ...options,
    });
  };

  // DELETE request hook
  const useDelete = (options = {}) => {
    return useMutation({
      mutationFn: ({ url }) => apiUtils.delete(url),
      ...options,
    });
  };

  // Invalidate queries
  const invalidateQueries = (queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    useGet,
    usePost,
    usePut,
    useDelete,
    invalidateQueries,
  };
};
