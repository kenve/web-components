requirejs.config({
	paths:{
		jquery:'jquery-1.11.3.min'
	}
});
//$表示之前引入的模块 jquery
requirejs(['jquery','scrollto'],function($,scrollto){
	// $('body').css('background-color','red');
	//实例化scrollto
	var scroll=new scrollto.ScrollTo({
		//传递参数
		dest:0,
		speed:2000
	});

	$('#backTop').on('click',$.proxy(scroll.move,scroll));   //指向a ，返回顶部的按钮，yongproxy指定this
	$(window).on('scroll',function(){

		checkPosition($(window).height());
	});

	checkPosition($(window).height());

	//实现返回顶部
	// function move(){
	// 	$('html, body').animate({
	// 		scrollTop:0
	// 	},800);
	// }
	// //直接到顶部
	// function go () {
	// 	//
	// 	$('html,body').scrollTop(0);
	// }
	//显示和隐藏返回顶部按钮
	function checkPosition(pos){

		if ($(window).scrollTop() > pos) {
			$('#backTop').fadeIn();
			console.log('fadeIn');
		}else{
			$('#backTop').fadeOut();
		    console.log('fadeOut');
		}
	}
}); 