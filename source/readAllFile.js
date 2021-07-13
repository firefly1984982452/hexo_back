const fs = require("fs");

const dir = "./_posts";
const files = fs.readdirSync(dir);

let arr = [];
let filesList = files.filter((v) => v.includes("《"));
for (file of filesList) {
  arr.push(file);
}
console.log(arr);
