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
   4.miterLimit = num;miter相互使用的 默认值是10
   </br>5.getlineDash()返回包含当前虚线样式，长度不为负偶数的一个数组</br>
   </br>6.setLineDash()设置当前虚线的样式</br>
   </br>7.lineDashOffset()虚线样式的起始偏移量
     
## 图形的属性

>  1.fillStyle = color;填充颜色</br>
   2.strokeStyle ＝ color；图形轮廓颜色</br>
   3.透明度globalAlpha = 透明度的数值；
   4.rgba设置颜色和透明度</br>
   </br>5.上一部分线性的属性不在赘述</br>
   </br>6.渐变Gradients；新建一个canvasGradient对象；canvasGradient＝createLinearGradient(x1, y1, x2, y2)
                      createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
                      canvasGradient＝createRadialGradient(x1, y1, r1, x2, y2, r2)
                      createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
                      然后就可以使用addColorStop(position,color)进行填充颜色；addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。
   </br>7.图案样式Pattern；ctx.createPattern(img,type);该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。</br>
   </br>8.阴影shadows的属性：ctx.shadowOffsetX = value;ctx.shawOffsetY = value;shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离,负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
               ctx.shawBlur = value;模糊半径；ctx.shadowColor ＝ color；颜色
   </br>9.填充规则：当我们用到 fill（或者 clip和isPointinPath ）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。
               两个可能的值：
                "nonzero": 默认值.
                "evenodd": .

## 图形的变换

>   位移 translate(x,y)   
    如果有多个位移，由于canvas是覆盖的，所以多个位移会逐个地往后叠加；避免这个问题，位移后再位移去；由于这样太过于繁琐，
    canvas又提供了很好的解决位移叠加的方案，ctx.save();ctx.restore();成对出现；绘制之前先save()，绘制结束之后再恢复restore();这俩个事保存canvas绘图状态的方法；
    </br>旋转 rotate(deg)  角度是以弧度为单位的;顺时针方向
    </br>缩放 scale(sx,sy);是对图形的缩放，1大小不变，小于1缩小，大于1进行放大</br>
    </br>transform(m11, m12, m21, m22, dx, dy)
    m11：水平方向的缩放;
    m12：水平方向的偏移;
    m21：竖直方向的偏移;
    m22：竖直方向的缩放;
    dx：水平方向的移动;
    dy：竖直方向的移动;</br>
    </br>setTransform(m11, m12, m21, m22, dx, dy)这个方法会把当前的矩阵变化为单位矩阵，然后使用相同的参数调用transform，如果任意一个参数为无限大，那么这个矩阵也为无限大，否则会抛出异常；简单说，该方法取消了当前图形的变形，然后设定为指定的变形</b>
    </br>resetTransform（）；重置当前图形的变换；与transform（1，0，0，1，0，0）；是同样的效果
    
## 合成与裁剪
>  1.globalCompositeOperation = type;这个属性设定了在绘制新的图形采用遮盖的策略；其值是一个标识12种遮盖方式的字符串；
   
# 裁剪
> 1.裁剪路径不会在canvas上面绘制新的图形；而且它永远不会受新的图形的影响，这个特性在制定区域绘图很好用；
  2.绘制图形在之前只介绍了fill，stroke两种方法，第三个方法是clip裁剪
