(function () {
    window.Draw = function(obj){
        this.height = obj.height;
        this.width =obj.width;
        this.id = obj.ele;
        this.img = obj.img;//绘制背景图
        this.selImg = obj.selImg;//标记绘制过的背景图
        this.stone = obj.stone;
        this.arrS = [3,6,9,12,15];

        this.matrix = obj.matrix;//存储绘图矩阵

        this.devicePixelRatio = window.devicePixelRatio || 1;

    };
    /**
     * 初始化canvas
     */
    Draw.prototype.initDom = function () {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id','canvas');
        canvas.style.cssText = 'background-color:#eeeeee;display: inline-block;margin:0 auto;';
        document.querySelector(this.id).appendChild(canvas);
        var width = this.width || 320;
        var height = this.height || 320;

        // 高清屏锁放
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * this.devicePixelRatio;
        canvas.width = width * this.devicePixelRatio;

    }
    //初始化Draw
    Draw.prototype.init = function () {
        this.initDom();
        //初始化canvas画布暂未有触摸事件
        this.touchFlag = false;

        //绘制圆
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.step = 0;

        //绘制星星
        this.drawStart();
        //绑定事件
        this.bindEvent();
    }
    //绑定绘制方法
    Draw.prototype.bindEvent = function () {
        var self = this;
        //开始触摸屏幕
        this.canvas.addEventListener('touchstart',function (e) {
            e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
            //获取点击点的坐标
            let po = self.getPosition(e);
            //判断点击坐标是否在区域内部
            self.judgePosition(po);
        },false);
        //开始移动
        this.canvas.addEventListener('touchmove',function (e) {
            if (self.touchFlag) {
                //更新每个滑动坐标
                self.update(self.getPosition(e));
            }
        },false);
        //结束
        this.canvas.addEventListener('touchend',function (e) {
            if(self.touchFlag){
                self.touchFlag = false;
                self.storePoint(self.lastPoint);
                //结束绘制后，清空绘制的dian
                setTimeout(function () {
                   //清空画布，重新绘制图标
                   self.drawStart();
                },1000);
            }
        })
    }
    Draw.prototype.storePoint = function (points) {
        if(points.length<=1){//只触发一个点
            alert('连见点太少')
        }else{
            //检查链接的点
            this.checkPoint(points);
        }
    }
    /**
     * 检查连接的点
     * @param points
     */
    Draw.prototype.checkPoint = function (points) {
        //已经是最短路线
        this.step += 1;

        //否则
        //this.step保持不变


    }
    /**
     * 获取移动坐标
     * @param po 坐标
     */
    Draw.prototype.update = function (po) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for(let i = 0;i<this.arr.length;i++){
            this.createStart(this.arr[i].x,this.arr[i].y,this.arr[i].x2,this.arr[i].y2);
        }
        //划线
        this.drawLine('#03eaff',po);
        this.drawSelStart();


        for (var i = 0 ; i < this.restPoint.length ; i++) {
            if (Math.abs(po.x - this.restPoint[i].x) < this.radius && Math.abs(po.y - this.restPoint[i].y) < this.radius) {
                this.drawSelStart(this.restPoint[i].x2, this.restPoint[i].y2);
                this.lastPoint.push(this.restPoint[i]);
                this.restPoint.splice(i, 1);
                break;
            }
        }


    }
    Draw.prototype.drawLine = function (style,po) {

        this.ctx.beginPath();
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth = this.radius/3;
        this.ctx.moveTo(this.lastPoint[0].x,this.lastPoint[0].y);

        for(let i= 0;i<this.lastPoint.length;i++){
            this.ctx.lineTo(this.lastPoint[i].x,this.lastPoint[i].y);
        }
        this.ctx.lineTo(po.x, po.y);

        this.ctx.stroke();

    }

    //判断点击的区域
    Draw.prototype.judgePosition = function (po) {
        for (var i = 0 ; i < this.arr.length ; i++) {
            if (Math.abs(po.x - this.arr[i].x) < this.radius && Math.abs(po.y - this.arr[i].y) < this.radius) {
                this.touchFlag = true;
                this.lastPoint.push(this.arr[i]);
                this.drawSelStart(this.arr[i].x2,this.arr[i].y2);//更换星星图片
                this.restPoint.splice(i,1);
                break;
            }
        }
    }
    Draw.prototype.drawSelStart = function (x,y) {
        //this.ctx.clearRect(x,y, 2*this.radius,2*this.radius);
        for (let i = 0 ; i < this.lastPoint.length ; i++) {
            //this.ctx.fillStyle = 'transparent';
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.drawImage(this.selImg,this.lastPoint[i].x2,this.lastPoint[i].y2,2*this.radius,2*this.radius);
            //this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.radius, 0, Math.PI * 2, true);
            this.ctx.closePath();
            //this.ctx.fill();
            this.ctx.restore();
        }
    }
    //绘制星星
    Draw.prototype.drawStart = function () {
        let matrix = this.matrix[this.step];//生成图片的矩阵
        let count = 0;
        this.lastPoint = [];//标记最后一个点
        this.radius = this.ctx.canvas.width / (1+4*Number(matrix[0])).toFixed(1);//保留一位小数,半径
        this.arr = [];
        this.restPoint = [];

        /*var space = this.radius/2,
            marginLeft = this.radius,
            marginTop = this.radius/2;*/
        var space = this.radius/3,
            marginLeft = this.radius,
            marginTop = this.radius*3/5;
        //绘制二阶矩阵，数组第一位是横向，二位是纵向
        for(let i = 0;i<Number(matrix[1]);i++){
            for(let j = 0;j<Number(matrix[0]);j++){
                count++;
                let start = {
                    x: marginLeft + (j * 2 + 1) * (this.radius + marginLeft),
                    y: marginTop + (i * 2 + 1) * (this.radius + space),
                    x2: marginLeft + (j * 2 + 1) * (this.radius + marginLeft) - this.radius,
                    y2: marginTop + (i * 2 + 1) * (this.radius + space) - this.radius,
                    index:count
                }
                this.arr.push(start);
                this.restPoint.push(start);
            }
        }
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);



        for(let i =0;i<this.arr.length;i++){
            this.createStart(this.arr[i].x,this.arr[i].y,this.arr[i].x2,this.arr[i].y2);
        }
    }

    Draw.prototype.createStone = function (x1,y1,x2,y2,type) {
        this.ctx.save();
        this.ctx.beginPath();
        //this.ctx.fillStyle = 'transparent';
        //  this.ctx.arc(x1,y1, this.radius, 0, 2 * Math.PI, false);
        if(type){
            this.ctx.drawImage(this.stone,x2,y2,2*this.radius,2*this.radius);

        }else{
            this.ctx.drawImage(this.img,x2,y2,2*this.radius,2*this.radius);
        }


        this.ctx.closePath();
        // this.ctx.fill();
        this.ctx.restore();
    }
    //创建星星
    Draw.prototype.createStart = function (x1,y1,x2,y2) {
        this.ctx.save();
        this.ctx.beginPath();
        //this.ctx.fillStyle = 'transparent';
      //  this.ctx.arc(x1,y1, this.radius, 0, 2 * Math.PI, false);
        this.ctx.drawImage(this.img,x2,y2,2*this.radius,2*this.radius);

        this.ctx.closePath();
       // this.ctx.fill();
        this.ctx.restore();
    }

    //获取点击星星坐标点
    Draw.prototype.getPosition = function (e) {
        var rect = e.currentTarget.getBoundingClientRect();
        //计算点击坐标点
        var po = {
            x: (e.touches[0].clientX - rect.left)*this.devicePixelRatio,
            y: (e.touches[0].clientY - rect.top)*this.devicePixelRatio
        };
        return po;
    }
})();