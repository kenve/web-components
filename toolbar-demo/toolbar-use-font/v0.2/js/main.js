requirejs.config({
	paths:{
		jquery:'jquery-1.11.3.min'
	}
});
//$表示之前引入的模块 jquery
requirejs(['jquery','scrollto'],function($,scrollto){
	// $('body').css('background-color','red');
	//实例化scrollto
	var scroll=new  scrollto.ScrollTo({
		
	});

	$('#backTop').on('click',move);
	$(window).on('scroll',function(){

		checkPosition($(window).height());
	});

	checkPosition($(window).height());

	//实现返回顶部
	function move(){
		$('html, body').animate({
			scrollTop:0
		},800);
	}
	//直接到顶部
	function go () {
		//
		$('html,body').scrollTop(0);
	}
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