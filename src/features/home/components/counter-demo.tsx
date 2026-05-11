import { useState } from 'react';
import './counter-demo.scss';

function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <section className="counter-section">
      <p className="counter-section__value">{count}</p>
      <div className="counter-section__controls">
        <button type="button" className="btn btn--outline" onClick={() => setCount((c) => c - 1)}>
          − 감소
        </button>
        <button type="button" className="btn btn--primary" onClick={() => setCount((c) => c + 1)}>
          + 증가
        </button>
      </div>
    </section>
  );
}

export default CounterDemo;
