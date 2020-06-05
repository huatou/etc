
/*  展开隐藏  */
(function($){
   $.fn.show_form = function() {
    var show_btn=$('.show_btn');
    var show_list=$('.show_box');
        show_btn.each(function(b){
            var show_box=show_list.eq(b);
            var _item=show_btn.eq(b);
                _item.click(function(event) {
                    if ($(this).hasClass("show_btn")) {
                        $(this).removeClass("show_btn").children('span').removeClass('down_icon').addClass('up_icon');
                        $(this).children('.show_title').show(); //基本信息
                        $(this).children('.title').hide(); //表单
                        $(this).addClass('expand').children('.expand_icon').hide(); //展开收起
                        show_box.slideDown();
                    }
                    else{
                        $(this).addClass("show_btn").children('span').addClass('down_icon').removeClass('up_icon');;
                        $(this).children('.show_title').hide(); //基本信息
                        $(this).children('.title').show(); //表单
                        $(this).removeClass('expand').children('.expand_icon').show();//展开收起
                        show_box.slideUp();
                    }
                });
                //确认取消 按钮点击
                $('.sure_btn ,.cancel_btn').click(function() {
                  show_box.hide();
                });
                //添加主办方、编辑按钮点击
                $('.add_orgnizers , .edit_btn').click(function() {
                  show_box.slideDown();
                  $('.part').hide();
                });
               
        })
    
 };   
})(jQuery);



