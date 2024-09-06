import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header className="p-4 bg-gray-800 text-white">
    <nav className="container mx-auto flex justify-between">
      <Link href="/">Home</Link>
      <Link href="/create">Create Post</Link>
    </nav>
  </header>
);

export default Header;