import express from 'express';
import linkedinController from '../controllers/linkedin.controller.js';

const router = express.Router();

// Test Puppeteer setup
router.get('/test', (req, res) => {
    linkedinController.testConnection(req, res);
});

// Debug scraping
router.post('/debug', (req, res) => {
    linkedinController.debugScrape(req, res);
});

// Main scraping endpoint
router.post('/scrape', (req, res) => {
    linkedinController.scrapeProfile(req, res);
});

export default router;