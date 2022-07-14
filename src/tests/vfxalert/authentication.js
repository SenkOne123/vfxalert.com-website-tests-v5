const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin());

async function checkAuth() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage()
  await page.goto('https://vfxalert.com');
  const account = {
    username: "Tetoso",
    email: 'tetoso9532@game4hr.com',
    password: "123456",
    tariff: "Free",
    news: true,
    promo: true,
    alertsCount: 0,
    emailConfirmation: false
  }
  const loginButton = 'body > header > div > div > a.support-box.links-active > span';
  console.log("Authentication attempt is processing...");
  await page.click(loginButton);
  console.log("Waiting for login form to appear on the page...");
  await page.waitForSelector("#login-form")
    .then(() => {
    console.log("Login form appeared! processing to")
  }).catch((err) => {
    console.log(err)
    })
  await page.focus("#loginform-email");
  await page.keyboard.type(account.email);
  await page.focus("#loginform-password");
  await page.keyboard.type(account.password);
  // SUBMIT
  await page.click("#login-form > div.form-body > button");

  console.log("Checking the account data...")

  await page.waitForSelector("#home > div > div:nth-child(1) > div > div:nth-child(2) > div.name-account")
  const tariff = await page.$eval("#home > div > div:nth-child(1) > div > div:nth-child(2) > div.name-account", (element => element.textContent));
  if (tariff === account.tariff) {
    console.log("Account tariff is correct")
  } else {
    console.log("Account tariff is incorrect!!!")
  }

  await page.waitForSelector("#home > div > div:nth-child(2) > div > div.account-info__item > div")
  const alertsCount = await page.$eval("#home > div > div:nth-child(2) > div > div.account-info__item > div", (el) => el.textContent);
  if (alertsCount === account.alertsCount.toString()) {
    console.log("Alert count is correct")
  } else {
    console.log("Alert count is incorrect!!!")
  }

  await page.waitForSelector("#settingsform-username")
  const username = await page.$eval("#settingsform-username", (el) => el.getAttribute("value"));
  if (username === account.username) {
    console.log("Username is correct")
  } else {
    console.log("Username is incorrect!!!")
  }

  await page.waitForSelector("#settingsform-email")
  const accountEmail = await page.$eval("#settingsform-email", (el) => el.getAttribute("value"));
  if (accountEmail === account.email) {
    console.log("Account email is correct")
  } else {
    console.log("Account email is incorrect!!!")
  }

  await page.waitForSelector("#login-form > div.form-body > div.form-group.field-settingsform-email > div > div.status")
  let emailConfirmation = await page.$eval("#login-form > div.form-body > div.form-group.field-settingsform-email > div > div.status", (el) => el.textContent);
  emailConfirmation = emailConfirmation.replace(/\s/g, '');
  if (emailConfirmation === "confirmed") {
    console.log("Email is confirmed!")
  } else {
    console.log("Email is not confirmed!!")
  }

  await browser.close();
}

checkAuth().then(() => {
  console.log("DONE!")
})