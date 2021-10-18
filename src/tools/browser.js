const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function startBrowser(url='') {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.setCacheEnabled(false)
    const sourceCodeHtml = await page.content()
    const pageData = cheerio.load(sourceCodeHtml)
    browser.close()
    return pageData
}

module.exports = {
    startBrowser
}


