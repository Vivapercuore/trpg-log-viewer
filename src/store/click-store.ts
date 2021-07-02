import {Store} from "@src/store/store";

interface Click extends Object {
    count: number
}
class dataStore extends Store<Click>{
    protected data() {
        return {
            count: 0
        };
    }

    incrementCount() {
        this.state.count++;
    }
}

export const clickStore: dataStore = new dataStore()
