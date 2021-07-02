import {Store} from "@src/store/store";


import bgPic from '@src/assets/bg.png'
import kpPic from '@src/assets/pl1.png'


class dataStore extends Store<MonitData> {
    protected data() {
        return {
            progress:0,
            logor: [],
        };
    }

    setProgress(progress) {
        this.state.progress = progress;
    }

    addLog({ type, message }){
        this.loger.push({ type, message })
    }
}

export const monitorStore: dataStore = new dataStore()