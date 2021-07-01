
var ffmpeg_webm = require("ffmpeg.js/ffmpeg-webm");

var fs = require("fs");
var path = require("path");

var testDataPath = path.join(__dirname, "../assets/cube.jpg");
var testData = new Uint8Array(fs.readFileSync(testDataPath));

var noop = function (arg){
    console.log(arg)
}
var res = ffmpeg_webm({
    // FIXME(Kagami): pattern_type=sequence doesn't work with NODEFS
    // for some reason.
    arguments: [
      "-pattern_type", "glob",
      "-i", "test-frame.jpg",
      "out.webm",
    ],
    stdin: noop,
    print: noop,
    printErr: noop,
    MEMFS: [{name: "test-frame.jpg", data: testData}],
  });
  var file = res.MEMFS[0];
  console.log(file)