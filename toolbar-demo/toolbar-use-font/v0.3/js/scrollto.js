//面向对象的方式来实现
define(['jquery'],function ($) {
	//定义构造函数
	function ScrollTo(opts){
		this.opts=$.extend({},ScrollTo.DEFAULTS,opts);
		//缓存html 和body
		this.$el=$('html,body');
		
	}
	//构造函数的原型
	ScrollTo.prototype.move = function() {
		var opts=this.opts,
			dest=opts.dest;
		//当没有运动的时候
		if ($(window).scrollTop() != dest) {
			if (! this.$el.is(':animated')) {
				console.log(1);
				this.$el.animate({
				scrollTop:dest
				},opts.speed);
			};
		};
	};
	ScrollTo.prototype.go = function() {
		var dest=this.opts.dest;
		if ($(window).scrollTop() != dest) {
			this.$el.scrollTop(dest);
		}
	};
	ScrollTo.DEFAULTS={
		dest:0,
		speed:800
	};
//将模块返回
	return {

		ScrollTo:ScrollTo
	};
});