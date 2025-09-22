import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiUtils from '../services/api/utils';

export const useApi = () => {
  const queryClient = useQueryClient();

  const useGet = (key, url, options = {}) => {
    return useQuery({
      queryKey: key,
      queryFn: () => apiUtils.get(url),
      ...options,
    });
  };

  const usePost = (options = {}) => {
    return useMutation({
      mutationFn: ({ url, data }) => apiUtils.post(url, data),
      ...options,
    });
  };

  const usePut = (options = {}) => {
    return useMutation({
      mutationFn: ({ url, data }) => apiUtils.put(url, data),
      ...options,
    });
  };

  const useDelete = (options = {}) => {
    return useMutation({
      mutationFn: ({ url }) => apiUtils.delete(url),
      ...options,
    });
  };

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
