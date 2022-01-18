# The project consists of 2 web pages

### Page 1 - Web Automation: Poshmark Sign Up 💁‍♂️

This will allow a user to enter their information on your website and once they click the “sign up” button, we’ll automatically fill in all that information on Poshmark’s signup page: [https://poshmark.com/signup](https://poshmark.com/signup)

![Screen Shot 2021-12-31 at 5.54.00 PM.png](https://joinflyp.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F02456119-22c3-4695-b0bd-04b044edf2f8%2FScreen_Shot_2021-12-31_at_5.54.00_PM.png?table=block&id=5489f3b0-d565-43c5-b814-b4a269a47000&spaceId=35a37d52-2370-4eed-994c-1b254e2b8ea3&width=580&userId=&cache=v2)

- Create a webpage with the following fields
    - First Name
    - Last Name
    - Email
    - Username
    - Password
    - Gender (same options as the ones on Poshmark)
    - Country (same options as the ones on Poshmark)
    - Signup button
- You can use React, HTML, or any other preferred way for users to enter their information visually
- No need for validating any of the user entries
- No need to copy the exact design at all since we’re assessing web automation
- Once the user fill in all the fields, they can now click the “signup button” and we’ll automatically open a new tab and fill in the information exactly the way they entered it
- Feel free to either use a Chrome Extension or any of your favorite automation frameworks to complete filling in the user information and hitting the “next” button on Poshmark’s signup page
- Poshmark will not allow you to sign up from outside the US, so you can consider the challenge done as long as you hit the “next” button on their page

---

### Page 2 - Web Scraping: Poshmark User Info 🙋‍♀️

This page will only have 1 textfield that accepts a Poshmark formatted profile URL

Examples:

[https://www.poshmark.com/closet/mollyskloset](https://www.poshmark.com/closet/mollyskloset)

[https://poshmark.com/closet/jasminecolon28](https://poshmark.com/closet/jasminecolon28)

[https://posh.mk/LEbccDYnA7](https://posh.mk/LEbccDYnA7)

- The user will paste their Poshmark profile in it and hit the “Get info” button.
- Your job is to scrape their profile information from Poshmark any way you like (using a Chrome Extension for example, or any other preferred method) and then you’ll display the following information on your web page:
    - Name
    - Number of listings
    - Profile pic (load the photo)
        
        ![Screen Shot 2021-12-31 at 5.52.10 PM.png](https://joinflyp.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F65851998-9378-41df-91ba-608940efcc69%2FScreen_Shot_2021-12-31_at_5.52.10_PM.png?table=block&id=a9c67b3c-009f-4332-9120-bcaf01bf9c4b&spaceId=35a37d52-2370-4eed-994c-1b254e2b8ea3&width=670&userId=&cache=v2)
        
- Make sure to validate the Poshmark URL before attempting to scrape the data
- Don’t spend time on UI, it’s more important to retrieve the data that how you display it for now

<aside>
💡 Make sure you’ve added a README file on how to install and run the project

</aside>

**Stuck and need help** 😭**?** Reach out to me at aydin@joinflyp.com