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
router.post('/register', async (req, res) => {
    let { first_name, second_name, email, username, password, gender, country } = req.body;
    try{
        gender = gender
        console.log("starting scraping......")
        let browser = await browserObject.startBrowser();
        let page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        // Navigate to the selected page
        await page.goto("https://poshmark.com/signup");
        // Get the link to all the required books
        await page.type('#firstName', first_name)
        await page.type('#lastName', second_name)
        await page.type('#email', email)
        await page.type('#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(3) > input', username)
        await page.type('#password', password)
        // await page.$eval("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(1) > div > div", e =>
        //     e.innerHTML = gender   // This is where the exception occurs
        // );
        // await page.evaluate((gender) => {
        //     document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
        //     gender=="Male"?document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(2)").className = "dropdown__menu__item--selected dropdown__menu__item":null
        //     gender=="Female"?document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(2)").className = "dropdown__menu__item--selected dropdown__menu__item":null
        //     gender=="Unspecified"?document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(2)").className = "dropdown__menu__item--selected dropdown__menu__item":null
        // });
        // await page.type('#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(1) > div', gender)

        await Promise.all([
            page.click('#content > div > div > div.p--v--5 > div.pm-form > form > div.form__actions.signup__footer > button'),
            page.waitForNavigation(),
        ]);
        await page.screenshot({ path: 'example.png' });
        
    } catch (error) {
        console.error(error)
    }
});

module.exports = router;