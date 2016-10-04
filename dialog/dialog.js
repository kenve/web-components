// 传递Zepto 用$ 接收
;
(function($) {

    var Dialog = function(config) {
        var _this_ = this; //接收保存外部this
        //默认参数配置
        this.config = {
            //对话框的宽 高
            width: 'auto',
            height: 'auto',
            //对话框的透明度
            maskOpacity: null,
            //对话框提示信息
            message: null,
            //对话框类型
            type: 'waiting',
            //按钮配置，
            buttons: null,
            //弹出框延迟多久关闭
            delay: null,
            //是否启用动画
            effect: null,
            //延时关闭的回调函数
            delayCallback: null,
            //点击遮罩层是否可以关闭
            maskClose: null

        }

        //默认参数扩展
        //是否传递 ，
        if (config && $.isPlainObject(config)) {
            $.extend(this.config, config)

        } else {
            //未传
            this.isConfig = true;
        }
        //创建基本的DOM
        this.body = $('body');
        //创建遮罩层
        this.mask = $('<div class="g-dialog-container">');
        //创建弹出框
        this.win = $('<div class="dialog-window">');
        //创建弹出框头部
        this.winHeader = $('<div class="dialog-header"></div>');
        this.winContent = $('<div class="dialog-content"></div>');
        this.winFooter = $('<div class="dialog-footer"></div>');
        //渲染DOM
        this.create();



        console.log(this.config);
    };


    Dialog.zIndex = 9999;
    //构造函数
    Dialog.prototype = {

        //创建弹出框
        create: function() {
            var _this_ = this,
                config = this.config,
                mask = this.mask,
                win = this.win,
                header = this.winHeader,
                content = this.winContent,
                footer = this.winFooter,
                body = this.body;

            //加弹窗的层级
            Dialog.zIndex++;
            this.mask.css('zIndex', Dialog.zIndex);

            //如果没有传递任何配置参数
            //就弹出一个等待的图标样式的弹框
            if (this.isConfig) {
                win.append(header.addClass('waiting'));
                mask.append(win);
                body.append(mask);
            } else {
                //根据配置参数创建相应的弹框
                header.addClass(config.type);
                //添加到弹框区域中
                win.append(header);
                //如果传递了信息文本
                if (config.message) {
                    win.append(content.html(config.message));

                }
                //按钮组
                if (config.buttons) {
                    //
                    this.createButtons(footer, config.buttons);
                    win.append(footer)
                }
                //动画
                if (config.effect) {
                    this.animate();
                }
                //插入到页面
                mask.append(win);
                body.append(mask);

                // 设置对话框的宽高
                if (config.width != 'auto') {
                    win.width(config.width);
                }
                if (config.height != 'auto') {
                    win.height(config.height);
                }
                //透明度
                if (config.maskOpacity) {
                    mask.css('backgroundColor', 'rgba(0,0,0,' + config.maskOpacity + ')');
                }
                //定时关闭
                if (config.delay && config.delay != 0) {
                    window.setTimeout(function() {
                        _this_.close();
                        //执行延时的回调函数
                        config.delayCallback && config.delayCallback();

                    }, config.delay);
                }
                //指定遮罩层点击是否关闭
                if (config.maskClose) {
                    mask.click(function(e) {
                        _this_.close();
                    });

                }

            }
        },
        animate: function() {
            var _this_ = this;
            this.win.css('-webkit-transform', 'scale(0,0)');
            window.setTimeout(function() {
                _this_.win.css('-webkit-transform', 'scale(1,1)');
            }, 100)

        },
        createButtons: function(footer, buttons) {
            console.log(buttons);
            var _this_ = this;
            $(buttons).each(function(index, item) {

                //获取按钮的样式以及文本信息
                var type = this.type ? 'class="' + this.type + '"' : '';
                var btnText = this.text ? this.text : 'button' + (++index);

                var callback = this.callback ? this.callback : null;
                var button = $('<button ' + type + '>' + btnText + '</button>');
                //绑定callback

                if (callback) {
                    button.on('click', function(e) {
                        var isClose = callback();

                        //阻止事件冒泡
                        e.stopPropagation();
                        if (isClose != false) {
                            _this_.close();
                        }

                    });

                } else {
                    button.on('click', function(e) {
                        //阻止事件冒泡
                        e.stopPropagation();
                        _this_.close();
                    });
                }


                footer.append(button);

            });
            footer.append();
        },
        close: function() {
            this.mask.remove();
        }

    };
    window.Dialog = Dialog;

    $.dialog = function(config) {
        return new Dialog(config);
    }

})(Zepto);
