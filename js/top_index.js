var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner')[0];
var imgs = bannerInner.getElementsByTagName('img');
var focusLi=document.getElementById('focusLi');
var lis=focusLi.getElementsByTagName('li');
//获取数据
/*(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','index_img_data.txt?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}/.test(xhr.status)){
            window.data=utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
//绑定数据
(function bingData(){
    if(window.data){
        var str='';
        var strLi='';
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+='<div><img src="" realSrc="'+curData.src+'"/></div>';
            strLi+=i===0?'<li class="selected"><span>'+curData.title+'</span></li>':'<li><span>'+curData.title+'</span></li>';
        }
        bannerInner.innerHTML=str;
        focusLi.innerHTML=strLi;
    }}
)();*/
//图片延迟加载
window.setTimeout(imgsDelayLoad,300)
function imgsDelayLoad(){
    for(var i=0;i<imgs.length;i++){
        if(i==0){
            utils.css(imgs[i].parentNode,'zIndex',1);
            animate(imgs[i].parentNode,{opacity:1},300);
        }
        var  tempImg=new Image();
        tempImg.index=i;
        tempImg.src=imgs[i].getAttribute('realSrc');
        tempImg.onload=function(){
            imgs[this.index].src=this.src;
            imgs[this.index].style.display='block';
            imgs[this.index].className='cursor';
        }
    }
};
//实现图片切换
var step = 0;//记录谁先显示
var timer = window.setInterval(autoMove, 2000);
function autoMove() {
    if (step == 4) {
        step = -1;
    }
    step++;
    setBannerImg();
}
//实现图片切换的核心代码
function setBannerImg() {//实现做图片更换的核心函数
    for (var i = 0; i < imgs.length; i++) {
        //让所有图片中索引值和step的值相等的哪一张，上升到最高层级1，其他的层级都设置为0
        if (i == step) {
            utils.css(imgs[i].parentNode, "zIndex", 1);
            //我要立刻把层级h上升的这张图片的透明度从0动画到1
            animate(imgs[i].parentNode, {opacity: 1}, 300, function () {
                var siblings = utils.siblings(this);  //this===imgs[i].parentNode
                //图片的父级div的所有兄弟节点全部把透明度设置为0，为了保证下一次的渐现效果
                for (var i = 0; i < siblings.length; i++) {
                    utils.css(siblings[i], "opacity", 0);
                }
            });
        } else {
            utils.css(imgs[i].parentNode, "zIndex", 0);
        }
    }
    focusAlian();
}
//焦点对齐
function focusAlian() {
    for (var i = 0; i < 5; i++) {
        lis[i].className = step == i ? 'selected' : '';
    }
};
banner.onmouseover = function () {
    window.clearInterval(timer);
};
banner.onmouseout = function () {
    timer = window.setInterval(autoMove, 2000);
};
//鼠标移动  画面更改
(function bindEvent() {
    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onmouseover = function () {
            step = this.index;
            setBannerImg();
        }
    }
})();


