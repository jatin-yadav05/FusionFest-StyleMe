const express = require('express');
const router = express.Router();
const Images = require('../models/ImageSchema');
const mongoose = require('mongoose');

// Save generated image
router.post('/save', async (req, res) => {
    try {
        console.log('Received save image request:', req.body);
        
        const { userId, imageUrl, category, name } = req.body;
        
        if (!userId || !imageUrl || !category) {
            console.log('Missing required fields:', { userId, imageUrl: !!imageUrl, category });
            return res.status(400).json({
                status: false,
                msg: "Missing required fields"
            });
        }

        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                status: false,
                msg: "Invalid user ID format"
            });
        }

        const newImage = new Images({
            userId,
            imageUrl,
            category,
            name: name || 'Generated Design'
        });

        await newImage.save();
        console.log('Image saved successfully:', newImage._id);

        res.json({
            status: true,
            msg: "Image saved successfully",
            data: newImage
        });

    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({
            status: false,
            msg: error.message || "Error saving image"
        });
    }
});

// Get user's images
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { category } = req.query; // Optional category filter

        let query = { userId };
        if (category) {
            query.category = category;
        }

        const images = await Images.find(query)
            .sort({ createdAt: -1 }) // Latest first
            .limit(50); // Limit to 50 images

        res.json({
            status: true,
            data: images
        });

    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({
            status: false,
            msg: "Error fetching images"
        });
    }
});

// Delete image
router.delete('/:imageId', async (req, res) => {
    try {
        const { imageId } = req.params;
        const { userId } = req.body; // For security

        const image = await Images.findOneAndDelete({
            _id: imageId,
            userId // Ensure user owns the image
        });

        if (!image) {
            return res.status(404).json({
                status: false,
                msg: "Image not found or unauthorized"
            });
        }

        res.json({
            status: true,
            msg: "Image deleted successfully"
        });

    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({
            status: false,
            msg: "Error deleting image"
        });
    }
});

// Add this new route
router.get('/analytics/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { timeframe = 'week' } = req.query;

        const now = new Date();
        let startDate;

        switch (timeframe) {
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            default: // week
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
        }

        const images = await Images.find({
            userId,
            createdAt: { $gte: startDate }
        }).sort({ createdAt: 1 });

        // Group images by date
        const groupedData = images.reduce((acc, img) => {
            const date = img.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Fill in missing dates
        const analytics = [];
        const currentDate = new Date(startDate);

        while (currentDate <= now) {
            const date = currentDate.toISOString().split('T')[0];
            analytics.push({
                date,
                count: groupedData[date] || 0
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        res.json({
            status: true,
            data: analytics
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            status: false,
            msg: "Error fetching analytics"
        });
    }
});

module.exports = router; 