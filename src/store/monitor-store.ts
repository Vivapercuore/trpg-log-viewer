import {Store} from "@src/store/store";


import bgPic from '@src/assets/bg.png'
import kpPic from '@src/assets/pl1.png'

interface MonitData extends Object {
    resolutionRatio:size
    bg: pic
    picList: [pic]
    monitSize:size
    messageLimitHeight:number
}

interface position extends Object {
    x: number
    y: number
}
interface size extends Object {
    width: number
    height: number
}

interface pic extends Object  {
    img:any
    position: position
    size: size
}

const kp:pic = {
    img:new Image(),
    position: {
        x: -700,
        y: -250,
    },
    size: {
        width: 267,
        height: 290,
    }
}
kp.img.src = kpPic;

const bg:pic = {
    img:new Image(),
    position: {
        x: 0,
        y: 0,
    },
    size: {
        width: 1920,
        height: 1080,
    }
}
bg.img.src = bgPic;

class dataStore extends Store<MonitData> {
    protected data() {
        return {
            resolutionRatio:{
                width: 1920,
                height: 1080,
            },
            bg: bg,
            picList: [kp],
            monitSize:{
                width: 0,
                height: 0,
            }
        };
    }

    incrementCount() {
        this.state.count++;
    }
    
    setMonitSize(w,h) {
        let messageLimitHeight =500
        if (window.innerWidth > 1920) {
          messageLimitHeight = h
        }
        this.state.monitSize = {
            width: w,
            height: h
        };
        this.state.messageLimitHeight = messageLimitHeight
    }
}

export const monitorStore: dataStore = new dataStore()
