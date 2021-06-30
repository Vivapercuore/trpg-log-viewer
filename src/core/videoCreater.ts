

import { download } from "@src/utils/downLoadBlob"

import testmusic from "@src/assets/小刀会序曲.mp3"
//https://github.com/Kagami/ffmpeg.js/

// const worker = new Worker("@src/../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js");
const worker = new Worker(
    "@src/../node_modules/ffmpeg.js/ffmpeg-worker-webm.js"
);
worker.onmessage = function (e) {
    const msg = e.data;
    switch (msg.type) {
        case "ready":
            worker.ready =true
            console.log("worker ready");
            break;
    }
};

interface MEMF {
    name: String
    data: ArrayBuffer|ArrayBufferView|Array
}

function exec(args:[String],MEMFS:[MEMF]) {
    return new Promise((resolve, reject) =>{
        let msgs = []
        worker.onmessage = function (e) {
            const msg = e.data;
            switch (msg.type) {
                case "ready":
                    worker.ready =true
                    console.log("worker ready");
                    // worker.postMessage({ type: "run", arguments: ["-version"] });
                    // {type: "run", ...opts} - 使用提供的选项开始新工作。
                    worker.postMessage({ type: "run", arguments: [...args] });
                    break;
                case "stdout":
                    // console.log("worker stdout");
                    msgs.push(msg.data)
                    break;
                case "stderr":
                    // console.log("worker stderr");
                    reject(msg.data);
                    break;
                case "done":
                    // console.log("worker done");
                    resolve({
                        data:msg.data,
                        log:msgs,
                    });
                    break;
            }
        };
        if (worker.ready) {
            worker.postMessage({ type: "run", arguments: [...args] });
        }
    })
}

async function test() {
    console.log("run test")
    return exec(["-version"],[])
}

// const ffmpeg = require("ffmpeg.js");
// const fs = require("fs");
// const testData = new Uint8Array(fs.readFileSync("test.webm"));
// // Encode test video to VP8.
// const result = ffmpeg({
//   MEMFS: [{name: "test.webm", data: testData}],
//   arguments: ["-i", "test.webm", "-c:v", "libvpx", "-an", "out.webm"],
// });
// // Write out.webm to disk.
// const out = result.MEMFS[0];
// fs.writeFileSync(out.name, Buffer(out.data));

export default worker;

export { test };
