"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import Form from '../../../components/Form';

const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          console.log(`Fetching post with id: ${id}`);
          const response = await axios.get(`/posts/${id}`);
          console.log('API response:', response);
          if (response.data) {
            setPost(response.data);
          } else {
            console.error('No post data found in response');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    } else {
      console.error('No id found in query parameters');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        {/* Render the form with the post data */}
        <Form post={post} />
      </div>
    </div>
  );
};

export default EditPostPage;