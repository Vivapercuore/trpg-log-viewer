import {Store} from "@src/store/store";


import bgPic from '@src/assets/bg.png'
import kpPic from '@src/assets/pl1.png'

interface MonitData extends Object {
    resolutionRatio:size
    bg: pic
    picList: [pic]
}

interface position extends Object {
    x: Number
    y: Number
}
interface size extends Object {
    width: Number
    height: Number
}

interface pic extends Object  {
    img:any
    position: position
    size: size
}

// enum side {
//     leftSide = "left"
//     rightSide = "right"
// }
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
    protected data(): Click {
        return {
            resolutionRatio:{
                width: 1920,
                height: 1080
            },
            bg: bg,
            picList: [kp],
        };
    }

    incrementCount() {
        this.state.count++;
    }
}

export const monitorStore: dataStore = new dataStore()
