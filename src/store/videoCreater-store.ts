import {Store} from "@src/store/store";

class dataStore extends Store<MonitData> {
    protected data() {
        return {
            progress:0,
            loger: [],
        };
    }

    setProgress(progress) {
        this.state.progress = progress;
        /*
         * progress is a float number between 0 to 1.
         */
    }

    addLog({ type, message }){
        this.state.loger.push({ type, message })
        /*
         * type can be one of following:
         *
         * info: internal workflow debug messages
         * fferr: ffmpeg native stderr output
         * ffout: ffmpeg native stdout output
         */
    }
}

export const videoCreaterStore: dataStore = new dataStore()