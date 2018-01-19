/**
 * Created by C.Azer on 2017/9/9.
 */

window.onload =pic_switch();

/*

    html 对应 id:

        父容器    container；
        图片容器   pic_box；
        按钮容器   pic_btn；

    按钮 class：   btn

    html #pic_box 需要加 "style="left: 0;"

    可能需修改的地方：

        37  img_width   图片宽度
        39  interval    自动播放间隔时间
        59  time        每张图片移动总时间
        60  interval    每次位移时间间隔

 */

function pic_switch() {

//公有变量
    var container = document.getElementById("container");
    var btn = document.getElementById("pic_btn").getElementsByClassName("btn");
    var len = btn.length;
    var cls = btn[1].getAttribute("class");
    var new_cls = cls + " on";
    var box = document.getElementById("pic_box");
    var img_width = 1002;
    var index = 1;
    var interval = 3000;
    var timer;
    var animated = false;   //用于判定是否正在执行 pic_move()

//按钮样式切换
    function btn_css(n) {
        if(btn[n].getAttribute("class") === cls){
            for(var j=0;j<len;j++){
                btn[j].setAttribute("class",cls);
            }
            btn[n].setAttribute("class",new_cls);
        }
    }

//图片移动
    function pic_move(offset) {
        animated = true;

        var new_left = parseInt(box.style.left) + offset;
        var limit = (len-1) * img_width;
        var time = 300; //位移总时间
        var interval = 10;  //每次位移时间间隔
        var v = offset/(time/interval); //每次的位移量

        function do_it() {
            if(( v<0 && parseInt(box.style.left)>new_left) || ( v>0 && parseInt(box.style.left)<new_left )){
                box.style.left = parseInt(box.style.left) + v + "px";
                setTimeout( do_it, interval );
            }else {
                animated = false;
                box.style.left = new_left + "px";
                if(new_left < -limit){
                    box.style.left = 0 + "px";
                }
            }
        }

        do_it();
    }

//按钮切换图片
        for(var i=0;i<len;i++){
            btn[i].onclick =function () {
                var n = parseInt(this.getAttribute("index")-1);
                var this_index = this.getAttribute("index");
                var offset = -img_width * (this_index - index);

                if(!animated){
                    pic_move(offset);
                    btn_css(n);
                    index = this_index;
                }
            };
        }

//自动播放
    function play() {
        timer = setInterval(function () {
            if(animated){
                return;
            }
            if( index === len ){
                index = 1;
            }else{
                index ++;
            }

            btn_css( index-1 );
            pic_move( -img_width );
        },interval);
    }

//停止自动播放
    function stop() {
        clearInterval(timer);
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}
























