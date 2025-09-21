import { authCookie } from '../../utils/cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Check authentication
            const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            // Validate token
            const validateResponse = await fetch(`${req.headers.origin}/api/auth/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!validateResponse.ok) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const { postId, body, name, email } = req.body;

            if (!postId || !body || !name || !email) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Since JSONPlaceholder doesn't support real comment creation,
            // we'll simulate it by returning a mock comment
            const newComment = {
                id: Date.now(), // Generate a unique ID
                postId: parseInt(postId),
                name: name.trim(),
                email: email.trim(),
                body: body.trim(),
                createdAt: new Date().toISOString(),
            };

            // In a real application, you would save this to a database
            // For now, we'll just return the comment
            res.status(201).json({
                message: 'Comment added successfully',
                comment: newComment,
            });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else if (req.method === 'GET') {
        try {
            const { postId } = req.query;

            if (!postId) {
                return res.status(400).json({ message: 'Post ID is required' });
            }

            // Fetch comments from JSONPlaceholder
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comments = await response.json();

            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ message: 'Method not allowed' });
    }
}
