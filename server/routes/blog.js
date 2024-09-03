// routes/blog.js
import express from 'express';
import BlogPost from '../models/BlogPost.js';
import multer from 'multer';

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route for creating a new blog post
router.post('/', upload.single('image'), async (req, res) => {
    const { title, content, author, tags } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newPost = new BlogPost({ title, content, author, tags: tags.split(','), image });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Route for fetching all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Route for fetching recent blog posts
router.get('/recent', async (req, res) => {
    try {
        const recentBlogs = await BlogPost.find().sort({ createdAt: -1 }).limit(3);
        res.status(200).json(recentBlogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recent blogs' });
    }
});

// Route for fetching a single blog post
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('ID in backend:', id);
    try {
        const post = await BlogPost.findById(id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        console.error('Failed to fetch post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// Route for deleting a blog post
router.delete('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Route for updating a blog post
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { title, content, author, tags } = req.body;
        const updateData = { title, content, author, tags: tags ? tags.split(',') : undefined };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});



export default router;
