

import { offLineControl } from '@src/core/offLineCanvas'

import testmusic from "@src/assets/小刀会序曲.mp3"

let ffmpedLoadEnd = false
const { createFFmpeg,fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });
console.log( 'Loading ffmpeg-core.js');
ffmpeg.load().then( ()=>{
    ffmpedLoadEnd = true
    console.log( 'Loaded');
})
// https://github.com/ffmpegwasm/ffmpeg.wasm


// 音频合并
/*
ffmpeg -i 1.mp3 -i 2.mp3 -i 3.mp3 \
  -filter_complex "[1]adelay=4000|4000[del1],[2]adelay=6000|6000[del2],[0][del1]amix[out],[out][del2]amix" output.mp3 
*/

async function test() {
    console.log("run test")
    let frames = await offLineControl.start()
    frames.push(...await offLineControl.getFrame(3000))

    const image2video = async () => {
        if (!ffmpedLoadEnd) {
            return
        }
        ffmpeg.FS('writeFile', 'testmusic.mp3', await fetchFile(testmusic));
        for (let index = 0; index < frames.length; index++) {
            const frame = frames[index];
            const num = `00000${index}`.slice(-6);
            ffmpeg.FS('writeFile', `tmp.${num}.png`,frame);
        }
        console.log( 'Start transcoding');
        await ffmpeg.run('-framerate', '30', '-pattern_type', 'glob', '-i', '*.png', '-i', 'testmusic.mp3', '-c:a', 'copy', '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', 'out.mp4');
        const data = ffmpeg.FS('readFile', 'out.mp4');
        ffmpeg.FS('unlink', 'testmusic.mp3')
        for (let index = 0; index < frames.length; index++) {
            const frame = frames[index];
            const num = `00000${index}`.slice(-6);
            ffmpeg.FS('unlink', `tmp.${num}.png`);
        }

        return new Blob([data.buffer], { type: 'video/mp4' });
    }

    return await image2video()
}


export { test };
