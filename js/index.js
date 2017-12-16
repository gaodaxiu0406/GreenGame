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

/*$("#description").click(function(){
	$(".GameDescription").css("display","block");
	$(".green-list").css("display","none");
	$("#green").css("color","#195623");
	document.getElementById("green").style.background="#c9d8e7";
});*/

//获取当天总次数
$(document).ready(function(){
	$.ajax({
        type: "POST",
        url: "http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=number",
        contentType: "application/json; charset=utf-8",
        data:{},
        dataType: "json",
        success: function (data) {
        	console.log(data);
            if(data.data.num==0){
				document.getElementById("number").innerHTML="请充值";
            }
            if (data.info=="成功") {
            	document.getElementById("number").innerHTML=data.data.num;
            }
        },
        error: function (data) {
			console.log("获取红包剩余次数失败！")
        }
	});
})

//点击推动绿色
$("#green").click(function(){
	if($("#green-list").css("display")=="none"){
		$("#green-list").show();
		$('.green').add('.green').css({'background':'#ca1e21',"color":"#fff"});
	}else{
		$("#green-list").hide();
		$('.green').add('.green').css({'background':'#c9d8e7',"color":"#195623"});
	}
});

/*点击红包弹窗*/
$(document).ready(function() {
	var win = (parseInt($(".background ul").css("width")));
	$(".mo").css("height", $(document).height());
	$(".background ul").css("height", $(document).height());
	//点击红包弹窗，关闭红包弹窗
	$(".mo").click(function(){
		$.ajax({
        type: "POST",
        url: "http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=number",//获取当天总次数
        contentType: "application/json; charset=utf-8",
        data:{},
        dataType: "json",
        success: function (data) {
        	console.log(data);
        	if(data.data.num==0){
				document.getElementById("number").innerHTML="请充值";
            }
            if (data.info=="成功") {
            	document.getElementById("number").innerHTML=data.data.num;
            }
        },
        error: function (e) {
        	console.log(e)
			console.log("获取红包剩余次数失败！")
        }
		});
		setTimeout(function(){
			$(".mo").css("display", "none");
		},500)
	});
	
	//增加红包
	var add = function() {
		var hb = parseInt(Math.random() * (9 - 1) + 1);//红包
		var Wh = parseInt(Math.random() * (70 - 30) + 20);//红包大小
		var Left = parseInt(Math.random() * (win - 150) + 150);
		var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";//角度
		num++;
		$(".background ul").append("<li class='li" + num + "' ><a href='javascript:;'><img src='img/red" + hb + ".png'></a></li>");
			if(num<=30){
				$(".li" + num).css({
					"left": Left,
				});
				$(".li" + num + " a img").css({
					"width": Wh,
					"transform": "rotate(" + rot + ")",
					"-webkit-transform": "rotate(" + rot + ")",
					"-ms-transform": "rotate(" + rot + ")", /* Internet Explorer */
					"-moz-transform": "rotate(" + rot + ")", /* Firefox */
					"-webkit-transform": "rotate(" + rot + ")",/* Safari 和 Chrome */
					"-o-transform": "rotate(" + rot + ")" /* Opera */
				});	
				$(".li"+num).addClass("redDown") 
				//点击红包的时候弹出模态层
				$(".li" + num).click(function(){
					if(document.getElementById("number").innerHTML!="请充值"){
						$(".mo").css("display", "block");
						$.ajax({
        					type: "POST",
        					dataType: "json",
       						url: "http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=addrecord",//获取开出红包的钱
        					contentType: "application/json; charset=utf-8",
        					data:"",
        					success: function (data){
        	console.log(data);
        	document.getElementById("money").innerHTML=data.data.money;
        },
        error: function (e) {
			console.log(e)
//      	location.reload();
//      	alert("红包提交失败！");
        }
    	});
					}else{
							alert("您的次数已用尽，请充值您的次数！");
					}
				});
				setTimeout(add,200);
			}
	}
	var num = 0;
	setTimeout(add,0);
	});

//点击充值的次数
$(".green-list span").click(function(){
	var obj = {rednumber:''};
	console.log(obj)
	if(this.id=="num10"){
		obj.rednumber = 10;
	}else if(this.id=="num30"){
		obj.rednumber = 30;
	}else if(this.id=="num50"){
		obj.rednumber = 50;
	}else if(this.id=="num110"){
		obj.rednumber = 110;
	}
	obj=JSON.stringify(obj);
	console.log(obj);
	$.ajax({
        type: "POST",
        url: "http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=rednumber",//提交充值次数
        contentType: "application/json; charset=utf-8",
        data:obj,
        dataType: "json",
        success: function (data) {
        	console.log(data);
            if (data.info=="成功") {
            	document.getElementById("num-alert").style.display="block";
            }
        },
        error: function (data) {
			console.log("充值次数失败！");
        }
	});
	var index = $(this).index();
	$(this).attr('class',"num selected").siblings('span').attr('class','num');
	$(this).css('color',"#fff").siblings('span').css('color','#ca1e21');
});


document.getElementById("sure").onclick=function(){
	document.getElementById("num-alert").style.display="none";	
	document.getElementById("green-list").style.display="none";
	document.getElementById("green").style.background="#c9d8e7";
	document.getElementById("green").style.color="#195623";
	$(".green-list span").css("color","#ca0202");
    $(".green-list span").attr("class","num");
    console.log(document.getElementById("number").innerHTML);
}

$("#list").click(function(){   
     //点击图片后发送跳转到指定页面的事件。
    window.location.href="list.html"
})
