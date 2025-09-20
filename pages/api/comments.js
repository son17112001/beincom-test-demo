export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { postId, name, email, body } = req.body;

        // Validate required fields
        if (!postId || !name || !email || !body) {
            return res.status(400).json({
                message: 'Missing required fields: postId, name, email, body',
            });
        }

        // Validate postId is a number
        const postIdNum = parseInt(postId);
        if (isNaN(postIdNum) || postIdNum <= 0) {
            return res.status(400).json({
                message: 'Invalid postId',
            });
        }

        // Since JSONPlaceholder doesn't support creating comments,
        // we'll simulate a successful response with a mock comment
        const newComment = {
            id: Date.now(), // Generate a unique ID
            postId: postIdNum,
            name: name.trim(),
            email: email.trim(),
            body: body.trim(),
            createdAt: new Date().toISOString(),
        };

        // In a real application, you would save this to a database
        // For now, we'll just return the mock comment
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}
