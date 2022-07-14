const puppeteer = require('puppeteer');
const h2Package = ["AN IDEAL SET OF TOOLS FOR SUCCESSFUL TRADING", "HOW IT works", "easy to start", "about us", "Account Licences"];
const h3Package = [
  "Asset", "Price", "Time", "Expiration", "Algorithm", "Signal", "Power", "Heatmap", "Asset", "Algorithm", "Power",
  "Signal", "Heatmap", "Expiration", "Time", "Price", "Learning binary options trading for a beginner.",
  "The best tool for binary options trading - binary options signals vfxAlert", "Trading binary options for novice traders.",
  "Learning binary options trading for a beginner.", "The best tool for binary options trading - binary options signals vfxAlert",
  "Trading binary options for novice traders.", "Learning binary options trading for a beginner.", "Sign up", "Choose a broker",
  "Learn to trade", "We successfully work in the field of binary options trading and help beginners and experienced traders.",
  "We successfully work in the field of binary options trading and help beginners and experienced traders.",
  "Free", "Test", "basic", "premium", "Ultimate"
]

async function checkHeadings() {
  const browser = await puppeteer.launch({headless: true });
  const page = await browser.newPage();
  await page.goto('https://vfxalert.com');
  const h1 = await page.$eval("h1", (element => element.textContent))
  if (h1) {
    console.log("H1 heading is correct!")
  }
  let h2 = [];
  let i = 0;
  h2 = await page.$$eval("h2", elements => elements.map(item => item.textContent));
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

  isErrorDetected = false;
  i = 0;
  const h3 = await page.$$eval("h3", elements => elements.map(item => item.textContent))
  h3Package.forEach(element => {
    if (!element === h3[i]) {
      isErrorDetected = true
      console.log(h3[i] + " heading is not correct!")
    }
    i = i + 1;
  })
  if (isErrorDetected) {
    console.log("Some H3 headings are not correct")
  } else {
    console.log("H3 headings are correct!")
  }
  await browser.close()
}

checkHeadings().then()