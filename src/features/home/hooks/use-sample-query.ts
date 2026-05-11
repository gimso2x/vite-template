import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/sample';

export function useSamplePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}
