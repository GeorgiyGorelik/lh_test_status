import logger from "lh-pptr-framework/logger/logger.js";
import HomePage from '../pages/demoqa/homePage.js';
import { beforeHook, beforeEachHook, afterEachHook, afterHook } from 'lh-pptr-framework/settings/mochaHooks.js';
import * as params from 'lh-pptr-framework/settings/testParams.js';

let browser;
const Home = new HomePage();
const pages = [Home];

// Extend the common beforeHook with additional setup
const customBeforeHook = async () => {
    await beforeHook(); // Perform the common setup first (browser startup)
    browser = await params.getBrowserInstance();
    for (const page of pages) {
        page.init(browser.page); // Sets instance of puppeteer page to page objects
    }
};

// Specify all mocha hooks
before(customBeforeHook);
beforeEach(beforeEachHook);
afterEach(afterEachHook);
after(afterHook);

// For all `it` test cases
// `this` is required to pass the test context to the framework to have the same title in the report

it("[N]_Home--cold", async function () {
    // Example of first page opening (aka cold page)
    await Home.navigationValidate(browser, this)
}).timeout(params.testTime);

it("[N]_Home--warm", async function () {
    // Example of same page opening (aka warm page) -- metrics will be faster due to caching
    await Home.navigationValidate(browser, this)
}).timeout(params.testTime);

it("[N]_Home--reset", async function () {
    // Example of restarting browser and opening page from scratch -- metrics will be similar to cold page
    browser = await Home.navigationValidate(browser, this, browser.page.url(), pages)
}).timeout(params.testTime);

it("[T]_Click_on_Elements", async function () {
    // Example of timespan usage -- clicking on element on the page
    await Home.clickOnElements(browser, this)
}).timeout(params.testTime);

it(`[N]_TextBox--reset`, async function () {
    // One more example of restarting browser and opening TextBox page from scratch
    browser = await TextBox.navigationValidate(browser, this, TextBox.getURL(), pages)
}).timeout(params.testTime);