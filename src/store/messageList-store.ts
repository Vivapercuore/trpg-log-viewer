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
        if (!id) { //新增
            list.push({
                type: messageTypesName.Empty,
                id:getID(),
                time,
            });
        }else{ //删改
            if (time <= 0) { //删除
                let index = list.findIndex(item => item.id === id);
                if (index>=0) {
                    list?.splice(index,1)
                }
            } else {
                let index = list.findIndex(item => item.id === id);
                if (list?.[index]?.type === messageTypesName.Empty) { //修改
                    list[index].time = time;
                } else { //无id,新增处理
                    list.push({
                        type: messageTypesName.Empty,
                        id:getID(),
                        time,
                    });
                }
            }
        }
        //刷新数据,触发state更新
        this.state.messages = list
    }

    setMessage(message) {
        let list = this.state.messages
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