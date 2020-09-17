$(window).ready(function(){
    $('.mobile_button').click(function(){
        if (!$('body').hasClass('mobile_body')) {
            $('body').addClass('mobile_body');
        }else {
            $('body').removeClass('mobile_body');
        }

    });

    $('.mobile_list_lv1').click(function(){
        $(this).find(".mobile_subdropdown").slideToggle();
        var finfDrop = $(this).find('.drop_icon');
        if (finfDrop.hasClass('add')) {
            finfDrop.removeClass('add');
            finfDrop.html('remove');
        }else{
            finfDrop.addClass('add');
            finfDrop.html('add');
        }
    });
});
