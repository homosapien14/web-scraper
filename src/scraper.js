const axios = require('axios');
const cheerio = require('cheerio');

const scrape= async()=> {
  const response = await axios.get('https://www.theverge.com/');
  const $ = cheerio.load(response.data);
  // console.log($);
  const articles = [];

  $('div.duet--content-cards--content-card').each(function(i, element) {
    const url = $(this).find('a').attr('href');
    const headline = $(this).find('h2.c-entry-box--compact__title').text();
    const author = $(this).find('.c-byline__item').first().text().trim();
    const date = $(this).find('.c-byline__item').last().attr('datetime');
    const id = i;

    const article = createArticle(id, url, headline, author, date);
    articles.push(article);
  });

  console.log(articles);
  return articles;

};

module.exports = scrape;
