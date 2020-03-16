const cheerio = require("cheerio");
const axios = require("axios");
const https = require("https");

/**
 *
 * @param {string} text
 */
const extractNumber = text => {
  let [_, numstr] = text.split(":");
  numstr = numstr.replace("s/g", "");
  const num = Number.parseInt(numstr);
  return num;
};

const fetchCases = async () => {
  const url = "https://www.mspbs.gov.py/covid-19.php";
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.get(url, {
      httpsAgent: agent
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const x = $(
      "body > div > div:nth-child(5) > div > div:nth-child(1) > h4 > font"
    );
    const text = x.text();
    const confirmed = extractNumber(text);
    const deaths = 0;
    const recovered = 0;
    return { confirmed, deaths, recovered, timestamp: new Date() };
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  fetchCases
};
