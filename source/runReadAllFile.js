var process = require("child_process");
var fs = require("fs");
process.exec("node ./readAllFile.js", function (err, out, stderr) {
  fs.writeFile("./text.json", out, function (err) {
    console.log(err ? "错误" : "正确");
  });
});
