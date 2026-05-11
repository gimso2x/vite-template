export interface Post {
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
