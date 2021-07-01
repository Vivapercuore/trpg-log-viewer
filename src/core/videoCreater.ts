
import { download } from "@src/utils/downLoadBlob"

import { offLineControl } from '@src/core/offLineCanvas'

import testmusic from "@src/assets/小刀会序曲.mp3"
//https://github.com/Kagami/ffmpeg.js/

const worker = new Worker("@src/../node_modules/ffmpeg.js/ffmpeg-worker-mp4.js");
// const worker = new Worker(
//     "@src/../node_modules/ffmpeg.js/ffmpeg-worker-webm.js"
// );

worker.onmessage = function (e) {
    const msg = e.data;
    switch (msg.type) {
        case "ready":
            worker.ready = true
            console.log("worker ready");
            break;
    }
};

interface MEMF {
    name: String
    data: ArrayBuffer | ArrayBufferView | Array
}

function exec(args: [String], MEMFS: [MEMF]) {
    console.log("exec", MEMFS)
    return new Promise((resolve, reject) => {
        let msgs = []
        let errmsgs = []
        const ex = () => {
            worker.postMessage({ type: "run", arguments: [...args], MEMFS: MEMFS });
        }
        worker.onmessage = function (e) {
            const msg = e.data;
            switch (msg.type) {
                case "ready":
                    worker.ready = true
                    console.log("worker ready");
                    ex()
                    break;
                case "stdout":
                    // console.log("worker stdout");
                    msgs.push(msg.data)
                    break;
                case "stderr":
                    // console.log("worker stderr",msg);
                    errmsgs.push(msg.data)
                    break;
                case "done":
                    console.log("worker done");
                    if (errmsgs.length) {
                        reject({
                            data: msg.data,
                            log: errmsgs,
                        });
                    } else {
                        resolve({
                            data: msg.data,
                            log: msgs,
                        });
                    }
                    break;
            }
        };
        if (worker.ready) {
            ex()
        }
    })
}

async function test() {
    ffmpeg_webm
    console.log("run test")
    return exec(["-version"], [])
}


async function testEncodePNGs2WebM() {
    let frames = await offLineControl.start()
    console.time("farmeTest");

    frames.push(...await offLineControl.getFrame(50))

    const MEMFS = translateFrame2MEMF(frames)

    console.log(
        MEMFS[0]
    )

    const res = await exec(
        [
            "-pattern_type",
            "glob",
            // "-framerate",
            // "24",
            "-i",
            "frames*.png",
            "out.mp4",
        ],
        MEMFS,
    )

    var file = res.MEMFS[0];
    console.log(res)
    console.log("testEncodePNGs2WebM")
    console.log(file)
}

function translateFrame2MEMF(frames) {
    return frames.map((data, index) => {
        return {
            name: `frames${index}.png`,
            data: data
        }
    })
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

export { test, testEncodePNGs2WebM };
