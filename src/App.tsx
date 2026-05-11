import './app.scss';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/features/home/components/hero-section';
import FeatureCards from '@/features/home/components/feature-cards';
import CounterDemo from '@/features/home/components/counter-demo';
import PostsDemo from '@/features/home/components/posts-demo';

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <FeatureCards />
      <PostsDemo />
      <CounterDemo />
      <Footer />
    </div>
  );
}

export default App;
