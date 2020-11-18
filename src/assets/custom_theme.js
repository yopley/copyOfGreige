$(window).ready(function(){

    $(window).scroll(function(){
        if ($(window).scrollTop() > 50) {
          $('header').addClass('scroll');
          if ($('header .topbar').length) {
            return $('header .topbar').css('margin-top', -1 * $('header .topbar').outerHeight() + 'px');
          }

        } else {
          $('header').removeClass('scroll');
          if ($('header .topbar').length) {
        //      console.log("nowork");
            return $('header .topbar').css('margin-top', 0);
         }
        }
    })
    //header: function() {

  //}

  $('.home_container').addClass('animated');

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

  $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          fade: true,
          asNavFor: '.slider-nav',
          responsive: [
              {
             breakpoint: 768,
             settings: {
                 speed: 700,
                  dots: true,
                  dotsClass: 'custom_paging',
                  customPaging: function(slick,index) {
                      return  (index + 1) + '/' + slick.slideCount;
                  }
             }
           }
          ]
        });
  $('.slider-nav').slick({
          slidesToShow: 7,
          slidesToScroll: 1,
          arrows: false,
          asNavFor: '.slider-for',
          dots: false,
          infinite: true,
          adaptiveHeight: true,
          vertical: true,
          focusOnSelect: true,
          responsive: [
              {
             breakpoint: 1024,
             settings: {
               vertical: false,
               adaptiveHeight: false,
               slidesToShow: 6
             }
           }
          ]
      });


//CONFIGURE SLIDE  ON LOADING PAGE

    var variant_color_page = $('#variant_color_page').attr('data-variant');
    var img_list_nav = $('.product__image .slider-nav  img');
    var img_list_for = $('.product__image .slider-for  img');


      img_list_nav.each(function(){

      if (this.currentSrc.indexOf(variant_color_page) != -1) {

                  $(this).addClass('targeted');
                  $(this).parents('.slick-track').css({ "height" : "auto !important" });
                  $(this).parents('.slick-list').css({ "height" : "auto !important" });
              //console.log("done");

      }

      })
      setTimeout(function(){

          $('.slider-nav').slick('slickUnfilter');
          $('.slider-nav').slick('slickFilter', 'img.targeted');

      }, 100);

      img_list_for.each(function(){

          if (this.currentSrc.indexOf(variant_color_page) != -1) {

              $(this).addClass('targeted');

                  }

                })
          setTimeout(function(){
            $('.slider-for').slick('slickUnfilter');
            $('.slider-for').slick('slickFilter', 'img.targeted');
        }, 100);
