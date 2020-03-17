const { fetchCases } = require("./scraper");
const fs = require("fs");

const updateCases = async () => {
  const cases = await fetchCases();
  const json = JSON.stringify({ ...cases });
  const { pyt } = cases;
  console.log(json);
  fs.writeFileSync("cases.json", json);

  const md = `\n\`\`\`\n${json}\n\`\`\``;
  const append = `${md}\nLast update (Paraguay Time): ${pyt}`;

  fs.appendFileSync("README.md", append);
};

updateCases();
