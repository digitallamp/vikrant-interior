(function($){
    "use strict"; // Start of use strict  

    /************** FUNCTION ****************/ 

    // Menu fixed
    function fixed_header(){
        var menu_element;
        menu_element = $('.main-nav:not(.menu-fixed-content)').closest('.vc_row');
        if($('.menu-fixed-enable').length > 0 && $(window).width()>1024){           
            var menu_class = $('.main-nav').attr('class');
            var header_height = $("#header").height()+100;
            var ht = header_height + 150;
            var st = $(window).scrollTop();

            if(!menu_element.hasClass('header-fixed') && menu_element.attr('data-vc-full-width') == 'true') menu_element.addClass('header-fixed');
            if(st>header_height){               
                if(menu_element.attr('data-vc-full-width') == 'true'){
                    if(st > ht) menu_element.addClass('active');
                    else menu_element.removeClass('active');
                    menu_element.addClass('fixed-header');
                }
                else{
                    if(st > ht) menu_element.parent().parent().addClass('active');
                    else menu_element.parent().parent().removeClass('active');
                    if(!menu_element.parent().parent().hasClass('fixed-header')){
                        menu_element.wrap( "<div class='menu-fixed-content fixed-header "+menu_class+"'><div class='container'></div></div>" );
                    }
                }
            }else{
                menu_element.removeClass('active');
                if(menu_element.attr('data-vc-full-width') == 'true') menu_element.removeClass('fixed-header');
                else{
                    if(menu_element.parent().parent().hasClass('fixed-header')){
                        menu_element.unwrap();
                        menu_element.unwrap();
                    }
                }
            }
        }
        else{
            menu_element.removeClass('active');
            if(menu_element.attr('data-vc-full-width') == 'true') menu_element.removeClass('fixed-header');
            else{
                if(menu_element.parent().parent().hasClass('fixed-header')){
                    menu_element.unwrap();
                    menu_element.unwrap();
                }
            }
        }
    }
    //Menu Responsive
	/*function rep_menu(){
		$('.toggle-mobile-menu').on('click',function(event){
			event.preventDefault();
			$(this).parents('.main-nav').toggleClass('active');
		});
		$('.main-nav li.menu-item-has-children>a').on('click',function(event){
			if($(window).width()<768){
				event.preventDefault();
				$(this).next().stop(true,false).slideToggle();
			}else{
				// return false;
			}
		});
	}*/

    function background(){
		$('.bg-slider .item-slider').each(function(){
			var src=$(this).find('.banner-thumb a img').attr('src');
			$(this).css('background-image','url("'+src+'")');
		});	
	}
    
    function fix_variable_product(){
    	//Fix product variable thumb    	
        $('body input[name="variation_id"]').on('change',function(){
            var id = $(this).val();
            var data = $('.variations_form').attr('data-product_variations');
            var curent_data = {};
            data = $.parseJSON(data);
            if(id){
                for (var i = data.length - 1; i >= 0; i--) {
                    if(data[i].variation_id == id) curent_data = data[i];
                };
                if('image_id' in curent_data){
                    $('.detail-gallery .list-none').find('a[data-variation_id="'+curent_data.image_id+'"]').trigger( 'click' );
                }
            }
           /* var id = $('input[name="variation_id"]').val();
            console.log(id);
            if(id){
                $('.gallery-control .list-none').find('a[data-variation_id="'+id+'"]').trigger( 'click' );
            }*/
        })
        // variable product
        if($('.wrap-attr-product1.special').length > 0){
            $('.attr-filter ul li a').live('click',function(){
                event.preventDefault();
                $(this).parents('ul').find('li').removeClass('active');
                $(this).parent().addClass('active');
                var attribute = $(this).parent().attr('data-attribute');
                var id = $(this).parents('ul').attr('data-attribute-id');
                $('#'+id).val(attribute);
                $('#'+id).trigger( 'change' );
                $('#'+id).trigger( 'focusin' );
                return false;
            })
            $('.attr-hover-box').hover(function(){
                var seff = $(this);
                var old_html = $(this).find('ul').html();
                var current_val = $(this).find('ul li.active').attr('data-attribute');
                $(this).next().find('select').trigger( 'focusin' );
                var content = '';
                $(this).next().find('select').find('option').each(function(){
                    var val = $(this).attr('value');
                    var title = $(this).html();
                    var el_class = '';
                    if(current_val == val) el_class = ' class="active"';
                    if(val != ''){
                        content += '<li'+el_class+' data-attribute="'+val+'"><a href="#" class="bgcolor-'+val+'"><span></span>'+title+'</a></li>';
                    }
                })
                // console.log(content);
                if(old_html != content) $(this).find('ul').html(content);
            })
            $('body .reset_variations').live('click',function(){
                $('.attr-hover-box').each(function(){
                    var seff = $(this);
                    var old_html = $(this).find('ul').html();
                    var current_val = $(this).find('ul li.active').attr('data-attribute');
                    $(this).next().find('select').trigger( 'focusin' );
                    var content = '';
                    $(this).next().find('select').find('option').each(function(){
                        var val = $(this).attr('value');
                        var title = $(this).html();
                        var el_class = '';
                        if(current_val == val) el_class = ' class="active"';
                        if(val != ''){
	                        content += '<li'+el_class+' data-attribute="'+val+'"><a href="#" class="bgcolor-'+val+'"><span></span>'+title+'</a></li>';
	                    }
                    })
                    if(old_html != content) $(this).find('ul').html(content);
                    $(this).find('ul li').removeClass('active');
                })
            })
        }
        //end
    }
    
    function afterAction(){
		this.$elem.find('.owl-item').removeClass('active');
		this.$elem.find('.owl-item').eq(this.owl.currentItem).addClass('active');
		this.$elem.find('.owl-item').each(function(){
			// $(this).find('.wow').removeClass('animated');
			var check = $(this).hasClass('active');
			if(check==true){
				$(this).find('.animated').each(function(){
					var anime = $(this).attr('data-anim-type');
					$(this).addClass(anime);
				});
			}else{
				$(this).find('.animated').each(function(){
					var anime = $(this).attr('data-anim-type');
					$(this).removeClass(anime);
				});
			}
		})
	}

    
    function s7upf_owl_slider(){
    	//Carousel Slider
		if($('.sv-slider').length>0){
			$('.sv-slider').each(function(){
				var seff = $(this);
				var item = seff.attr('data-item');
				var speed = seff.attr('data-speed');
				var itemres = seff.attr('data-itemres');
				var animation = seff.attr('data-animation');
				var nav = seff.attr('data-nav');
				var text_prev = seff.attr('data-prev');
				var text_next = seff.attr('data-next');
				var pagination = false, navigation= true, singleItem = false;
				var autoplay;
				if(speed != '') autoplay = speed;
				else autoplay = false;
				// Navigation
				if(nav == 'nav-hidden'){
					pagination = false;
					navigation= false;
				}
				if(nav == 'banner-slider3' || nav == 'about-testimo-slider'){
					pagination = true;
					navigation= false;
				}
				if(nav == 'banner-slider2 banner-slider11'){
					pagination = true;
					navigation= true;
				}
				if(animation != ''){
					singleItem = true;
					item = '1';
				}
				var prev_text = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
				var next_text = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
				if(nav == 'nav-text-data'){
					var prev_text = text_prev;
					var next_text = text_next;
				}
				if(nav == 'banner-slider2' || nav == 'banner-slider13' || nav == 'about-service-slider' || nav == 'banner-slider9 long-arrow' || nav == 'banner-slider10' || nav == 'hotcat-slider14 arrow-style14' || nav == 'banner-slider2 banner-slider11'){
					prev_text = '<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>';
					next_text = '<i class="fa fa-arrow-circle-right" aria-hidden="true"></i>';
				}
				if(itemres == '' || itemres === undefined){
					if(item == '1') itemres = '0:1,480:1,768:1,1200:1';
					if(item == '2') itemres = '0:1,480:1,768:2,1200:2';
					if(item == '3') itemres = '0:1,480:2,768:2,1200:3';
					if(item == '4') itemres = '0:1,480:2,768:2,1200:4';
					if(item >= '5') itemres = '0:1,480:2,568:3,1024:5,1200:'+item;
				}				
				itemres = itemres.split(',');
				var i;
				for (i = 0; i < itemres.length; i++) { 
				    itemres[i] = itemres[i].split(':');
				}
				seff.owlCarousel({
					items: item,
					itemsCustom: itemres,
					autoPlay:autoplay,
					pagination: pagination,
					navigation: navigation,
					navigationText:[prev_text,next_text],
					singleItem : singleItem,
					beforeInit:background,
					// addClassActive : true,
					afterAction: afterAction,
					transitionStyle : animation
				});
			});			
		}
    }

    function s7upf_all_slider(){
    	//Carousel Slider
		if($('.smart-slider').length>0){
			$('.smart-slider').each(function(){
				var seff = $(this);
				var item = seff.attr('data-item');
				var speed = seff.attr('data-speed');
				var itemres = seff.attr('data-itemres');
				var text_prev = seff.attr('data-prev');
				var text_next = seff.attr('data-next');
				var pagination = seff.attr('data-pagination');
				var navigation = seff.attr('data-navigation');
				var paginumber = seff.attr('data-paginumber');
				var autoplay;
				if(speed === undefined) speed = '';
				if(speed != '') autoplay = speed;
				else autoplay = false;
				if(item == '' || item === undefined) item = 1;
				if(itemres === undefined) itemres = '';
				if(text_prev == 'false') text_prev = '';
				else{
					if(text_prev == '' || text_prev === undefined) text_prev = '<i class="fa fa-angle-left" aria-hidden="true"></i>';
					else text_prev = '<i class="fa '+text_prev+'" aria-hidden="true"></i>';
				}
				if(text_next == 'false') text_next = '';
				else{
					if(text_next == '' || text_next === undefined) text_next = '<i class="fa fa-angle-right" aria-hidden="true"></i>';
					else text_next = '<i class="fa '+text_next+' aria-hidden="true"></i>';
				}
				if(pagination == 'true') pagination = true;
				else pagination = false;
				if(navigation == 'true') navigation = true;
				else navigation = false;
				if(paginumber == 'true') paginumber = true;
				else paginumber = false;
				// Item responsive
				if(itemres == '' || itemres === undefined){
					if(item == '1') itemres = '0:1,480:1,768:1,1024:1';
					if(item == '2') itemres = '0:1,480:1,768:2,1024:2';
					if(item == '3') itemres = '0:1,480:2,768:2,1024:3';
					if(item == '4') itemres = '0:1,480:2,768:2,1024:4';
					if(item >= '5') itemres = '0:1,480:2,568:3,1024:'+item;
				}				
				itemres = itemres.split(',');
				var i;
				for (i = 0; i < itemres.length; i++) { 
				    itemres[i] = itemres[i].split(':');
				}
				seff.owlCarousel({
					items: item,
					itemsCustom: itemres,
					autoPlay:autoplay,
					pagination: pagination,
					navigation: navigation,
					navigationText:[text_prev,text_next],
					paginationNumbers:paginumber,
					// addClassActive : true,
					// afterAction: afterAction,
				});
			});			
		}
    }
    function openInNewTab(url) {
        window.open(url, '_blank');
    }



    //Begin Tool_panel_color
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function switchStylestyle(styleName,color_rgb_new) {
        var color_old = $('.list-main-color li:first-child .styleswitch').attr("data-color");
        var color_rgb = $('.list-main-color li:first-child .styleswitch').css("background-color");
        var color=styleName;
        var new_css=st_demo_css.color;
        var re = new RegExp(color_old, 'g');
        new_css = new_css.replace(re, color);
        color_rgb = color_rgb.replace(')', '');
        color_rgb = color_rgb.replace('rgb(', '');
        console.log(color_rgb);
        var re2 = new RegExp(color_rgb, 'g');
        new_css = new_css.replace(re2, color_rgb_new);
        $('#s7upf-theme-style-inline-css').html(new_css);

        //createCookie('style', styleName, 365);
    }
    function tool_panel_color(){
        $('.dm-open-color').on('click',function(){
            $('#widget_indexdm_color').toggleClass('active');
            return false;
        })
        $('.styleswitch').on('click',function () {
            var color = $(this).attr("data-color");
            var color_rgb_new = $(this).css("background-color");
            switchStylestyle(color,color_rgb_new);
            $(this).parents('.list-main-color').find('li').removeClass('active');
            $(this).parent().toggleClass('active');
            return false;
        })
    }
    function tool_panel(){
        $('.dm-open').on('click',function(){
            $('#widget_indexdm').toggleClass('active');
            $('#indexdm_img').toggleClass('background');

            $('.dm-content .item-content').hover(
                function(){
                    $('#indexdm_img').addClass('active');
                    var img_src = $(this).find('img').attr('data-src');
                    $('.img-demo').css('display','block');
                    $('.img-demo').css('background-image','url('+img_src+')');
                },
                function(){
                    $('#indexdm_img').removeClass('active');
                    $('.img-demo').attr('style','');
                }
            );
            return false;
        })
    }
    // End Tool_panel_color
    function detail_fixed(){
        if($(window).width()>767){
            if($('.info-fixed').length>0){
                var seff = $('.info-fixed').parents('.product-detail > .row');
                var ot = seff.offset().top;
                var sh = seff.height();
                var height = $('.summary').map(function (){
                    return $(this).height();
                }).get();
                var dh = Math.max.apply(null, height);
                var st = $(window).scrollTop();
                var wc_tabs = $('.wc-tabs-wrapper').offset().top;
                var height_summary  = $('.summary').outerHeight();
                if($('.s7up-product-detail-style3').length>0){
                    var height_summary_left  = $('.summary-left').outerHeight();
                    var height_summary_right  = $('.summary-right').outerHeight();
                    if(height_summary_left>height_summary_right){
                        height_summary = height_summary_left
                    }else height_summary = height_summary_right
                }
                var max_top =wc_tabs-height_summary-230;
                var top = $(window).scrollTop() - ot + $('#wpadminbar').height()+$('.fixed-ontop').height();
                if(top > max_top) top = max_top;
                var height_menu = $('.fixed-ontop').height();
                if(st>ot&&st<ot+sh-dh){
                    seff.addClass('onscroll');
                    $('.onscroll .summary').css('top',top+'px');
                }
                else if(st<ot) $('.summary').css('top',0);
                else seff.removeClass('onscroll');
            }
        }else{
            if($('.info-fixed').length>0) $('.summary').css('top',0);
        }
    }
    /************ END FUNCTION **************/  
	$(document).ready(function(){
		//Menu Responsive 
		//rep_menu();
        //s7upf_qty_click();
        // rtl-enable


        tool_panel_color();
        tool_panel();
        if($('.fancybox-buttons').length>0){
            $('.fancybox-buttons').fancybox({
                openEffect  : 'none',
                closeEffect : 'none',

                prevEffect : 'none',
                nextEffect : 'none',

                closeBtn  : false,

                helpers : {
                    title : {
                        type : 'inside'
                    },
                    buttons	: {}
                },

                afterLoad : function() {
                    this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
                }
            });
        }

        $(".s7up_mega_menu").parent().parent('.menu-item').addClass("has-mega-menu");
        $('.mb-map-find .email-form').submit(false);
        $('.mb-map-find  input[type="submit"]').click(function () {
            var url = $(this).parent().find('.controls').val();
            console.log(url);
            openInNewTab("https://www.google.co.in/maps/?q="+url);
        })
        fix_variable_product();
        //Cat search
        if($('.mb-mailchimp').length>0){
            $('.mb-mailchimp').each(function () {
                var namesubmit = $(this).data('namesubmit');
                var placeholder = $(this).data('placeholder');
                if(placeholder) $(this).find('input[name="EMAIL"]').attr('placeholder',placeholder);
                if(namesubmit){ $(this).find('input[type="submit"]').val(namesubmit);  } else{ $(this).find('input[type="submit"]').val(''); }
            })
        }

        if($('.video-popup-fancybox').length>0) {
            $(".video-popup-fancybox").click(function () {
                $.fancybox({
                    'padding': 0,
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'title': this.title,
                    'width': 680,
                    'height': 495,
                    'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                    'type': 'swf',
                    'swf': {
                        'wmode': 'transparent',
                        'allowfullscreen': 'true'
                    }
                });
                $('.fancybox-overlay').addClass('video-product-single');
                return false;
            });

        }
        $('.select-search-category ul li a').click(function(event){
            event.preventDefault();
            $(this).parents('.list-cat-search').find('li').removeClass('active');
            $(this).parent().addClass('active');
            var x = $(this).attr('data-filter');
            if(x){
                x = x.replace('.','');
                $('.cat-value').val(x);
            }
            else $('.cat-value').val('');
            $('.btn-search-cat span').text($(this).text());
        });

		//Fix mailchimp
        $('.sv-mailchimp-form').each(function(){
            var placeholder = $(this).attr('data-placeholder');
            var submit = $(this).attr('data-submit');
            if(placeholder) $(this).find('input[name="EMAIL"]').attr('placeholder',placeholder);
            if(submit) $(this).find('input[type="submit"]').val(submit);
        })
		//Count item cart
        if($("#count-cart-item").length){
            var count_cart_item = $("#count-cart-item").val();
            $(".cart-item-count").html(count_cart_item);
        }        
        //Back To Top
		$('.scroll-top').on('click',function(event){
			event.preventDefault();
			$('html, body').animate({scrollTop:0}, 'slow');
		});		
	});

	$(window).load(function(){
		s7upf_owl_slider();
		s7upf_all_slider();
		// menu fixed onload
		/*$("#header").css('min-height','');
        if($(window).width()>1024){
            $("#header").css('min-height',$("#header").height());
            fixed_header();
        }
        else{
            $("#header").css('min-height','');
        }*/
        // rtl-enable
        if($('.rtl-enable').length > 0){
            $('*[data-vc-full-width="true"]').each(function(){
                var style = $(this).attr('style');
                style = style.replace("left","right");
                $(this).attr('style',style);
            })
        }
		//menu fix
		if($(window).width() >= 768){
			var c_width = $(window).width();
			$('.main-nav ul ul ul.sub-menu').each(function(){
				var left = $(this).offset().left;
				if(c_width - left < 180){
					$(this).css({"left": "-100%"})
				}
				if(left < 180){
					$(this).css({"left": "100%"})
				}
			})
		}
	});// End load

	/* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
    var w_width = $(window).width();
    $(window).resize(function(){
  //       $('.main-nav>ul').attr('style','');
  //       if($(window).width() < 768){
		// 	if($('.main-nav').offset().left < $(window).width()/2) $('.main-nav>ul').css({'right':'auto','left':'0'});
		// 	else $('.main-nav>ul').css({'right':'0','left':'auto'});
		// }
        $("#header").css('min-height','');
        var c_width = $(window).width();
        setTimeout(function() {
            if($('.rtl-enable').length > 0 && c_width != w_width){
                $('*[data-vc-full-width="true"]').each(function(){
                    var style = $(this).attr('style');
                    style = style.replace(" left:"," right:");
                    $(this).attr('style',style);
                })
                w_width = c_width;
            }
        }, 3000);
    });

	jQuery(window).scroll(function(){
        detail_fixed();
		fixed_header();
		if($(window).width()>1024){
            //$("#header").css('min-height',$("#header").height());
            fixed_header();
        }
        else{
            $("#header").css('min-height','');
        }
		//Scroll Top
		if($(this).scrollTop()>$(this).height()){
			$('.scroll-top').addClass('active');
		}else{
			$('.scroll-top').removeClass('active');
		}
	});// End Scroll
    /**
     * @TODO Code a function the calculate available combination instead of use WC hooks
     */
    $.fn.tawcvs_variation_swatches_form = function () {
        return this.each( function() {
            var $form = $( this ),
                clicked = null,
                selected = [];

            $form
                .addClass( 'swatches-support' )
                .on( 'click', '.swatch', function ( e ) {
                    e.preventDefault();
                    var $el = $( this ),
                        $select = $el.closest( '.value' ).find( 'select' ),
                        attribute_name = $select.data( 'attribute_name' ) || $select.attr( 'name' ),
                        value = $el.data( 'value' );

                    $select.trigger( 'focusin' );

                    // Check if this combination is available
                    if ( ! $select.find( 'option[value="' + value + '"]' ).length ) {
                        $el.siblings( '.swatch' ).removeClass( 'selected' );
                        $select.val( '' ).change();
                        $form.trigger( 'tawcvs_no_matching_variations', [$el] );
                        return;
                    }

                    clicked = attribute_name;

                    if ( selected.indexOf( attribute_name ) === -1 ) {
                        selected.push(attribute_name);
                    }

                    if ( $el.hasClass( 'selected' ) ) {
                        $select.val( '' );
                        $el.removeClass( 'selected' );

                        delete selected[selected.indexOf(attribute_name)];
                    } else {
                        $el.addClass( 'selected' ).siblings( '.selected' ).removeClass( 'selected' );
                        $select.val( value );
                    }

                    $select.change();
                } )
                .on( 'click', '.reset_variations', function () {
                    $( this ).closest( '.variations_form' ).find( '.swatch.selected' ).removeClass( 'selected' );
                    selected = [];
                } )
                .on( 'tawcvs_no_matching_variations', function() {
                    window.alert( wc_add_to_cart_variation_params.i18n_no_matching_variations_text );
                } );
        } );
    };

    $( function () {
        $( '.variations_form' ).tawcvs_variation_swatches_form();
        $( document.body ).trigger( 'tawcvs_initialized' );
    } );
})(jQuery);