

import { download } from "@src/utils/downLoadBlob"


import getvoice from "@src/core/voice"


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
            console.log("worker ready");
            // worker.postMessage({ type: "run", arguments: ["-version"] });
            break;
        case "stdout":
            console.log("worker stdout");
            console.log(msg.data);
            break;
        case "stderr":
            console.log("worker stderr");
            console.log(msg.data);
            break;
        case "done":
            console.log("worker done");
            console.log(msg.data);
            break;
    }
};


function test() {
    const stream = new MediaStream();
    const videoElem = document.getElementById("canvas");
    const videoStream = videoElem.captureStream();

    
        getvoice({tex:"這是平常某一日的夜晚。"},(voice)=>{
            const audio = new Audio(voice);
            const audiostream = audio.captureStream();
            document.addEventListener("click",()=>{
                audio.play()
                console.log("audiostream",audiostream)
                const audioTracks = audiostream.getAudioTracks();
                console.log("audioTracks",audioTracks)
                if (audioTracks?.[0]) {
                    stream.addTrack(audioTracks[0]);
                }
                setTimeout(() => {
                    audio.pause()
                }, 5000);
                mediaRecorder.start(); // 不传参数则直到stop为止，为一整段，传入ms数，则分段触发 ondataavailable
            })
        })
        // const voice1 = getvoice("在這現代都市之中的夜是如此明亮。")




    stream.addTrack(canvas.captureStream().getVideoTracks()[0]);
    const options = { mimeType: "video/webm" };
    const recordedBlobs = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    function handleStop(event) {
        console.log("handleStop", event);
    }

    mediaRecorder.onstop = handleStop;

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
            const blob = new Blob(recordedBlobs, { type: "video/webm" });
            console.log({ blob });
            // download(blob)
        }
    }

    mediaRecorder.ondataavailable = handleDataAvailable;

    setTimeout(() => {
        mediaRecorder.stop();
    }, 10000);

    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    return blob;
}

// worker.postMessage({
//   type: "command",
//   arguments: [
//     "-i",
//     "audiovideo.webm",
//     "-c:v",
//     "mpeg4",
//     "-c:a",
//     "aac", // or vorbis
//     "-b:v",
//     "6400k", // video bitrate
//     "-b:a",
//     "4800k", // audio bitrate
//     "-strict",
//     "experimental",
//     "audiovideo.mp4",
//   ],
//   files: [
//     {
//       data: new Uint8Array(fileReaderData),
//       name: "audiovideo.webm",
//     },
//   ],
// });

export default worker;

export { test };
