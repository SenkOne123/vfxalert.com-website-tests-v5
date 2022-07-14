const puppeteer = require('puppeteer');
const footerLinksPackage = require("../assets/footer-links-xsignals.json");

function compareArrays(arr1, arr2) {
  // check the length
  if(arr1.length != arr2.length) {
    console.log("footer links are not full!")
    return false;
  }
  else {
    let result = false;
    // comparing each element of array
    for(let i=0; i<arr1.length; i++) {
      if(arr1[i] != arr2[i]) {
        console.log(arr1[i] + " link is not correct")
        return false;
      }
      else {
        result = true;
      }
    }
    return result;
  }
}

async function checkFooterLinks() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage()
  await page.goto('https://xsignals.com');
  let footerElements = [
    await page.$("body > footer > div > div > div.col-12.col-lg-2 > ul > li:nth-child(1) > a"),
    await page.$("body > footer > div > div > div.col-12.col-lg-2 > a"),
    await page.$("body > footer > div > div > div.col-12.col-lg-2 > ul > li:nth-child(2) > a")];
  let footerLinks = []
  // Legal information links
  for (let i = 1; i <= 3; i++) {
    footerElements.push(await page.$(`body > footer > div > div > div.col-12.col-lg-10 > div > div:nth-child(1) > ul > li:nth-child(${i}) > a`));
  }
  // Tools
  for (let i = 1; i <= 6; i++) {
    footerElements.push(await page.$(`body > footer > div > div > div.col-12.col-lg-10 > div > div:nth-child(2) > ul > li:nth-child(${i}) > a`));
  }
  for (let i = 1; i <= 6; i++) {
    footerElements.push(await page.$(`body > footer > div > div > div.col-12.col-lg-10 > div > div:nth-child(3) > ul > li:nth-child(${i}) > a`));
  }
  for (let i = 1; i <= 5; i++) {
    footerElements.push(await page.$(`body > footer > div > div > div.col-12.col-lg-10 > div > div:nth-child(4) > ul > li:nth-child(${i}) > a`));
  }
  for (let i = 0; i < footerElements.length; i++) {
    footerLinks.push(await (await footerElements[i].getProperty("href")).jsonValue());
  }
  // COMPARE THE LINKS
  console.log(compareArrays(footerLinks, footerLinksPackage));
  await browser.close();
}

checkFooterLinks().then(() => {
  console.log("DONE!")
});