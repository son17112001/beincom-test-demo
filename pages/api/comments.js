import { authCookie } from '../../utils/cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ message: 'Authentication required' });
            }

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

            const { postId, name, email, body } = req.body;

            if (!postId || !name || !email || !body) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const comment = {
                id: Date.now(),
                postId: parseInt(postId),
                name,
                email,
                body,
                createdAt: new Date().toISOString(),
            };

            return res.status(201).json(comment);
        } catch (error) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
