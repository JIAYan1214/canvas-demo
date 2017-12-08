var  WINDOW_WIDTH = 1200;
var  WINDOW_HEIGHT = 748;
var Radius =8;
var space =1;
var MARGIN_LEFT =60;
var MARGIN_TOP = 30;
var balls = [];//存储小球
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

const endDate = new Date();
endDate.setTime(endDate.getTime()+3600*1000);//一个小时倒计时
var curShowTimeSeconds = 0;

window.onload = function () {
    var canvas = document.getElementById('canvas');

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);

    Radius = Math.round(WINDOW_WIDTH*4/5/108)-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);


    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    var ctx = canvas.getContext('2d');

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function () {
        render(ctx);
        update();
    },50);


}

function update() {
    var nextShowTimeSeconds =getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600),
        nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60),
        nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds/3600),
        curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60),
        curSeconds = curShowTimeSeconds%60;
    if(nextSeconds!=curSeconds){

        //十位数
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            getBallWithColor(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
        }
        //个位数
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            getBallWithColor(MARGIN_LEFT+15*(Radius+space),MARGIN_TOP,parseInt(curHours%10));
        }

        //十位数
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            getBallWithColor(MARGIN_LEFT+39*(Radius+space),MARGIN_TOP,parseInt(curMinutes/10));
        }
        //个位数
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            getBallWithColor(MARGIN_LEFT+54*(Radius+space),MARGIN_TOP,parseInt(curMinutes%10));
        }

        //十位数
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            getBallWithColor(MARGIN_LEFT+78*(Radius+space),MARGIN_TOP,parseInt(curSeconds/10));
        }
        //个位数
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            getBallWithColor(MARGIN_LEFT+93*(Radius+space),MARGIN_TOP,parseInt(curSeconds%10));
        }


        curShowTimeSeconds = nextShowTimeSeconds;
    }


    updateBalls();
}

/**
 * 小球运动
 */
function updateBalls() {
    let cont = 0;
    for(let i=0;i<balls.length;i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].speed;

        //下边缘碰撞检测
        if(balls[i].y >= WINDOW_HEIGHT-Radius){
            balls[i].y = WINDOW_HEIGHT-Radius;
            balls[i].vy = -balls[i].vy*0.75;//0.8摩擦系数
        }
    }
    //优化，因为每次绘制的时候，已经流出屏幕的小球仍然在数组内
    //有边缘center+半径

    for(let i =0;i<balls.length;i++){
        if(balls[i].x+Radius > 0 && balls[i].x - Radius>WINDOW_WIDTH){
            balls[cont++] = balls [i];//符合规则的小球放在数组的前面，cnt和i相等说明小球全部在屏幕内
        }

    }


    while (balls.length >cont ){
        balls.pop();
    }

}

/**
 * 绘制小球
 * @param x
 * @param y
 * @param num
 */
function getBallWithColor(x,y,num) {
    for(let i =0;i<digit[num].length;i++){
        for(let j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j] === 1){
                let aBall = {
                    x:x+2*j*(Radius+space)+(Radius+space),
                    y:y+2*i*(Radius+space)+(Radius+space),
                    speed:1.5+Math.random(),//加速度
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//速度
                    vy:-5,//向上的速度
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
        }
    }
}

function getCurrentShowTimeSeconds() {

    var curTime = new  Date();
    /*var endTime = endDate.getTime() - curTime.getTime();*///定时的效果
    //时钟的效果
    var hours = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

    return hours;//Math.round(endTime/1000) >=0 ? Math.round(endTime/1000) : 0
}

/**
 * 绘制
 * @param ctx
 */

function render(ctx) {
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方法。
    //var hours = 12,minutes = 34,seconds = 56;
    /*var date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();*/
    var hours = parseInt(curShowTimeSeconds/3600),
        minutes = parseInt((curShowTimeSeconds-hours*3600)/60),
        seconds = curShowTimeSeconds%60;


    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    //15*(Radius+space)横向是7*10的矩阵，14倍的边长加一倍的边距每个数字占据15
    renderDigit(MARGIN_LEFT+15*(Radius+space),MARGIN_TOP,parseInt(hours%10),ctx);

    renderDigit(MARGIN_LEFT+30*(Radius+space),MARGIN_TOP,10,ctx);

//冒号4*10的矩阵8倍的边长，在加点边距 9倍的，所以多加9
    renderDigit(MARGIN_LEFT+39*(Radius+space),MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT+54*(Radius+space),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT+69*(Radius+space),MARGIN_TOP,10,ctx);

    renderDigit(MARGIN_LEFT+78*(Radius+space),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+93*(Radius+space),MARGIN_TOP,parseInt(seconds%10),ctx);

    //绘制小球
    for(let i=0;i<balls.length;i++){
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,Radius,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
    }
}
function renderDigit(x,y,num,ctx) {
    ctx.fillStyle = "rgb(0,102,153)";
    for(let i = 0;i<digit[num].length;i++){
        for(let j = 0;j<digit[num][i].length;j++){
            if(digit[num][i][j] === 1){
                ctx.beginPath();
                //(x,y)=>(2j*(R+z)+(R+x),2i*(R+z)+(R+z)+y)R:半径，z是圆到正方形的边界；圆在正方形且不接触正方形
                ctx.arc(x+2*j*(Radius+space)+(Radius+space),y+(Radius+space)+(Radius+space)*i*2,Radius,0,2*Math.PI,false);
                ctx.closePath();
                ctx.fill();
            }
        }
    }


}