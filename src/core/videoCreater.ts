
import { videoCreaterStore } from '@src/store/videoCreater-store'

import getvoice from "@src/core/voice";
import { offLineControl } from '@src/core/offLineCanvas'

import testmusic from "@src/assets/小刀会序曲.mp3"

let ffmpedLoadEnd = false
const { createFFmpeg,fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });
console.log( 'Loading ffmpeg-core.js');
ffmpeg.load().then( ()=>{
    ffmpedLoadEnd = true
    videoCreaterStore.addLog({type:"info",message:"转换器加载完成"})
    console.log( 'Loaded');
})
// https://github.com/ffmpegwasm/ffmpeg.wasm

ffmpeg.setProgress(({ ratio }) => {
    videoCreaterStore.setProgress(ratio)
    /*
     * ratio is a float number between 0 to 1.
     */
});


ffmpeg.setLogger(({ type, message }) => {
    videoCreaterStore.addLog({type, message})
    /*
     * type can be one of following:
     *
     * info: internal workflow debug messages
     * fferr: ffmpeg native stderr output
     * ffout: ffmpeg native stdout output
     */
});

function stopFFmpeg(){
    ffmpeg.exit()
}


// 音频合并
/*
ffmpeg -i 1.mp3 -i 2.mp3 -i 3.mp3 -filter_complex "[1]adelay=4000|4000[del1],[2]adelay=6000|6000[del2],[0][del1]amix[out],[out][del2]amix" output.mp3 
*/
async function audioMerge(audioOptions) : Blob {

}

//帧转视频
async function image2video(frames:[Uint8Array]) : Blob {
    if (!ffmpedLoadEnd) {
        videoCreaterStore.addLog({type:"fferr", message:"转换器加载未完成"})
        //FFmpeg 加载未完成
        return
    }
    //加载音频
    ffmpeg.FS('writeFile', 'testmusic.mp3', await fetchFile(testmusic));

    //加载帧
    for (let index = 0; index < frames.length; index++) {
        const frame = frames[index];
        const num = `00000${index}`.slice(-6);
        ffmpeg.FS('writeFile', `tmp.${num}.png`,frame);
    }

    //合成视频
    console.log( 'Start transcoding');
    await ffmpeg.run('-framerate', '30', '-pattern_type', 'glob', '-i', '*.png', '-i', 'testmusic.mp3', '-c:a', 'copy', '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', 'out.mp4');
    console.log( 'transcoding success');

    //输出文件
    const data = ffmpeg.FS('readFile', 'out.mp4');

    //取消音频缓存
    ffmpeg.FS('unlink', 'testmusic.mp3')

    //取消帧缓存
    for (let index = 0; index < frames.length; index++) {
        const frame = frames[index];
        const num = `00000${index}`.slice(-6);
        ffmpeg.FS('unlink', `tmp.${num}.png`);
    }
    return new Blob([data.buffer], { type: 'video/mp4' });
}



async function videotest() : Blob {
    console.log("run test")
    let frames = await offLineControl.start()
    frames.push(...await offLineControl.getFrame(300))
    return await image2video(frames)
}


async function audiotest() : Blob  {
    const audio = new Audio();

    const audioContent = await getvoice({ tex: "這是平常某一日的夜晚。" });

    console.log({audioContent})
    var reader = new FileReader();
    reader.readAsDataURL(audioContent)
    reader.onload = function (e) {
        console.log({url:e.target.result});
        audio.src=e.target.result
        audio.play()
    };

    const audioOptions:AudioOptions = [
        // {
        //     audio: "",
        //     delay: 5000;
        // }
    ]
    return await audioMerge(audioOptions)
}


export { videotest,audiotest };


interface AudioOptions {
    audio: Uint8Array;
    delay: number;
}