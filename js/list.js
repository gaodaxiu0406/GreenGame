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

document.getElementById("back").onclick=function(){
	window.location.href="index.html"
}

/*$(".bankCard input").blur(function(){
  $("footer").css("display","none");
  $(".bottom-list").css("display","none");
});
if(document.getElementById("bankCardlist").style.display=="block"){
	$("footer").css("display","none");
    $(".bottom-list").css("display","none");
}*/

//获取已提交申请的数据 显示到页面
$.ajax({
        url:"http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=sqrecord",
        type:"get",
        dataType:"json",
        async:true,
        cache:true,//缓存  open(type,url,async)
        timeout:null,//xhr.timeout 设置请求超时的时间
        data:null,
        success:function (data) {
			console.log(data);
			var htmltxt="";
			
			for(var i=0;i<data.data.lists.length;i++){
				htmltxt+='<li><div class="left"><h3>开红包金额</h3><span id="time" class="time">'+new Date(parseInt(data.data.lists[i].click) * 1000).toLocaleString().replace(/\//g, "-").replace(/上午|下午/g, " ")+'</span></div><div class="right"><span id="money" class="money">'+data.data.lists[i].rmb+'元</span><span class="success">已提交申请</span></div></li>'	
			}
			htmltxt+='<li><h3 class="left">合计红包金额</h3><span class="all right">+'+data.data.rmb+'元</span></li>'
			$("#submitted").append(htmltxt)
        },
        error:function (e) {
            console.log(e);
        }
    })

//获取未领取数据 显示到页面
$.ajax({
        url:"http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=record",
        type:"get",
        dataType:"json",
        async:true,
        cache:true,//缓存  open(type,url,async)
        timeout:null,//xhr.timeout 设置请求超时的时间
        data:null,
        success:function (data) {
			console.log(data);
			var htmltxt="";
			if(data.data.lists){
				for(var i=0;i<data.data.lists.length;i++){
					htmltxt+='<li><div class="left"><h3>开红包金额</h3><span id="time" class="time">'+new Date(parseInt(data.data.lists[i].click) * 1000).toLocaleString().replace(/\//g, "-").replace(/上午|下午/g, " ")+'</span></div><div class="right"><span id="money" class="money">'+data.data.lists[i].rmb+'元</span><span class="success">未领取</span></div></li>'
				}
				htmltxt+='<li><h3 class="left">合计红包金额</h3><span class="all right">+'+data.data.rmb+'元</span></li>'
				$("#unreceived").append(htmltxt)
			}else{
				console.log(data.info);
			}

        },
        error:function (e) {
            console.log(e);
        }
  });

/*点击 申请工资发放*/
$(".button").click(function(){
$(".bottom-list").css("display","block");
	$.ajax({//获取未领取金额
        url:"http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=record",
        type:"get",
        dataType:"json",
        async:true,
        cache:true,//缓存  open(type,url,async)
        timeout:null,//xhr.timeout 设置请求超时的时间
        data:null,
        success:function (data) {
			console.log(data);
			var htmltxt="";
			if(data.data.rmb>=50){
				$(".bottom-list").css("display","block");
			}else{
				$(".bottom-list").css("display","none");
				alert("满50元以上或满10天可申请工资发放!")
				console.log(data.info,88,89)
			}

        },
        error:function (e) {
            console.log(e);
        }
  });
  
  
});

/*银行卡信息弹出框 的 提交按钮*/
$("#submit").click(function(){
	var obj = {name:"",bank:"",idnumber:"",mobile:"",form:2};
	obj.name=document.getElementById("name").value;
	obj.bank=document.getElementById("bank").value;//银行卡号
	obj.idnumber=document.getElementById("idnumber").value;//身份证号
	obj.mobile=document.getElementById("mobile").value;//手机号
	obj=JSON.stringify(obj);
	console.log(obj);
	if((obj.name!="")&&(obj.bank!="")&&(obj.idnumber!="")&&(obj.mobile!="")){
		$.ajax({
        url:"http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=apply",
        type:"post",
        dataType:"json",
        async:true,
        cache:true,
        timeout:null,
        data:obj,//form 1是红包，2是银行卡
        success:function (data) {
			console.log(data,data.info);
			$(".bankCard").css("display","none");
			if(data.code==200){
//				$(".bankCard").css("display","none");
				document.getElementById("name").value="";
				document.getElementById("bank").value="";
				document.getElementById("idnumber").value="";
				document.getElementById("mobile").value="";
				$("#bankCard").css("color","#333");
				document.getElementById("bankCard").style.background="#fff";
				$(".bankCardSend").css("display","block");
			}
			$("footer").css("display","block");
			setTimeout(function(){
				location.reload();
			},500);
			alert(data.info);
        },
        error:function (e){
            console.log(e);
        }
   		});
		
	}else{
		alert("您的信息填写不完整")
	}
});

/*弹出框的关闭按钮*/
$(".bankCard .close").click(function(){
	$("footer").css("display","block");
	$(".bankCard").css("display","none");
	$(".bottom-list").css("display","none");
	$("#bankCard").css("color","#333");
	document.getElementById("bankCard").style.background="#fff";
});

/*点击 银行卡发放*/
$("#bankCard").click(function(){
	$(".bankCard").css("display","block");
	$("#bankCard").css("color","#fff");
	$(".bottom-list").css("display","none");
	$("footer").css("display","none");
	document.getElementById("bankCard").style.background="#ff3232";
});

/*点击红包发放按钮*/
$("#redSend").click(function(){
	var obj = {form:1};
	obj=JSON.stringify(obj);
	console.log(obj);
		$.ajax({
        type: "POST",
        url: "http://devsite17.v3.ctrl.net.cn/index.php?m=Index&a=apply",
        contentType: "application/json; charset=utf-8",
        data: obj,
        dataType:"json",
        success: function (data) {
        	console.log(data,data.code);
			if(data.code==401){
				$(".bottom-list").css("display","none")
				alert(data.info);
			}
			if(data.code==200){
				$("#redSend").css("color","#fff");
				document.getElementById("redSend").style.background="#ff3232";
				$(".redSend").css("display","block");
				$("redSendOk").click(function(){
					location.reload();
				})
				/*window.setTimeout(function(){
					
				},1000);*/
			}
			
        },
        error: function (e) {
        	$(".bottom-list").css("display","none")
			alert(e.info);
        }
        
	}); 
	
});

$(".redSendOk").click(function(){
	$("footer").css("display","block");
	$(".redSend").css("display","none");
	$("#redSend").css("color","#333");
	document.getElementById("redSend").style.background="#fff";
	$(".bottom-list").css("display","none");
});
