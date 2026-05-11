import { useSamplePosts } from '../hooks/use-sample-query';
import './posts-demo.scss';

function PostsDemo() {
  const { data: posts, isLoading, error } = useSamplePosts();

  if (error) {
    return (
      <section className="posts-demo">
        <p className="posts-demo__error">데이터를 불러오지 못했습니다.</p>
      </section>
    );
  }

  return (
    <section className="posts-demo">
      <h2 className="posts-demo__title">TanStack Query Demo</h2>
      {isLoading ? (
        <p className="posts-demo__loading">불러오는 중...</p>
      ) : (
        <ul className="posts-demo__list">
          {posts?.map((post) => (
            <li key={post.id} className="posts-demo__item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default PostsDemo;
