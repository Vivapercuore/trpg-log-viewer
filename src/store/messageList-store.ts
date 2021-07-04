import { Store } from "@src/store/store";
import {reactive, readonly} from 'vue';

class dataStore extends Store<messageDataList> {
    protected data() {
        return {
            messages: reactive([])
        };
    }

    setEmpty(time, id?) {
        let list = this.state.messages
        if (time <= 0) {
            let index = list.findIndex(item => item.id === id);
            if (index>=0) {
                list?.splice(index,1)
            }
        } else if(time>0) {
            let index = list.findIndex(item => item.id === id);
            if (list?.[index]?.type === messageTypesName.Empty) {
                list[index].time = time;
            } else {
                list.push({
                    type: messageTypesName.Empty,
                    id:getID(),
                    time,
                });
            }
        }else{
            console.log("else")
        }
        this.state.messages = list
    }
}


export const messageListStore: dataStore = new dataStore()


function getID(){
    return Number(Math.random().toString().substr(3,16) + Date.now()).toString(36);
}


interface messageDataList {
    messages: [Empty | Message | Dice]
}


enum messageTypesName {
    Empty = "Empty",
    Message = "Message",
    Dice = "Dice",
}

interface Empty {
    type: messageTypesName.Empty
    time: number
    id  : String
}

interface Message {
    type: messageTypesName.Message
    id  : String
}

interface Dice {
    type: messageTypesName.Dice
    id  : String
}