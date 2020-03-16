const { fetchCases } = require("./scraper");
const fs = require("fs");

const updateCases = async () => {
  const cases = await fetchCases();
  const json = JSON.stringify({ ...cases });
  console.log(json);
  fs.writeFileSync("public/cases.json", json);
};

updateCases();
