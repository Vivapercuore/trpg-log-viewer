

import { Drawer } from "@src/core/draw"
import { monitorStore } from '@src/store/monitor-store'

class OffLineDrawer extends Drawer {
    start(canvas:Canvas,state){
        this.stop()
        console.log("start",state)
        this.state = state
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        console.log("ctx",this.ctx)
        this.draw(false)
        // this.ctx.scale(1, -1);
        console.log(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2)
    }
    stop(){
        delete this.ctx
        delete this.canvas
    }
    nextFrame(){
        this.ctx.clearRect(0, 0, this.state.resolutionRatio.width, this.state.resolutionRatio.height);
        this.draw(false)
    }
    async getFrame(){
        const mimeType = 'image/png';

        return new Promise((resolve, reject) =>{
            try {
                this.canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', () => {
                      const arrayBuffer = new Uint8Array(reader.result);
                      resolve(arrayBuffer)
                    });
                    reader.readAsArrayBuffer(blob);
                  }, mimeType,1);
            } catch (error) {
                reject(error)
            }
        }) 
        // return this.ctx.getImageData(0, 0, this.state.resolutionRatio.width, this.state.resolutionRatio.height).data.buffer// ArrayBuffer
    }
}

const offLineControl = {
    async start(){
        this?.offLineDraw?.stop()
        delete this?.offLineDraw
        delete this?.offLineCanvas
        this.offLineDraw = new OffLineDrawer()
        this.offLineCanvas = document.createElement("canvas");
        this.state = monitorStore.getState()
        this.offLineCanvas.width = this.state.resolutionRatio.width
        this.offLineCanvas.height = this.state.resolutionRatio.height
        this.offLineDraw.start(this.offLineCanvas,this.state)
        return this.getFrame()
    },
    async getFrame(n=1){
        if (n<1) { return []; } //防止异常输入
        const frames = []
        for (let index = 0; index < n; index++) {
            frames.push( await this.offLineDraw.getFrame() )
            this.offLineDraw.nextFrame()
        }
        return frames
    }
}

export { offLineControl };