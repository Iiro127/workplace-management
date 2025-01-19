import React from 'react';
import Navbar from '../components/Navbar/Navbar.tsx';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Hello world</h1>
      </main>
    </div>
  );
};

export default Home;
