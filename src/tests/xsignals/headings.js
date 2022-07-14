const puppeteer = require('puppeteer');
const h2Package = ["THE BEST FOREX SIGNALS AND CRYPTOCURRENCY SIGNALS IN ONE APP", "Any device", "Easy to start", "Pricing", "Also people read"];

async function checkHeadings() {
  const browser = await puppeteer.launch({headless: true });
  const page = await browser.newPage();
  await page.goto('https://xsignals.one');
  const h1 = await page.$eval("h1", (element => element.textContent))
  if (h1) {
    console.log("H1 heading is correct!")
  }
  let i = 0;
  const h2 = await page.$$eval("h2", elements => elements.map(item => item.textContent));
  let isErrorDetected = false
  h2Package.forEach(element => {
    if (!element === h2[i]) {
      isErrorDetected = true
      console.log(h2[i] + " heading is not correct!")
    }
    i = i + 1;
  })
  if (isErrorDetected) {
    console.log("Some H2 headings are not correct")
  } else {
    console.log("H2 headings are correct!")
  }
  await browser.close()
}

checkHeadings().then()