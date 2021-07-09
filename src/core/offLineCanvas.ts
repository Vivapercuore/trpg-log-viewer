

import { Drawer } from "@src/core/draw"
import { monitorStore } from '@src/store/monitor-store'

//离屏渲染器,覆盖重写部分方法,用于输出帧序列
class OffLineDrawer extends Drawer {
    //初始化,开始绘制 
    start(canvas:Canvas,state){
        //先清空状态
        this.stop()
        //设置数据
        this.state = state
        this.canvas = canvas  //需要额外保存canvas实例
        this.ctx = canvas.getContext("2d");
        //不需要初始化帧时间 但需要提前计算帧时长
        this.frameRate = this.state?.frameRate || 30 //默认30帧
        this.frameTime = 1000/frameRate  //1000毫秒 分为每帧时间

        //绘制初始第一帧
        this.draw(false)  // 区别在于不自动进行下一帧绘制,不调用requestAnimationFrame
        // this.ctx.scale(1, -1);
        console.log(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2)
    }
    //停止绘制,重置状态
    stop(){
        delete this.state  
        delete this.ctx
        delete this.canvas  //需要额外清除canvas实例
    }
    //绘制下一帧  
    nextFrame(){
        this.ctx.clearRect(0, 0, this.state.resolutionRatio.width, this.state.resolutionRatio.height);
        this.draw(false) // 区别在于不自动进行下一帧绘制,不调用requestAnimationFrame
    }
    //更新帧时间 根据帧率获得
    updateTimeStamp(){ 
        if (!this.startTime) {
            this.startTime = 0
        }
        if (!this.prevTime) {
            this.prevTime = 0
        }
        this.prevTime = this.experienceTime //保存本帧时间
        this.experienceTime += frameRate //总时长
    }
    //获取帧数据
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
    }
}

const offLineControl = {
    //启动离屏绘制器
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
    //终止绘制器
    stop(){
        this.offLineDraw.stop()
        delete this.offLineDraw
    },
    async getFrame(n=1){
        if (n<1) { return []; } //防止异常输入
        const frames = []
        for (let index = 0; index < n; index++) {
            frames.push( await this.offLineDraw.getFrame() )
            this.offLineDraw.nextFrame()
            console.log("frames",index,"/",n)
        }
        return frames
    }
}

export { offLineControl };