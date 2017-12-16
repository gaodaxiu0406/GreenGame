~function(){
	var dw=750,
	winW=document.documentElement.clientWidth,
	htmlFont=100,
	htmlFont=winW/dw*100;
	if(winW>dw){
		$("document.body").css({
			width:dw,
			margin:"0 auto"
		});
		return;
	}
	document.documentElement.style.fontSize=htmlFont+"px";
}();

//点击关闭按钮  关闭游戏说明页面 同时显示游戏主页
var close=document.getElementById("close");
close.onclick=function(){
	$('.GameDescription .close').add('.GameDescription').css('display', 'none');
	$('.GameDescription .close').add('.background').css('display', 'block');
}