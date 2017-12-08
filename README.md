# canvas-demo
有关canvas相关demo

## canvas 基于状态的绘制

## Draw line
>
  ctx.moveTo(x,y);从。。
  ctx.lineTo(x,y);到。。点
  ctx.lineWidth = num;线宽
  ctx.strokeStyle = color;线条颜色
  ctx.stroke();//绘制

## 绘制封闭多边形
>
  context.beginPath();
  context.closePath();

  颜色填充：
  context.fillStyle = color;
  context.fill();

## Draw Rect

>
    context.beginPath();
    context.rect(x,y,width,height);//绘制矩形路径
    context.closePath();

    context.fillRect(x,y,width,height);//填充矩形
    context.strokeRect(x,y,width,height);//矩形的边框

## 线条的属性

>  1.lineWidth
   2.lineCap=>butt(default)   round 圆头            square方头  线条末端的样式
   3.lineJoin=>Canvas 2D API 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。
     round：相交绘制拐角的形状
     bevel在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
     miter 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域default
     miterLimit = num;miter相互使用的 默认值是10

## 图形的变换

>   位移 translate(x,y)   如果有多个位移，由于canvas是覆盖的，所以多个位移会逐个地往后叠加；避免这个问题，位移后再位移去；由于这样太过于繁琐，

      canvas又提供了很好的解决位移叠加的方案，ctx.save();ctx.restore();成对出现；绘制之前先save()，绘制结束之后再恢复restore();这俩个事保存canvas绘图状态的方法；



    旋转 rotate(deg)
    缩放 scale(sx,sy)