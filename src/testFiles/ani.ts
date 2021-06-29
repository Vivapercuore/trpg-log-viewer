import { download } from "@src/utils/downLoadBlob";

import getvoice from "@src/core/voice";

import bg from "@src/demoFiles/bg.png";
import sprite1 from "@src/demoFiles/sprite1.png";
import sprite2 from "@src/demoFiles/sprite2.png";
import sprite3 from "@src/demoFiles/sprite3.png";
import sprite4 from "@src/demoFiles/sprite4.png";

let text = "";
let pl = null;

let bgimg = new Image();
bgimg.src = bg;
let sprite1img = new Image();
sprite1img.src = sprite1;
let sprite2img = new Image();
sprite2img.src = sprite2;
let sprite3img = new Image();
sprite3img.src = sprite3;
let sprite4img = new Image();
sprite4img.src = sprite4;

async function init(debug) {
  if (debug) {
      debugLog = function (debugstring) {
          console.log(debugstring);
      };
  }

  let localStream;
  let pc1;
  let pc2;
  const offerOptions = {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1,
  };

  let silence = () => {
      var AudioContext =
          window.AudioContext || // Default
          window.webkitAudioContext || // Safari and old versions of Chrome
          false;
      let ctx = new AudioContext(),
          oscillator = ctx.createOscillator();
      let dst = oscillator.connect(ctx.createMediaStreamDestination());
      oscillator.start();
      return Object.assign(dst.stream.getAudioTracks()[0], {
          enabled: false,
      });
  };

  let black = ({ width = 640, height = 480 } = {}) => {
      let canvas = Object.assign(document.createElement("canvas"), {
          width,
          height,
      });
      canvas.getContext("2d").fillRect(0, 0, width, height);
      let stream = canvas.captureStream();
      return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  let blackSilence = (...args) =>
      new MediaStream([black(...args), silence()]);

  await start();
  await call();

  async function start() {
      debugLog("Requesting local stream");
      try {
          const stream = blackSilence(); // await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          debugLog("Received local stream");
          localStream = stream;
      } catch (e) {
          alert(`getUserMedia() error: ${e.name}`);
      }
  }

  async function call() {
      debugLog("Starting call");
      const videoTracks = localStream.getVideoTracks();
      const audioTracks = localStream.getAudioTracks();
      if (videoTracks.length > 0) {
          debugLog(`Using video device: ${videoTracks[0].label}`);
      }
      if (audioTracks.length > 0) {
          debugLog(`Using audio device: ${audioTracks[0].label}`);
      }
      const configuration = {};
      debugLog("RTCPeerConnection configuration:", configuration);
      pc1 = new RTCPeerConnection(configuration);
      debugLog("Created local peer connection object pc1");
      pc1.addEventListener("icecandidate", (e) => onIceCandidate(pc1, e));
      pc2 = new RTCPeerConnection(configuration);
      debugLog("Created remote peer connection object pc2");
      pc2.addEventListener("icecandidate", (e) => onIceCandidate(pc2, e));
      pc1.addEventListener("iceconnectionstatechange", (e) =>
          onIceStateChange(pc1, e)
      );
      pc2.addEventListener("iceconnectionstatechange", (e) =>
          onIceStateChange(pc2, e)
      );
      pc2.addEventListener("track", gotRemoteStream);

      localStream.getTracks().forEach((track) => {
          if (track.kind == "video") {
              MediaStream.prototype.videoSender = pc1.addTrack(
                  track,
                  localStream
              );
          } else if (track.kind == "audio") {
              MediaStream.prototype.audioSender = pc1.addTrack(
                  track,
                  localStream
              );
          } else {
              pc1.addTrack(track, localStream);
          }
      });
      debugLog("Added local stream to pc1");

      try {
          debugLog("pc1 createOffer start");
          const offer = await pc1.createOffer(offerOptions);
          await onCreateOfferSuccess(offer);
      } catch (e) {
          onCreateSessionDescriptionError(e);
      }
  }

  function onCreateSessionDescriptionError(error) {
      debugLog(`Failed to create session description: ${error.toString()}`);
  }

  async function onCreateOfferSuccess(desc) {
      debugLog(`Offer from pc1\n${desc.sdp}`);
      debugLog("pc1 setLocalDescription start");
      try {
          await pc1.setLocalDescription(desc);
          onSetLocalSuccess(pc1);
      } catch (e) {
          onSetSessionDescriptionError();
      }

      debugLog("pc2 setRemoteDescription start");
      try {
          await pc2.setRemoteDescription(desc);
          onSetRemoteSuccess(pc2);
      } catch (e) {
          onSetSessionDescriptionError();
      }

      debugLog("pc2 createAnswer start");
      try {
          const answer = await pc2.createAnswer();
          await onCreateAnswerSuccess(answer);
      } catch (e) {
          onCreateSessionDescriptionError(e);
      }
  }

  function onSetLocalSuccess(pc) {
      debugLog(`${getName(pc)} setLocalDescription complete`);
  }

  function onSetRemoteSuccess(pc) {
      debugLog(`${getName(pc)} setRemoteDescription complete`);
  }

  function onSetSessionDescriptionError(error) {
      debugLog(`Failed to set session description: ${error.toString()}`);
  }

  function gotRemoteStream(e) {
      if (MediaStream.prototype.remoteStream !== e.streams[0]) {
          MediaStream.prototype.remoteStream = e.streams[0];
          debugLog("pc2 received remote stream");
      }
  }

  async function onCreateAnswerSuccess(desc) {
      debugLog(`Answer from pc2:\n${desc.sdp}`);
      debugLog("pc2 setLocalDescription start");
      try {
          await pc2.setLocalDescription(desc);
          onSetLocalSuccess(pc2);
      } catch (e) {
          onSetSessionDescriptionError(e);
      }
      debugLog("pc1 setRemoteDescription start");
      try {
          await pc1.setRemoteDescription(desc);
          onSetRemoteSuccess(pc1);
      } catch (e) {
          onSetSessionDescriptionError(e);
      }
  }

  async function onIceCandidate(pc, event) {
      try {
          await getOtherPc(pc).addIceCandidate(event.candidate);
          onAddIceCandidateSuccess(pc);
      } catch (e) {
          onAddIceCandidateError(pc, e);
      }
      debugLog(
          `${getName(pc)} ICE candidate:\n${
              event.candidate ? event.candidate.candidate : "(null)"
          }`
      );
  }

  function onAddIceCandidateSuccess(pc) {
      debugLog(`${getName(pc)} addIceCandidate success`);
  }

  function onAddIceCandidateError(pc, error) {
      debugLog(
          `${getName(pc)} failed to add ICE Candidate: ${error.toString()}`
      );
  }

  function onIceStateChange(pc, event) {
      if (pc) {
          debugLog(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
          debugLog("ICE state change event: ", event);
      }
  }

  function getName(pc) {
      return pc === pc1 ? "pc1" : "pc2";
  }

  function getOtherPc(pc) {
      return pc === pc1 ? pc2 : pc1;
  }

  function debugLog(debugstring) {}
}

function supported() {
  if (HTMLVideoElement.prototype.captureStream) return true;
  else return false;
}

if (supported()) {
  MediaStream.prototype.constructor = init();

  MediaStream.prototype.replaceVideoTrack = function (track) {
      this.videoSender.replaceTrack(track);
  };

  MediaStream.prototype.replaceAudioTrack = function (track) {
      this.audioSender.replaceTrack(track);
  };
}


function ani(canvas: any) {
  console.log("start test")
    const ctx = canvas.getContext("2d");

    test();
    // pl = sprite1img
    // text = "测试文本"

    const draw = () => {
        /* 清空画布(或部分清空) */
        ctx.clearRect(0, 0, 1920, 1080);

        let canvasCtx = canvas.getContext("2d");
        canvasCtx.drawImage(bgimg, 0, 0, 1920, 1080);

        if (pl) {
            canvasCtx.drawImage(pl, 100, 600, 290, 340);
        }

        if (text) {
            ctx.font = "80px Arial";
            ctx.rect(500, 750, 1300, 200);
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fill();
            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fillText(text, 520, 870);
        }

        requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
}

function test() {
    let realystop = false;
    const stream = new MediaStream();
    const videoElem = document.getElementById("canvas");
    const videoStream = videoElem.captureStream();

    const audio = new Audio();
    getvoice({ tex: "這是平常某一日的夜晚。" }, (voice) => {
        audio.src = voice;
    });
    let voice2;
    getvoice({ tex: "在這現代都市之中的夜是如此明亮。" }, (voice) => {
        voice2 = voice;
    });

    let end = function () {
        audio.pause();
        setTimeout(() => {
            console.log("播放结束");
            realystop = true;
            stopRecord(video)
        }, 500);
    };

    let play2 = function () {
        audio.pause();
        audio.src = voice2;
        setTimeout(() => {
            audio.play();
            const audiostream = audio.captureStream();
            const audioTracks = audiostream.getAudioTracks();
            if (audioTracks?.[0]) {
                console.log("切换音轨");
                video.srcObject.replaceAudioTrack(audioTracks[0]);
            }
        }, 500);
        text = "在這現代都市之中的夜是如此明亮。";
        audio.onended = end;
    };

    document.addEventListener("click", () => {
        pl = sprite1img;
        text = "這是平常某一日的夜晚。";
        audio.play();

        audio.onended = play2;

        const audiostream = audio.captureStream();
        const audioTracks = audiostream.getAudioTracks();
        if (audioTracks?.[0]) {
            console.log("切换音轨");
            video.srcObject.replaceAudioTrack(audioTracks[0]);
        }

        //     mediaRecorder.stop();

        // setTimeout(() => {
        //     audio.pause()
        // }, 5000);
        
    video.srcObject.replaceVideoTrack(canvas.captureStream().getVideoTracks()[0])//Video


    video.playsinline = true
    video.autoplay= true
    video.play();
    console.log("录制开始");
    startRecord(video)
    });

    // const voice1 = getvoice("在這現代都市之中的夜是如此明亮。")

    

    //Setup video with empty stream
    var video = document.createElement("VIDEO");

    var tempStream = new MediaStream();
    setTimeout(function () {
      video.srcObject = tempStream.remoteStream;
    }, 500);

}

export { ani };


var mediaRecorder;
var chunks = [];
async function startRecord(remoteVideo) {
  mediaRecorder = new MediaRecorder(remoteVideo.captureStream());
  mediaRecorder.ondataavailable = function (e) {
    console.log("Added Data",e.data);
    chunks.push(e.data);
  }
  mediaRecorder.onstop = onStop;
  mediaRecorder.start();
}

async function stopRecord(remoteVideo) {
  mediaRecorder.stop();
}

function onStop(e) {
  
  const blob = new Blob(chunks, { type: "video/webm" });
  console.log("录制停止", blob);
  // download(blob)
}