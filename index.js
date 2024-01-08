const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const in_url = "https://www.ss.com/lv/transport/cars/bmw/z-series/sell";

const selector = ".d1"



axios(in_url).then((response) => {
	const html = response.data;
	const payload = cheerio.load(html);
	const articles = [];

	payload(selector, html).each(function () {
		const title = payload(this).text().replace(/\n/g, '').trim();
		const url = payload(this).find("a").attr("href");
    articles.push({
      title,
      url
    })
	});
  console.log(articles)
}).catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
