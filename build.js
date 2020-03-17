const { fetchCases } = require("./scraper");
const fs = require("fs");

const updateCases = async () => {
  const cases = await fetchCases();
  const json = JSON.stringify({ ...cases });
  console.log(json);
  fs.writeFileSync("cases.json", json);

  const md = `\n\`\`\`\n${json}\n\`\`\``;

  fs.appendFileSync("README.md", md);
};

updateCases();
