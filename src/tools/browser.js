const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function startBrowser(loteria = '') {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ['--disable-extensions']
    })
    const page = await browser.newPage()
    await page.goto(
        `http://loterias.caixa.gov.br/wps/portal/loterias/landing/${loteria}`
    )
    await page.setCacheEnabled(false)
    const sourceCodeHtml = await page.content()
    const pageData = cheerio.load(sourceCodeHtml)
    browser.close()
    return pageData
}

module.exports = {
    startBrowser,
}
