const puppeteer = require('puppeteer');

exports.generateCV = async (req, res) => {
  const { linkedinUrl } = req.body;

  if (!linkedinUrl || !linkedinUrl.includes('linkedin.com/in/')) {
    return res.status(400).json({ error: 'Invalid LinkedIn URL' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(linkedinUrl, { waitUntil: 'networkidle2' });

    // Extract public profile data
    const profileData = await page.evaluate(() => {
      const getText = (selector, context = document) => context.querySelector(selector)?.innerText.trim() || '';

      // Extract name
      const name = getText('h1');

      // Extract headline
      const headline = getText('.top-card-layout__headline');

      // Extract experience
      const experiences = Array.from(document.querySelectorAll('#experience ~ .pvs-list__outer-container li')).map((exp) => {
        return {
          title: getText('.t-bold', exp),
          company: getText('.t-14.t-normal', exp),
          duration: getText('.t-14.t-normal.t-black--light', exp),
          description: getText('.pv-shared-text-with-see-more', exp),
        };
      });

      // Extract education
      const education = Array.from(document.querySelectorAll('#education ~ .pvs-list__outer-container li')).map((edu) => {
        return {
          institution: getText('.t-bold', edu),
          degree: getText('.t-14.t-normal', edu),
          duration: getText('.t-14.t-normal.t-black--light', edu),
        };
      });

      // Extract skills
      const skills = Array.from(document.querySelectorAll('#skills ~ .pvs-list__outer-container li')).map((skill) => {
        return getText('.t-14.t-bold', skill);
      });

      return { name, headline, experiences, education, skills };
    });

    await browser.close();

    // Structure CV data
    const cvData = {
      personalInfo: {
        name: profileData.name,
        headline: profileData.headline,
        linkedin: linkedinUrl,
      },
      experience: profileData.experiences,
      education: profileData.education,
      skills: profileData.skills,
    };

    res.json({ message: 'CV data generated successfully', cv: cvData });
  } catch (error) {
    console.error('Error scraping LinkedIn:', error);
    res.status(500).json({ error: 'Failed to fetch LinkedIn data' });
  }
};