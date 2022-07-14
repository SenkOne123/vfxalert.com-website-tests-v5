const puppeteer = require('puppeteer');

async function checkHeaderLinks() {
  const browser = await puppeteer.launch({headless: true });
  const page = await browser.newPage();
  await page.goto('https://xsignals.one');
  let headerTabs = [];
  console.log("Checking header tabs...")
  const logo = await page.$("body > header > div > div > div.col-6.col-md-2.col-lg-2 > a.logo.hidden-xs > img")
  if (logo) {
    console.log("Logo is correct!")
  } else {
    console.log("Logo is not correct!")
  }
  for (let i = 1; i <= 6; i++) {
    headerTabs = await page.$(`body > header > div > div > ul > li:nth-child(${i})`);
  }
  if (headerTabs.length === 6) {
    console.log("Tabs are correct!")
  } else {
    console.log("Some tabs are missing")
  }
  const cabinetButton = await page.$("body > header > div > div > div.dropItem.dropItem-cabinet");
  if (cabinetButton) {
    console.log("Personal cabinet button is ok!")
  } else {
    console.log("Personal cabinet button is missing!")
  }
  const languageSelector = await page.$("body > header > div > div > div.dropItem.dropItem-language");
  if (languageSelector) {
    console.log("Language selector button is ok!")
  } else {
    console.log("Language selector button is missing!")
  }
  await browser.close()
}

checkHeaderLinks().then(() => console.log("DONE!"))