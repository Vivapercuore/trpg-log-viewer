const defaultVoice {
    spd: 5, //选填	语速，取值0-15，默认为5中语速
    pit: 5, //选填	音调，取值0-15，默认为5中语调
    vol: 5, //选填	音量，取值0-15，默认为5中音量
    per: 0, //选填	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
}

export class roles {
    voice:VoiceType
    constructor(){
        this.voice = defaultVoice
    }

}

interface VoiceType {
    spd: number ；  //选填	语速，取值0-15，默认为5中语速
    pit: number ；  //选填	音调，取值0-15，默认为5中语调
    vol: number ； //选填	音量，取值0-15，默认为5中音量
    per: number ； //选填	发音人选择, 0为普通女声，1为普通男生，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女声
}