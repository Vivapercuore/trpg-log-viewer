

class Drawer {
    //初始化,开始绘制
    start(canvas:Canvas,state){
        //先清空状态
        this.stop()
        //设置数据
        this.state = state
        this.ctx = canvas.getContext("2d");
        this.updateTimeStamp()//初始化帧时间
        //开始绘制
        this.raf = requestAnimationFrame(()=>{
            this.draw()
        });
        this.startTime = new Date().getTime();
        // this.ctx.scale(1, -1);
        console.log(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2)
    }
    //停止绘制,重置状态
    stop(){
        if (this.raf) {
            cancelAnimationFrame(this.raf)
            delete this.state  
            delete this.ctx
        }
    }
    //更新帧时间 根据时间计算帧时间
    updateTimeStamp(){
        if (!this.startTime) {
            this.startTime = new Date().getTime();
        }
        if (!this.prevTime) {
            this.prevTime = new Date().getTime();
        }
        var now = new Date().getTime()；
        this.frameTime = now - this.prevTime //本帧时间
        this.experienceTime = now - this.startTime //总时长
        this.prevTime = now //保存本帧时间
    }
    clear(){
        //没想好要怎么clear
        console.log("clear")
    }
    //绘制每个部分  continued:显示模块中需要自动刷新
    draw(continued=true){
        //更新帧时间
        this.updateTimeStamp()

        this.ctx.save()
        //设置原点
        this.setOrigin()

        //绘制背景
        this.paintImg(this.state.bg)
        
        //图片列表  PL
        this?.state?.picList?.forEach(element => {
            this.paintImg(element,{
                y:Math.sin(this.experienceTime/1000) * 50 
            })
        });
        //自动刷新下一帧
        if (continued) {
            //下一帧
            this.nextFrame()
        }
        this.ctx.restore()
    }
    //下一帧
    nextFrame(){
        this.raf = requestAnimationFrame(()=>{
            //清空画布
            this.ctx.clearRect(0, 0, this.state.resolutionRatio.width, this.state.resolutionRatio.height);
            //重绘
            this.draw()
        });
    }
    //设置原点
    setOrigin(){
        this.ctx.translate(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2);
    }
    //测试绘制
    test() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(0, 0, 200,200)  // 原点处画了一个200*200的矩形
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0, 0, 100,100) // 
    }
    //绘制图片
    paintImg(data:paintImg,offset){
            if (!this?.ctx||!data?.img) { return; }
            //环境没有准备好,直接退出
            this?.ctx?.drawImage(
                data.img,data.position.x - data.size.width/2 + (offset?.x||0), //向左半宽 回到中心点
                - (data.position.y + data.size.height/2) + (offset?.y||0), //向上半高 回到中心点
                data.size.width,
                data.size.height
            );
        }

}

//显示模块绘制器
const drawer = new Drawer();

interface paintImg {
    img: string;
    position: position;
    size: size;
}

export { Drawer };
export { drawer };