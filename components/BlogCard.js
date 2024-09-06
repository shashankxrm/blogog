import React from 'react';
import Link from 'next/link';

const BlogCard = ({ post, onDelete }) => (
  <div className="border p-4 mb-4">
    <h2 className="text-xl font-bold">{post.title}</h2>
    <p>{post.content.substring(0, 100)}...</p>
    <div className="flex justify-between mt-4">
      <Link href={`/${post._id}`}>View</Link>
      <Link href={`/edit/${post._id}`}>Edit</Link>
      <button onClick={() => onDelete(post._id)} className="text-red-500">Delete</button>
    </div>
  </div>
);

export default BlogCard;