//CLICK ON VARIANT BUTTON

      $('.variant_color').click(function(){
          console.log($(this).parents('ul').find('a.active'));
          $(this).parents('ul').find('a.active').removeClass('active');
          $(this).addClass('active');
          var variant_color = $(this).attr('data-variant-color');
          $('.slider-nav').slick('slickUnfilter');
          $('.slider-for').slick('slickUnfilter');

            img_list_nav.each(function(){
                if ($(this).hasClass('targeted')) {
                    $(this).removeClass('targeted');
                }

                if (this.currentSrc.indexOf(variant_color) != -1) {
                    //if ($(this).parents().hasClass('slick-active')) {
                        $(this).addClass('targeted');
                    //}
                }
            })
            setTimeout(function(){

                $('.slider-nav').slick('slickFilter', 'img.targeted');

            }, 50);

            img_list_for.each(function(){
                if ($(this).hasClass('targeted')) {
                    $(this).removeClass('targeted');
                }
                if (this.currentSrc.indexOf(variant_color) != -1) {
                    $(this).addClass('targeted');
                }

            })
            setTimeout(function(){

                $('.slider-for').slick('slickFilter', 'img.targeted');

            }, 50);
            $('.active_color').text(variant_color);
          });

    //PRODUCT GUIDE ON CLICK

        $('.guide.more').on('click', function() {
            $('body').addClass('overlay');
            $('#sizes').addClass('active');
            return false;
        });
        $('#sizes .close').on('click', function() {
            $('body').removeClass('overlay');
            $('#sizes').removeClass('active');
            return false;
        });
        $('.overlay').on('click', function() {
            $('body').removeClass('overlay');
            return $('#sizes').removeClass('active');
        });

        $('.product_option__size .select').on('click', function() {
          return $(this).parent().toggleClass('open');
        });

        $('.product_option__size .drop li a').on('click', function() {
            var optionVal= $(this).text();
            $(this).parents('.product_option__size').find('.select').text(optionVal).attr('data-value', optionVal);
            $(this).parents('.product_option__size').removeClass('open');
        });

    //PRODUCT TABS ON CLICK
    $(".product-tabs__nav-title").click(function() {
        var rank = $(this).data('rank');
        $(".product-tabs__nav-title").removeClass("selected");
        $(this).addClass("selected");

        $(".product-tabs__block--deployed").removeClass("product-tabs__block--deployed");
        $('.product-tabs__block[data-rank="'+rank+'"]').addClass("product-tabs__block--deployed");
    });

    $(".product-tabs__block-title").click(function() {
        var rank = $(this).data('rank');
        $(".product-tabs__block-title").removeClass("selected");
        $(this).addClass("selected");

        $(".product-tabs__block--deployed").removeClass("product-tabs__block--deployed");
        $('.product-tabs__block[data-rank="'+rank+'"]').addClass("product-tabs__block--deployed");
    });

    // CART

    $.each(CartJS.cart.items, function(i, item){
        //console.log(item.quantity);
        $('.table .items .item').each(function(){
            if ($(this).attr('data-product-id') == item.variant_id ) {
                $(this).find('.cartQuantity').val(item.quantity);
                $(this).find('.cart-item-price').text("€" + (parseInt(item.final_line_price) / 100) + ",00" );
            }
        })
    })

    $(document).on('cart.requestComplete', function(event, cart) {
        $('.cart_drop span[data-count]').attr('data-count', CartJS.cart.item_count);

        $.each($('.pocket_cart .items .item'), function(h, obc){
            if (h === 0) {
                $(obc).clone().prependTo('.pocket_cart .items');
                $(obc).remove();
            }else{
                $(obc).remove();
            }
        });

        $.each($('.basket .table .items .item'), function(k, obt){
            if (k === 0) {
                $(obt).clone().prependTo('.basket .table .items');
                $(obt).remove();
            }else{
                $(obt).remove();
            }
        });

        $.each(CartJS.cart.items, function(i, item){
            //console.log(item.quantity);
            //$('.basket .table .items .item').each(function(){
            //    if ($(this).attr('data-product-id') == item.variant_id ) {
            //        $(this).find('.cartQuantity').val(item.quantity);
            //        $(this).find('.cart-item-price').text("€" + (parseInt(item.final_line_price) / 100) + ",00" );
            //    }
            //});



            $.each($('.pocket_cart .items .item'), function(j, obj){
                if (i === 0) {
                    //console.log(j);
                    $(obj).attr('data-product-id', item.variant_id ).attr('data-product-title', item.title);
                    $(obj).find('.v_image').css("background-image", "url(" + item.image + ")");
                    $(obj).find('.v_details .p_title').text(item.product_title);
                    $(obj).find('.v_details .properties').text('Couleur - ' + item.variant_title);
                    $(obj).find('.v_details .v_title').text(item.title);
                    $(obj).find('.v_details .v_quantity').find('span').text(item.quantity);
                    $(obj).find('.v_details .v_quantity').find('.v_total_price').text("€" + (parseInt(item.final_line_price) / 100) + ",00");
                }else{

                    if (j === 0 ) {


                            $(obj).clone().prependTo('.pocket_cart .items')
                            .attr('data-product-id', item.variant_id ).attr('data-product-title', item.title)
                            .find('.v_image').css("background-image", "url(" + item.image + ")")
                            .next().find('.p_title').text(item.product_title)
                            .next().text('Couleur - ' + item.variant_title)
                            .next().text(item.title)
                            //.closest('.v_details').find('.properties').text('Couleur - ' + item.variant_title)
                            //.closest('.v_details').find('.v_title').text(item.title)
                            .next().find('span').text(item.quantity)
                            .parents('.v_quantity').find('.v_total_price').text("€" + (parseInt(item.final_line_price) / 100) + ",00");
                            //.closest('.v_details').find('.v_quantity').find('span').text(item.quantity)
                            //.closest('.v_quantity').find('.v_total_price').text(item.final_line_price);


                    }

                }
            })

            $.each($('.basket .table .items .item'), function(l, obs){
                if (i === 0) {
                    //console.log(j);
                    $(obs).attr('data-product-id', item.variant_id ).attr('data-product-title', item.title);
                    $(obs).find('.item__prod img').attr('src', item.image).css("background-image", "url(" + item.image + ")");
                    $(obs).find('.item__details .p_title').text(item.product_title);
                    $(obs).find('.item__details .properties').text('Couleur - ' + item.variant_title);
                    $(obs).find('.item__details .variant').text(item.title);
                    $(obs).find('.item__quantity .cartQuantity').val(item.quantity);
                    $(obs).find('.item__total .cart-item-price').attr('data-key', item.key).text("€" + (parseInt(item.final_line_price) / 100) + ",00");
                }else{

                    if (l === 0 ) {


                            $(obs).clone().prependTo('.basket .table .items')
                            .attr('data-product-id', item.variant_id ).attr('data-product-title', item.title)
                            .find('.item__prod img').attr('src', item.image).css("background-image", "url(" + item.image + ")")
                            .parents('.grid_line').find('.item__details .p_title').text(item.product_title)
                            .next().next('.properties').text('Couleur - ' + item.variant_title)
                            .next().text(item.title)
                            //.closest('.v_details').find('.properties').text('Couleur - ' + item.variant_title)
                            //.closest('.v_details').find('.v_title').text(item.title)
                            .parents('.grid_line').find('.item__quantity .cartQuantity').val(item.quantity)
                            .parents('.grid_line').find('.item__total .cart-item-price').attr('data-key', item.key).text("€" + (parseInt(item.final_line_price) / 100) + ",00");
                            //.closest('.v_details').find('.v_quantity').find('span').text(item.quantity)
                            //.closest('.v_quantity').find('.v_total_price').text(item.final_line_price);


                    }

                }
            })

        })

        if (CartJS.cart.item_count > 0) {
            $('.cart_drop span[data-count]').attr('data-count', CartJS.cart.item_count);
            $('.basket').removeClass('hide');
            $('.pocket_cart').removeClass('hide');
            $('.empty_cart_page').addClass('hide');
            $('.empty_cart').addClass('hide');
            $('.basket .cart-original-total').text("€" + (parseInt(CartJS.cart.total_price) / 100) + ",00");
            $('.pocket_cart .price').text("€" + (parseInt(CartJS.cart.total_price) / 100) + ",00");
        } else {
            $(".cart_drop .cart_count").removeClass("fill");
            $('.basket').addClass('hide');
            $('.pocket_cart').addClass('hide');
            $('.empty_cart_page').removeClass('hide');
            $('.empty_cart').removeClass('hide');
        }

    });

    if (CartJS.cart.item_count > 0) {
        $(".cart_drop .cart_count").addClass("fill");
        $('.cart_drop span[data-count]').attr('data-count', CartJS.cart.item_count);
        $('.basket').removeClass('hide');
        $('.pocket_cart').removeClass('hide');
        $('.empty_cart_page').addClass('hide');
        $('.empty_cart').addClass('hide');
        $('.basket .cart-original-total').text("€" + (parseInt(CartJS.cart.total_price) / 100) + ",00");
        $('.pocket_cart .price').text("€" + (parseInt(CartJS.cart.total_price) / 100) + ",00");
    } else {
        $(".cart_drop .cart_count").removeClass("fill");
        $('.basket').addClass('hide');
        $('.pocket_cart').addClass('hide');
        $('.empty_cart_page').removeClass('hide');
        $('.empty_cart').removeClass('hide');
    }

    $.each(CartJS.cart.items, function(i, item){


        $.each($('.pocket_cart .items .item'), function(j, obj){
            if (i === 0) {
                //console.log(j);
                $(obj).attr('data-product-id', item.variant_id ).attr('data-product-title', item.title);
                $(obj).find('.v_image').css("background-image", "url(" + item.image + ")");
                $(obj).find('.v_details .p_title').text(item.product_title);
                $(obj).find('.v_details .properties').text('Couleur - ' + item.variant_title);
                $(obj).find('.v_details .v_title').text(item.title);
                $(obj).find('.v_details .v_quantity').find('span').text(item.quantity);
                $(obj).find('.v_details .v_quantity').find('.v_total_price').text("€" + (parseInt(item.final_line_price) / 100) + ",00");
            }else{

                if (j === 0 ) {
                    $(obj).clone().prependTo('.pocket_cart .items')
                    .attr('data-product-id', item.variant_id ).attr('data-product-title', item.title)
                    .find('.v_image').css("background-image", "url(" + item.image + ")")
                    .closest('.item').find('.v_details').find('.p_title').text(item.product_title)
                    .closest('.v_details').find('.properties').text('Couleur - ' + item.variant_title)
                    .closest('.v_details').find('.v_title').text(item.title)
                    .closest('.v_details').find('.v_quantity').find('span').text(item.quantity)
                    .closest('.v_quantity').find('.v_total_price').text("€" + (parseInt(item.final_line_price) / 100) + ",00");

                }

            }
        })
    })

    $('.add_area .quantity a').on('click', function() {
      if ($(this).is('.plus')) {
        $(this).prev().val(parseInt($(this).prev().val()) + 1);

      } else {
        if (parseInt($(this).next().val()) > 1) {
          $(this).next().val(parseInt($(this).next().val()) - 1);
        }
      }
      return false;
    });



    $('.basket .quantity a').on('click', function(e) {
      e.preventDefault();
      if ($(this).is('.plus')) {
        $(this).prev().val(parseInt($(this).prev().val()) + 1);
        var variant_quantity = $(this).prev().val();
        var variant_id = parseInt($(this).parents('.item').attr('data-product-id'));
        CartJS.updateItemById(variant_id, variant_quantity);
      } else {
        var variant_id = parseInt($(this).parents('.item').attr('data-product-id'));
        if (parseInt($(this).next().val()) > 1) {
            $(this).next().val(parseInt($(this).next().val()) - 1);
            var variant_quantity = $(this).next().val();
          CartJS.updateItemById(variant_id, variant_quantity);
        }else {
          CartJS.removeItemById(variant_id);
        }
      }
      return false;
    });

    $(".buttons .add-to-cart").click(function(e) {
        var p_type = $(".product__info h1").attr("data-type");
        var select = $(".product_option__size .select").attr("data-value");
        var activeColor = $('.active_color').text();
        var prodQuantity = $(".quantity input").val();
        e.preventDefault();
        //console.log(p_type);
        //console.log(select);
        if (select == '') {
            $(".product_option .error").text($(".product_option .error").attr('data-empty'));
            $(".product_option .error").show();
        }else {
            $(".product_option .error").hide();
            $(".variant_product_id span").each(function(){
                if ($(this).attr('data-type') === "housse de couette") {
                    if ($(this).attr('data-title').indexOf(activeColor) != -1  && $(this).attr('data-title').indexOf(select) != -1 ) {
                        var prodId = $(this).attr('data-id');
                        var iProdQuantity = parseInt(prodQuantity);
                        var iProdId = parseInt(prodId);
                        console.log($(this));
                        console.log(typeof iProdId);
                        console.log(typeof iProdQuantity);
                        CartJS.addItem(iProdId, iProdQuantity);
                        $(".cart_drop .cart_count").addClass("fill");
                    }
                }else {
                    if ($(this).attr('data-title').indexOf(activeColor) != -1 ) {
                        var prodId = $(this).attr('data-id');
                        var iProdQuantity = parseInt(prodQuantity);
                        var iProdId = parseInt(prodId);
                        console.log($(this));
                        console.log(typeof iProdId);
                        console.log(typeof iProdQuantity);
                        CartJS.addItem(iProdId, iProdQuantity);
                        $(".cart_drop .cart_count").addClass("fill");
                    }
                }

            });

        }

    });

    $(document).on('click', '.item a.remove', function(){
        var removeId = $(this).parents('.item').attr('data-product-id');
        CartJS.removeItemById(removeId);
        console.log("removed");
    })

    //////FAQ

    $('.block').each(function(){
        var i = 0;
        var idEl = $(this).attr('id');
        var childEl = $(this).find('.position');
        childEl.each(function(){
            i = i + 1;
        })
        $('ul.scrolling-nav a').each(function(){
            if ($(this).attr('href').indexOf(idEl) != -1){
                $(this).find('span').text('(' + i + ')');
            }
        })

    })

    $(window).scroll(function(){
        if ($(window).scrollTop() >= 100 && $(window).scrollTop() <= 1744 ) {
        $('.contact-bar').removeClass('isStuckedBot');
          $('.contact-bar').addClass('isStuckedTop');
      }else if($(window).scrollTop() >= 1744){
          $('.contact-bar').removeClass('isStuckedTop');
          $('.contact-bar').addClass('isStuckedBot');
      }else {
          $('.contact-bar').removeClass('isStuckedTop');
          $('.contact-bar').removeClass('isStuckedBot');
      }
    })

    $('.position .head').click(function(){
        $(this).parents('.position').toggleClass('open');
    })
});
