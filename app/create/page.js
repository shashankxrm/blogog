import React from 'react';
import Header from '../../components/Header';
import Form from '../../components/Form';

const CreatePostPage = () => (
  <div>
    <Header />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <Form />
    </div>
  </div>
);

export default CreatePostPage;