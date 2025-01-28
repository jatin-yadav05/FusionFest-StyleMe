const express = require('express');
const router = express.Router();
const Images = require('../models/ImageSchema');
const mongoose = require('mongoose');

// Save generated image
router.post('/save', async (req, res) => {
    try {
        const { userId, imageUrl, category, name } = req.body;
        
        if (!userId || !imageUrl) {
            console.log('Missing required fields:', { userId, imageUrl: !!imageUrl, category });
            return res.status(400).json({
                status: false,
                msg: "Missing required fields"
            });
        }

        const newImage = new Images({
            userId,
            imageUrl,
            category: category || 'tops',
            name: name || 'Generated Design'
        });

        await newImage.save();

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
        const { category } = req.query;

        let query = { userId };
        if (category) {
            query.category = category;
        }

        const images = await Images.find(query)
            .sort({ createdAt: -1 })
            .limit(50);

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

// Update the analytics route
router.get('/analytics/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { timeframe = 'week' } = req.query;

        const now = new Date();
        let startDate;
        let groupByHour = false;

        switch (timeframe) {
            case 'year':
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'day':
                startDate = new Date(now.setHours(0, 0, 0, 0));
                groupByHour = true;
                break;
            default: // week
                startDate = new Date(now);
                startDate.setDate(startDate.getDate() - 7);
                break;
        }

        // Get all images for this user
        const allImages = await Images.find({ userId }).sort({ createdAt: -1 });
        
        // Get images within the timeframe
        const timeframeImages = await Images.find({
            userId,
            createdAt: { $gte: startDate }
        }).sort({ createdAt: 1 });

        let analytics = [];

        if (groupByHour) {
            // Group by hours for daily view
            const hourlyData = new Array(24).fill(0);
            timeframeImages.forEach(img => {
                const hour = new Date(img.createdAt).getHours();
                hourlyData[hour]++;
            });

            analytics = hourlyData.map((count, hour) => ({
                time: `${hour.toString().padStart(2, '0')}:00`,
                count
            }));
        } else {
            // Group by date for other timeframes
            const groupedData = timeframeImages.reduce((acc, img) => {
                const date = img.createdAt.toISOString().split('T')[0];
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            // Fill in missing dates
            const currentDate = new Date(startDate);
            while (currentDate <= now) {
                const date = currentDate.toISOString().split('T')[0];
                analytics.push({
                    date,
                    count: groupedData[date] || 0
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        // Calculate statistics
        const totalImages = allImages.length;
        const timeframeTotal = timeframeImages.length;
        const averagePerDay = timeframeTotal / ((now - startDate) / (1000 * 60 * 60 * 24));
        
        // Get category distribution
        const categoryStats = allImages.reduce((acc, img) => {
            acc[img.category] = (acc[img.category] || 0) + 1;
            return acc;
        }, {});

        res.json({
            status: true,
            data: {
                analytics,
                stats: {
                    total: totalImages,
                    timeframeTotal,
                    average: Math.round(averagePerDay * 100) / 100,
                    timeframe,
                    categoryDistribution: categoryStats
                }
            }
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