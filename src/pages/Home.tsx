import React from 'react';
import Navbar from '../components/Navigation/Navbar/Navbar.tsx';
import Sidenav from '../components/Navigation/Sidenav/Sidenav.tsx';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidenav />
      <main>
        <h1>Home page</h1>
      </main>
    </div>
  );
};

export default Home;
