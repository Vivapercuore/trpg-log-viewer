

class Drawer {
    start(canvas:Canvas,state){
        this.stop()
        console.log("start",state)
        this.state = state
        this.ctx = canvas.getContext("2d");
        this.raf = requestAnimationFrame(()=>{
            this.draw()
        });
        // this.ctx.scale(1, -1);
        console.log(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2)
    }
    stop(){
        if (this.raf) {
            console.log("stop")
            cancelAnimationFrame(this.raf)
            delete this.ctx
        }
    }
    clear(){
        //没想好要怎么clear
        console.log("clear")
    }
    draw(continued=true){
        // console.log("draw")
        this.ctx.save()
        this.setOrigin()
        // this.test()
        this.paintImg(this.state.bg)
        
        this?.state?.picList?.forEach(element => {
            this.paintImg(element,{
                y:Math.sin(new Date().getTime()/1000) * 50 
            })
        });
        if (continued) {
            this.nextFrame()
        }
        this.ctx.restore()
    }
    nextFrame(){
        this.raf = requestAnimationFrame(()=>{
            this.ctx.clearRect(0, 0, this.state.resolutionRatio.width, this.state.resolutionRatio.height);
            this.draw()
        });
    }
    setOrigin(){
        this.ctx.translate(this.state.resolutionRatio.width/2, this.state.resolutionRatio.height/2);
    }
    test() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(0, 0, 200,200)  // 原点处画了一个200*200的矩形
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(0, 0, 100,100) // 
    }


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

const drawer = new Drawer();


function getImageData(data){
    if (!drawer?.ctx||!data?.img) { return; }
    getImageData()
}

interface paintImg {
    img: string;
    position: position;
    size: size;
}


export { Drawer };
export { drawer };