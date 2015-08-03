//面向对象的方式来实现
define(['jquery'],function  () {
	//定义构造函数
	function ScrollTo({opts}){
		this.opts=$.extend({},ScrollTo.DEFAULTS,opts);
		//缓存html 和body
		this.$el=$('html,body');
	}
	//构造函数的原型
	ScrollTo.prototype.move = function() {
		var opts=this.opts;
		this.$el.animate({
			scrollTop:opts.dest
		},opts.speed);
	};
		ScrollTo.prototype.go = function() {
		this.$el.scrollTop(this.opts.dest);
	};
	ScrollTo.DEFAULTS={
		dest:0,
		speed:800
	}
//将模块返回
	return {
		ScrollTo:ScrollTo
	};
});