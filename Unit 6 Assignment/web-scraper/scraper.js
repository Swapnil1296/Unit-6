const puppeteer = require("puppeteer");
let URL = "https://careers.google.com/jobs/results/?distance=50&q=react";

const fs = require("fs/promises");

async function start() {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(URL);

   await page.waitForTimeout(500);

   const names = await page.evaluate(() => {
      return Array.from(
         document.querySelectorAll(
            "#search-results > li > a > div > div.gc-card__header > h2"
         )
      ).map((x) => {
         return x.textContent.trim();
      });
   });

   const companies = await page.evaluate(() => {
      return Array.from(
         document.querySelectorAll(
            "#search-results > li > a > div > div.gc-card__header > div > ul > li.gc-job-tags__team > span"
         )
      ).map((x) => {
         return x.textContent.trim();
      });
   });

   const locations = await page.evaluate(() => {
      return Array.from(
         document.querySelectorAll(
            "#search-results > li > a > div > div.gc-card__header > div > ul > li.gc-job-tags__location > div > span"
         )
      ).map((x) => {
         return x.textContent.trim();
      });
   });

   const details = await page.evaluate(() => {
      return Array.from(
         document.querySelectorAll(
            "#search-results > li > a > div > div.gc-card__content.gc-h-hidden--until-medium"
         )
      ).map((x) => {
         let det = x.textContent.split("Expand");
         return det[0];
      });
   });

   let all = [];

   for (let i = 0; i < names.length; i++) {
      let obj = {
         jobTitle: names[i],
         company: companies[i],
         location: locations[i],
         details: details[i],
      };
      all.push(obj);
   }

   await fs.writeFile("AllDetails.json", JSON.stringify(all));

   await browser.close();
}

start();
