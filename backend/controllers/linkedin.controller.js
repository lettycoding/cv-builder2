import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

class LinkedInController {
    constructor() {
        this.browserConfig = {
            headless: 'new',
            timeout: 90000, // Increased timeout
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-blink-features=AutomationControlled', // Hide automation
                '--disable-extensions',
                '--disable-plugins',
                '--disable-default-apps',
                '--disable-sync',
                '--disable-translate',
                '--hide-scrollbars',
                '--mute-audio',
                '--no-default-browser-check',
                '--disable-infobars',
                '--window-size=1366,768'
            ]
        };

        // Rotating user agents
        this.userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        ];
    }

    // Main method to scrape LinkedIn profile with enhanced anti-detection
    async scrapeProfile(req, res) {
        try {
            const { linkedinUrl, waitTime = 15 } = req.body; // Increased default wait time

            if (!linkedinUrl) {
                return res.status(400).json({
                    success: false,
                    error: 'LinkedIn URL is required'
                });
            }

            if (!this.isValidLinkedInUrl(linkedinUrl)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid LinkedIn URL format'
                });
            }

            console.log(`🔍 Scraping LinkedIn profile with enhanced stealth: ${linkedinUrl}`);

            // Try multiple strategies
            let profileData = null;
            
            // Strategy 1: Stealth mode with delays
            profileData = await this.scrapeWithStealth(linkedinUrl, waitTime);
            
            if (!profileData) {
                // Strategy 2: Try with proxy rotation (if available)
                profileData = await this.scrapeWithRetry(linkedinUrl, waitTime);
            }
            
            if (!profileData) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to scrape profile - LinkedIn may be blocking the request',
                    suggestions: [
                        'Try again in a few minutes',
                        'Use a VPN or different IP address',
                        'Consider using LinkedIn API instead',
                        'Check if the profile is public'
                    ]
                });
            }

            res.json({
                success: true,
                data: {
                    url: linkedinUrl,
                    scrapedAt: new Date().toISOString(),
                    profile: profileData,
                    method: 'enhanced-puppeteer'
                }
            });

        } catch (error) {
            console.error('❌ Error in scrapeProfile:', error.message);
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: error.message
            });
        }
    }

    // Enhanced scraping with multiple fallback strategies
    async scrapeWithStealth(linkedinUrl, waitTime) {
        let browser = null;
        try {
            console.log('🥷 Launching stealth browser...');
            
            browser = await puppeteer.launch(this.browserConfig);
            const page = await browser.newPage();
            
            // Advanced anti-detection measures
            await this.setupStealthMode(page);
            
            console.log('🌐 Navigating with stealth mode...');
            
            // Multiple navigation attempts with different strategies
            const success = await this.navigateWithRetry(page, linkedinUrl);
            
            if (!success) {
                console.log('❌ Standard navigation failed, trying alternative approaches...');
                
                // Try search results approach
                await browser.close();
                const searchResult = await this.scrapeViaSearchResults(linkedinUrl);
                if (searchResult) return searchResult;
                
                // Try mobile version
                const mobileResult = await this.scrapeMobileVersion(linkedinUrl);
                if (mobileResult) return mobileResult;
                
                console.log('❌ All navigation attempts failed');
                return null;
            }
            
            // Progressive loading with human-like delays
            await this.humanLikeWait(waitTime);
            
            console.log('📊 Extracting profile data...');
            const profileData = await this.extractProfileData(page);
            
            // Validate that we got actual profile data, not a login page
            if (profileData && profileData.name && 
                profileData.name !== 'Join LinkedIn' && 
                !profileData.pageTitle.toLowerCase().includes('sign up')) {
                console.log('✅ Stealth scraping completed successfully');
                return profileData;
            } else {
                console.log('❌ Got login page instead of profile data');
                return null;
            }
            
        } catch (error) {
            console.error('❌ Stealth scraping failed:', error.message);
            return null;
        } finally {
            if (browser) {
                try {
                    await browser.close();
                } catch (e) {
                    console.error('Error closing browser:', e.message);
                }
            }
        }
    }

    // Setup advanced stealth mode with session cookies
    async setupStealthMode(page) {
        // Set random user agent
        const randomUA = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
        await page.setUserAgent(randomUA);
        
        // Set viewport to common resolution
        await page.setViewport({ 
            width: 1366, 
            height: 768,
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: true,
            isMobile: false
        });

        // Add realistic cookies to simulate logged-in session
        const cookies = [
            {
                name: 'bcookie',
                value: 'v=2&' + Math.random().toString(36).substring(2),
                domain: '.linkedin.com'
            },
            {
                name: 'bscookie',
                value: 'v=1&' + Math.random().toString(36).substring(2),
                domain: '.linkedin.com'
            },
            {
                name: 'lang',
                value: 'v=2&lang=en-us',
                domain: '.linkedin.com'
            }
        ];
        
        await page.setCookie(...cookies);

        // Override webdriver detection
        await page.evaluateOnNewDocument(() => {
            // Remove webdriver property
            delete navigator.__proto__.webdriver;
            
            // Override the plugins property to use a custom getter
            Object.defineProperty(navigator, 'plugins', {
                get: function() {
                    return [
                        {
                            name: 'Chrome PDF Plugin',
                            filename: 'internal-pdf-viewer',
                            description: 'Portable Document Format'
                        },
                        {
                            name: 'Chrome PDF Viewer',
                            filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
                            description: ''
                        }
                    ];
                },
            });
            
            // Override the languages property to use a custom getter
            Object.defineProperty(navigator, 'languages', {
                get: function() {
                    return ['en-US', 'en'];
                },
            });
            
            // Override the webdriver property to use a custom getter
            Object.defineProperty(navigator, 'webdriver', {
                get: function() {
                    return false;
                },
            });

            // Mock chrome object
            window.chrome = {
                runtime: {
                    onConnect: null,
                    onMessage: null
                }
            };

            // Mock permissions
            Object.defineProperty(navigator, 'permissions', {
                get: function() {
                    return {
                        query: function() {
                            return Promise.resolve({state: 'granted'});
                        }
                    };
                },
            });

            // Override connection property
            Object.defineProperty(navigator, 'connection', {
                get: function() {
                    return {
                        effectiveType: '4g',
                        rtt: 150,
                        downlink: 10
                    };
                },
            });
        });

        // Set extra headers with referrer
        await page.setExtraHTTPHeaders({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Referer': 'https://www.google.com/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1'
        });

        // Block unnecessary resources but allow critical ones
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            const resourceType = req.resourceType();
            const url = req.url();
            
            // Block images, media, fonts, but allow stylesheets and scripts
            if (resourceType === 'image' || resourceType === 'media' || 
                resourceType === 'font' || resourceType === 'other') {
                req.abort();
            } else if (url.includes('analytics') || url.includes('tracking') || 
                      url.includes('ads') || url.includes('doubleclick') ||
                      url.includes('googletagmanager')) {
                req.abort();
            } else {
                req.continue();
            }
        });
    }

    // Navigate with retry mechanism and login detection
    async navigateWithRetry(page, url, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔄 Navigation attempt ${attempt}/${maxRetries}`);
                
                // Add random delay between attempts
                if (attempt > 1) {
                    await setTimeout(Math.random() * 5000 + 2000); // 2-7 seconds
                }

                // Try different URL variations
                let urlsToTry = [url];
                
                // Add public profile variations
                if (url.includes('/in/')) {
                    const publicUrl = url.replace('/in/', '/pub/');
                    urlsToTry.push(publicUrl);
                    
                    // Try with different suffixes
                    const username = url.split('/in/')[1].replace('/', '');
                    urlsToTry.push(`https://linkedin.com/pub/${username}/en`);
                    urlsToTry.push(`https://linkedin.com/pub/${username}/profile`);
                }
                
                for (const testUrl of urlsToTry) {
                    console.log(`🌐 Trying URL: ${testUrl}`);
                    
                    try {
                        await page.goto(testUrl, { 
                            waitUntil: 'domcontentloaded',
                            timeout: 30000
                        });
                        
                        // Wait for page to stabilize
                        await setTimeout(3000);
                        
                        // Check if we hit a login wall
                        const pageContent = await page.evaluate(() => {
                            return {
                                title: document.title,
                                hasLoginForm: !!document.querySelector('form[action*="login"], .login-form, #login-submit'),
                                hasSignUpText: document.body.textContent.toLowerCase().includes('sign up'),
                                hasProfileContent: !!document.querySelector('h1[class*="name"], .profile-name, .pv-text-details__left-panel'),
                                url: window.location.href,
                                bodyText: document.body.textContent.substring(0, 500)
                            };
                        });
                        
                        console.log(`📊 Page analysis:`, pageContent);
                        
                        // Check if we successfully accessed profile content
                        if (!pageContent.hasLoginForm && !pageContent.hasSignUpText && 
                            !pageContent.title.toLowerCase().includes('sign up') &&
                            !pageContent.title.toLowerCase().includes('login')) {
                            console.log(`✅ Successfully accessed profile content`);
                            return true;
                        } else {
                            console.log(`🚫 Hit login wall or signup page`);
                        }
                        
                    } catch (navError) {
                        console.log(`❌ Failed to navigate to ${testUrl}: ${navError.message}`);
                    }
                }
                
            } catch (error) {
                console.log(`❌ Navigation attempt ${attempt} failed: ${error.message}`);
                
                if (attempt === maxRetries) {
                    return false;
                }
            }
        }
        return false;
    }

    // Human-like waiting patterns
    async humanLikeWait(baseWaitTime) {
        // Initial wait
        await setTimeout(baseWaitTime * 1000);
        
        // Random additional waits to simulate human reading
        for (let i = 0; i < 3; i++) {
            await setTimeout(Math.random() * 2000 + 1000); // 1-3 seconds
        }
    }

    // Retry mechanism with different strategies
    async scrapeWithRetry(linkedinUrl, waitTime, maxRetries = 2) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.log(`🔄 Retry attempt ${attempt}/${maxRetries}`);
            
            // Wait longer between retries
            if (attempt > 1) {
                await setTimeout(30000); // 30 second wait
            }
            
            const result = await this.scrapeWithStealth(linkedinUrl, waitTime + (attempt * 5));
            if (result) {
                return result;
            }
        }
        return null;
    }

    // Enhanced profile data extraction
    async extractProfileData(page) {
        return await page.evaluate(() => {
            const data = {};
            
            // Helper function to safely get text content
            const getTextContent = (selectors) => {
                for (const selector of selectors) {
                    const element = document.querySelector(selector);
                    if (element && element.textContent.trim()) {
                        return element.textContent.trim();
                    }
                }
                return null;
            };
            
            // Extract name with multiple fallback selectors
            data.name = getTextContent([
                'h1.text-heading-xlarge.inline.t-24.v-align-middle.break-words',
                'h1[data-anonymize="person-name"]',
                '.pv-text-details__left-panel h1',
                '.top-card-layout__title',
                'h1.break-words',
                'h1'
            ]);
            
            // Extract headline/title
            data.headline = getTextContent([
                '.text-body-medium.break-words',
                '.pv-text-details__left-panel .text-body-medium',
                '.top-card-layout__headline .break-words',
                '[data-anonymize="headline"]',
                '.pv-top-card--list-bullet .break-words'
            ]);
            
            // Extract location
            data.location = getTextContent([
                '.text-body-small.inline.t-black--light.break-words',
                '.pv-text-details__left-panel .text-body-small',
                '.top-card-layout__first-subline .break-words',
                '[data-anonymize="location"]'
            ]);
            
            // Extract about section with multiple strategies
            data.about = getTextContent([
                '.pv-shared-text-with-see-more .full-width .break-words span[aria-hidden="true"]',
                '.pv-about__text .break-words',
                '#about-section .pv-about__text',
                '.pv-about-section .break-words',
                '[data-anonymize="about"]'
            ]);
            
            // Extract connection count
            const connectionElements = document.querySelectorAll('.t-black--light.t-normal, .pv-top-card--list-bullet li');
            for (const element of connectionElements) {
                const text = element.textContent.trim();
                if (text.includes('connection') || text.includes('follower')) {
                    data.connections = text;
                    break;
                }
            }
            
            // Extract experiences with enhanced selectors
            data.experiences = [];
            const expSections = document.querySelectorAll('#experience ~ .pvs-list__container li, .experience-section li, [data-section="experienceSection"] li');
            
            for (let i = 0; i < Math.min(expSections.length, 5); i++) {
                const expElement = expSections[i];
                const experience = {};
                
                // Title
                const titleEl = expElement.querySelector('.t-bold span[aria-hidden="true"], h3 span[aria-hidden="true"], .mr1.t-bold span[aria-hidden="true"]');
                if (titleEl) experience.title = titleEl.textContent.trim();
                
                // Company
                const companyEl = expElement.querySelector('.t-14.t-normal span[aria-hidden="true"], .pv-entity__secondary-title');
                if (companyEl && companyEl.textContent.trim() !== experience.title) {
                    experience.company = companyEl.textContent.trim();
                }
                
                // Duration
                const durationEl = expElement.querySelector('.t-12.t-normal.t-black--light span[aria-hidden="true"], .pv-entity__bullet-item');
                if (durationEl) experience.duration = durationEl.textContent.trim();
                
                if (experience.title || experience.company) {
                    data.experiences.push(experience);
                }
            }
            
            // Extract education
            data.education = [];
            const eduSections = document.querySelectorAll('#education ~ .pvs-list__container li, .education-section li, [data-section="educationSection"] li');
            
            for (let i = 0; i < Math.min(eduSections.length, 3); i++) {
                const eduElement = eduSections[i];
                const edu = {};
                
                const schoolEl = eduElement.querySelector('.t-bold span[aria-hidden="true"], h3 span[aria-hidden="true"]');
                if (schoolEl) edu.school = schoolEl.textContent.trim();
                
                const degreeEl = eduElement.querySelector('.t-14.t-normal span[aria-hidden="true"]');
                if (degreeEl && degreeEl.textContent.trim() !== edu.school) {
                    edu.degree = degreeEl.textContent.trim();
                }
                
                if (edu.school || edu.degree) {
                    data.education.push(edu);
                }
            }
            
            // Extract skills
            data.skills = [];
            const skillElements = document.querySelectorAll('#skills ~ .pvs-list__container .t-bold span[aria-hidden="true"], .skill-category-entity__name span[aria-hidden="true"]');
            
            for (let i = 0; i < Math.min(skillElements.length, 10); i++) {
                const skill = skillElements[i].textContent.trim();
                if (skill && !data.skills.includes(skill)) {
                    data.skills.push(skill);
                }
            }
            
            // Page verification
            data.pageTitle = document.title;
            data.isLinkedInProfile = window.location.hostname.includes('linkedin.com') && window.location.pathname.includes('/in/');
            
            return data;
        });
    }

    // Alternative approach: Try accessing via Google search results
    async scrapeViaSearchResults(linkedinUrl) {
        let browser = null;
        try {
            console.log('🔍 Attempting to access via search results...');
            
            browser = await puppeteer.launch(this.browserConfig);
            const page = await browser.newPage();
            await this.setupStealthMode(page);
            
            // Extract username from LinkedIn URL
            const username = linkedinUrl.split('/in/')[1].replace('/', '');
            const searchQuery = `site:linkedin.com/in ${username}`;
            
            // Search on Google first
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });
            
            await setTimeout(2000);
            
            // Look for LinkedIn profile links in search results
            const linkedinLinks = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('a[href*="linkedin.com/in"]'));
                return links.map(link => link.href).filter(href => href.includes('/in/'));
            });
            
            console.log('🔗 Found LinkedIn links in search results:', linkedinLinks);
            
            // Try each link
            for (const link of linkedinLinks.slice(0, 3)) {
                try {
                    await page.goto(link, {
                        waitUntil: 'domcontentloaded',
                        timeout: 30000
                    });
                    
                    await setTimeout(3000);
                    
                    // Check if we successfully accessed the profile
                    const pageInfo = await page.evaluate(() => ({
                        title: document.title,
                        hasProfile: !!document.querySelector('h1'),
                        isSignUp: document.title.toLowerCase().includes('sign up') || 
                                document.body.textContent.toLowerCase().includes('join linkedin')
                    }));
                    
                    if (!pageInfo.isSignUp && pageInfo.hasProfile) {
                        console.log('✅ Successfully accessed profile via search result');
                        return await this.extractProfileData(page);
                    }
                } catch (e) {
                    console.log(`❌ Failed to access ${link}: ${e.message}`);
                }
            }
            
            return null;
            
        } catch (error) {
            console.error('❌ Search results approach failed:', error.message);
            return null;
        } finally {
            if (browser) {
                try {
                    await browser.close();
                } catch (e) {}
            }
        }
    }

    // Alternative scraping method with multiple strategies
    async scrapePublicProfile(req, res) {
        try {
            const { linkedinUrl } = req.body;
            
            if (!linkedinUrl) {
                return res.status(400).json({
                    success: false,
                    error: 'LinkedIn URL is required'
                });
            }

            console.log(`🔍 Attempting alternative scraping strategies for: ${linkedinUrl}`);
            
            let profileData = null;
            let method = 'unknown';
            
            // Strategy 1: Try mobile version
            console.log('📱 Trying mobile LinkedIn...');
            profileData = await this.scrapeMobileVersion(linkedinUrl);
            if (profileData) {
                method = 'mobile-version';
            } else {
                // Strategy 2: Try via Google search results
                console.log('🔍 Trying via search results...');
                profileData = await this.scrapeViaSearchResults(linkedinUrl);
                if (profileData) {
                    method = 'search-results';
                }
            }
            
            if (profileData) {
                return res.json({
                    success: true,
                    data: {
                        url: linkedinUrl,
                        scrapedAt: new Date().toISOString(),
                        profile: profileData,
                        method: method
                    }
                });
            } else {
                return res.status(500).json({
                    success: false,
                    error: 'All alternative scraping strategies failed',
                    message: 'LinkedIn profile may be private or requires authentication',
                    suggestions: [
                        'Check if the profile URL is correct',
                        'Ensure the profile is set to public',
                        'Try again later',
                        'Consider using LinkedIn API for authenticated access'
                    ]
                });
            }

        } catch (error) {
            console.error('❌ Error in alternative scraping:', error.message);
            res.status(500).json({
                success: false,
                error: 'Alternative scraping failed',
                message: error.message
            });
        }
    }

    // Extract profile data optimized for mobile
    async extractMobileProfileData(page) {
        return await page.evaluate(() => {
            const data = {};
            
            // Mobile-specific selectors
            const getTextContent = (selectors) => {
                for (const selector of selectors) {
                    const element = document.querySelector(selector);
                    if (element && element.textContent.trim()) {
                        return element.textContent.trim();
                    }
                }
                return null;
            };
            
            // Extract name
            data.name = getTextContent([
                '.profile-name',
                '.pv-text-details__left-panel h1',
                'h1',
                '.top-card-layout__title'
            ]);
            
            // Extract headline
            data.headline = getTextContent([
                '.profile-headline',
                '.pv-text-details__left-panel .text-body-medium',
                '.headline'
            ]);
            
            // Extract location
            data.location = getTextContent([
                '.profile-location',
                '.pv-text-details__left-panel .text-body-small'
            ]);
            
            data.pageTitle = document.title;
            data.isLinkedInProfile = true;
            data.experiences = [];
            data.education = [];
            data.skills = [];
            data.about = null;
            
            return data;
        });
    }

    // Test with different browser configurations
    async testBrowserConfigs(req, res) {
        const configs = [
            {
                name: 'Standard Config',
                config: { headless: true, args: ['--no-sandbox'] }
            },
            {
                name: 'Stealth Config',
                config: this.browserConfig
            },
            {
                name: 'Non-headless Config',
                config: { ...this.browserConfig, headless: false }
            }
        ];

        const results = [];

        for (const { name, config } of configs) {
            let browser = null;
            try {
                console.log(`🧪 Testing ${name}...`);
                browser = await puppeteer.launch(config);
                const page = await browser.newPage();
                
                await page.goto('https://httpbin.org/user-agent', { 
                    waitUntil: 'networkidle0',
                    timeout: 15000 
                });
                
                const content = await page.content();
                await browser.close();
                browser = null;
                
                results.push({
                    config: name,
                    success: true,
                    userAgent: content.includes('user-agent') ? 'Detected' : 'Not detected'
                });
                
            } catch (error) {
                if (browser) {
                    try { await browser.close(); } catch (e) {}
                }
                results.push({
                    config: name,
                    success: false,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            browserTests: results,
            timestamp: new Date().toISOString()
        });
    }

    // Validate LinkedIn URL format
    isValidLinkedInUrl(url) {
        const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[\w\-\.%]+\/?(\?.*)?$/i;
        return linkedinPattern.test(url);
    }

    // Enhanced error handling and logging
    async handleError(error, context = 'Unknown') {
        console.error(`❌ Error in ${context}:`, {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        
        // Determine error type and provide specific guidance
        if (error.message.includes('ERR_CONNECTION_CLOSED')) {
            return {
                type: 'CONNECTION_BLOCKED',
                message: 'LinkedIn blocked the connection',
                suggestions: [
                    'Wait 10-15 minutes before retrying',
                    'Use a different IP address or VPN',
                    'Try the public profile endpoint',
                    'Consider using LinkedIn API instead'
                ]
            };
        } else if (error.message.includes('timeout')) {
            return {
                type: 'TIMEOUT',
                message: 'Request timed out',
                suggestions: [
                    'Increase timeout duration',
                    'Check internet connection',
                    'Try again with longer wait time'
                ]
            };
        } else {
            return {
                type: 'UNKNOWN',
                message: error.message,
                suggestions: ['Check logs for more details', 'Contact support']
            };
        }
    }
}

export default new LinkedInController();