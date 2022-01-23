const express = require('express');
const router = express.Router();

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

    try {
        console.log("starting scraping......")
        let browser = await browserObject.startBrowser();
        let page = await browser.pages();
        page = page[0]
        await page.setDefaultNavigationTimeout(0);
        await page.goto("https://poshmark.com/signup");

        await page.type('#firstName', first_name)
        await page.type('#lastName', second_name)
        await page.type('#email', email)
        await page.type('#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(3) > input', username)
        await page.type('#password', password)

        if (gender == "ma") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(2)").className = "dropdown__menu__item--selected dropdown__menu__item"
            });
        }
        if (gender == "fe") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(3)").className = "dropdown__menu__item--selected dropdown__menu__item"
            })
        }
        if (gender == "un") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(4)").className = "dropdown__menu__item--selected dropdown__menu__item"
            })
        }

        if (country == "ca") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(2)").className = "dropdown__menu__item--selected dropdown__menu__item--highlighted dropdown__menu__item"
            })
        }
        if (country == "au") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(3)").className = "dropdown__menu__item--selected dropdown__menu__item--highlighted dropdown__menu__item"
            })
        }
        if (country == "in") {
            await page.evaluate(() => {
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(1)").className = "dropdown__menu__item"
                document.querySelector("#content > div > div > div.p--v--5 > div.pm-form > form > div:nth-child(5) > div > div:nth-child(2) > ul > li:nth-child(4)").className = "dropdown__menu__item--selected dropdown__menu__item--highlighted dropdown__menu__item"
            })
        }

        await page.click('#content > div > div > div.p--v--5 > div.pm-form > form > div.form__actions.signup__footer > button')

        await page.setDefaultNavigationTimeout(0);
        await page.close();
        data = { "msg": "Sussufully registered." }
        res.json(data);
    } catch (error) {
        console.log(error)
    }
});

// @route   POST api/users/getUserInfo
// @desc    get user infos
// @access  Public
router.post('/getUserInfo', async (req, res) => {
    let { url } = req.body
    let data = {}, listing, error
    try {
        console.log("starting scraping......")
        let browser = await browserObject.startBrowser();
        let page = await browser.pages();
        page = page[0]

        await page.setDefaultNavigationTimeout(0);
        await page.goto(url);
        try {
            error = await page.$eval('#content > div > div:nth-child(2) > h1', h1 => h1.textContent)
            if (error.contains("The page you are looking for could not be found")) {
                return { msg: "The page you are looking for could not be found" }
            }
        } catch (err) {
            data["image"] = await page.$eval('#content > div > div.m--b--5 > div > div.ps--r > div.closet__header__info > div > div.d--fl.jc--fe.ai--fe.col-l5.col-x6 > div > img', img => img.src)
            data["name"] = await page.$eval('#content > div > div.m--b--5 > div > div.ps--r > div.closet__header__info > div > div.col-l19.col-x18 > div > h1 > span.ellipses', span => span.textContent) + " " + await page.$eval('#content > div > div.m--b--5 > div > div.ps--r > div.closet__header__info > div > div.col-l19.col-x18 > div > h1 > span.m--l--2', span => span.textContent)
            listing = await page.$eval('#content > div > div.m--b--5 > div > div.closet__header__info__user-details__container__full-width > div > div.d--fl.jc--sb.col-x24.col-l19 > nav > ul > li:nth-child(1) > a ', a => a.textContent.trim())
            data["listing"] = listing.split(" ")[0].trim()
            data["msg"] = "Successfully get user infos"
            await page.close();
            res.json(data)
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;