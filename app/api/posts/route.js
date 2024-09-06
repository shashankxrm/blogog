import Post from '@/database/models/Post';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const mongoURI ='mongodb+srv://shashankxrm:iNCORRECT%4045@cluster0.jnrtl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

export const GET = async (req) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get('id');

  try {
    if (id) {
      // Get a single post by ID
      const post = await Post.findById(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post, { status: 200 });
    } else {
      // Get all posts
      const posts = await Post.find();
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const { title, content } = await req.json();
    const newPost = new Post({ title, content });
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const PUT = async (req) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get('id');

  try {
    const { title, content } = await req.json();
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const id = searchParams.get('id');

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};