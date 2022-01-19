const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const browserObject = require('../utils/open_browser');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register',async (req, res) => {
    let { first_name, second_name, email, username, password, gender, country } = req.body;
  
    try{
        console.log("starting scraping......")
        let browser = await browserObject.startBrowser();
        let page = await browser.newPage();
        // Navigate to the selected page
        await page.goto("https://poshmark.com/signup");
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.signup.view');
        // Get the link to all the required books
        await page.type('#firstName', first_name)
        await page.type('#lastName', second_name)

        await Promise.all([
            page.click('#content > div > div > div.p--v--5 > div.pm-form > form > div.form__actions.signup__footer > button'),
            page.waitForNavigation(),
        ]);
        await page.screenshot({ path: 'example.png' });
        console.log(urls);
        
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;