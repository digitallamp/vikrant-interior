(function($){
"use strict"; // Start of use strict
//Tag Toggle
function toggle_tab(){
	if($('.toggle-tab').length>0){
		$('.toggle-tab').each(function(){
			/* $(this).find('.item-toggle-tab').first().find('.toggle-tab-content').show(); */
			$('.toggle-tab-title').on('click',function(){
				$(this).parent().siblings().removeClass('active');
				$(this).parent().toggleClass('active');
				$(this).parents('.toggle-tab').find('.toggle-tab-content').slideUp();
				$(this).next().stop(true,false).slideToggle();
			});
		});
	}
}	
//Popup Wishlist
function popup_wishlist(){
	$('.wishlist-link').on('click',function(event){
		event.preventDefault();
		$('.wishlist-mask').fadeIn();
		var counter = 10;
		var popup;
		popup = setInterval(function() {
			counter--;
			if(counter < 0) {
				clearInterval(popup);
				$('.wishlist-mask').hide();
			} else {
				$(".wishlist-countdown").text(counter.toString());
			}
		}, 1000);
	});
}
//Menu Responsive
function rep_menu(){
	$('.toggle-mobile-menu').on('click',function(event){
		event.preventDefault();
		$(this).parents('.main-nav').toggleClass('active');
	});
    $('.main-nav li.menu-item-has-children> a > .mb-icon-menu').on('click',function(event){
        if($(window).width()<768){
			/*event.preventDefault();
			 $(this).next().stop(true,false).slideToggle();*/
            var t = $(this);
            var link = t.closest('a');
            link.next().stop(true,false).slideToggle('slow');
            event.preventDefault();
            event.stopPropagation();
        }
    });
	/*$('.main-nav li.menu-item-has-children>a').on('click',function(event){
		if($(window).width()<768){
			event.preventDefault();
			$(this).next().stop(true,false).slideToggle();
		}
	});*/
}
//Custom ScrollBar
function custom_scroll(){
	if($('.custom-scroll').length>0){
		$('.custom-scroll').each(function(){
			$(this).mCustomScrollbar({
				scrollButtons:{
					enable:true
				}
			});
		});
	}
}
//Offset Menu
function offset_menu(){
	if($(window).width()>767){
		$('.main-nav .sub-menu').each(function(){
			var wdm = $(window).width();
			var wde = $(this).width();
			var offset = $(this).offset().left;
			var tw = offset+wde;
			if(tw>wdm){
				$(this).addClass('offset-right');
			}
		});
	}else{
		return false;
	}
}
//Fixed Header
function fixed_ontop_header(){
	if($('.header-ontop').length>0){
		if($(window).width()>1023){
			var ht = $('#header').height();
			var st = $(window).scrollTop();
			if(st>ht){
				$('.header-ontop').addClass('fixed-ontop');
                $('.header-ontop').find('.mb-container').addClass('container');
			}else{
				$('.header-ontop').removeClass('fixed-ontop');
                $('.header-ontop').find('.mb-container').removeClass('container');
			}
		}else{
			$('.header-ontop').removeClass('fixed-ontop');
            $('.header-ontop').find('.mb-container').removeClass('container');
		}
	}
} 
//Slider Background
function background(){
	$('.bg-slider .item-slider').each(function(){
		var src=$(this).find('.banner-thumb a img').attr('src');
		$(this).css('background-image','url("'+src+'")');
	});	
}
function animated(){
	$('.banner-slider .owl-item').each(function(){
		var check = $(this).hasClass('active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
	});
}
function slick_animated(){
	$('.banner-slider .item-slider').each(function(){
		var check = $(this).hasClass('slick-active');
		if(check==true){
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).addClass(anime);
			});
		}else{
			$(this).find('.animated').each(function(){
				var anime = $(this).attr('data-animated');
				$(this).removeClass(anime);
			});
		}
	});
}
function slick_control(){
	$('.slick-slider').each(function(){
		$(this).find('.slick-prev .slick-caption').html('<div class="slick-thumb slick-prev-img"></div>'+'<div class="slick-info"><h3 class="title12">Prev Slide</h3><p class="desc"></p></div>');
		$(this).find('.slick-next .slick-caption').html('<div class="slick-thumb slick-next-img"></div>'+'<div class="slick-info"><h3 class="title12">Next Slide</h3><p class="desc"></p></div>');
		$(this).find('.slick-prev-img').css('background-image','url("'+$('.slick-active').prev().find('.banner-thumb a img').attr('src')+'")');
		$(this).find('.slick-next-img').css('background-image','url("'+$('.slick-active').next().find('.banner-thumb a img').attr('src')+'")');
		$(this).find('.slick-prev .desc').html($('.slick-active').prev().find('.desc-control').html());
		$(this).find('.slick-next .desc').html($('.slick-active').next().find('.desc-control').html());
	});
}
//Detail Gallery
function detail_gallery(){
	if($('.detail-gallery').length>0){
		$('.detail-gallery').each(function(){
			var visible = $(this).find('.carousel').data('visible');
			var vertical = $(this).find('.carousel').data('vertical');
         //   if(visible > 4) visible=1;
           // $(this).find(".carousel")['prevObject'] = null;
          //  $.removeData( $(this).find(".carousel"));
            //$(this).find(".carousel").jcarouselControl('destroy');
			$(this).find(".carousel").jCarouselLite({
				btnNext: $(this).find(".gallery-control .next"),
				btnPrev: $(this).find(".gallery-control .prev"),
				speed: 800,
				visible:4,
                vertical: vertical
			});
            console.log($(this).find(".carousel")['prevObject']);
			//Elevate Zoom
			$('.detail-gallery').find('.mid img').elevateZoom({
				zoomType: "inner",
				cursor: "crosshair",
				zoomWindowFadeIn: 500,
				zoomWindowFadeOut: 750
			});
			$(this).find(".carousel a").on('click',function(event) {
				event.preventDefault();
				$(this).parents('.detail-gallery').find(".carousel a").removeClass('active');
				$(this).addClass('active');
				var z_url =  $(this).find('img').attr("src");
				$(this).parents('.detail-gallery').find(".mid img").attr("src", z_url);
				$('.zoomWindow').css('background-image','url("'+z_url+'")');
			});
		});
	}
}

//Document Ready
jQuery(document).ready(function(){
	//Service Hover
	if($('.list-service').length>0){
		$('.list-service').each(function(){
			$(this).find('.item-service').on('mouseover',function(){
				$(this).parents('.list-service').find('.item-service').removeClass('active');
				$(this).addClass('active');
			});
			$(this).on('mouseout',function(){
				$(this).find('.item-service').removeClass('active');
				$(this).find('.item-active').addClass('active');
			});
		});
	}
	//Filter Price
	if($('.range-filter').length>0){
		$('.range-filter').each(function(){
            var pricemin = $(this).find(".slider-range").data('pricemin');
            var pricemax = $(this).find(".slider-range").data('pricemax');
            var currentmin = $(this).find(".slider-range").data('currentmin');
            var currentmax = $(this).find(".slider-range").data('currentmax');
			$(this).find( ".slider-range" ).slider({
				range: true,
				min: pricemin,
				max: pricemax,
				values: [ currentmin, currentmax ],
				slide: function( event, ui ) {
					$(this).parents('.range-filter').find( ".amount" ).html( '<span>'+ui.values[ 0 ]+'</span>' + '<span>' + ui.values[ 1 ]+'</span>');
                    $(this).parents('.range-filter').find( ".input-filter" ).html( '<input type="text" class="hide" id="min_price" name="min_price" value="'+ui.values[ 0 ]+'" /><input class="hide" type="text" id="max_price" name="max_price" value="'+ui.values[ 1 ]+'" />');
				}
			});
			$(this).find( ".amount" ).html('<span>'+$(this).find( ".slider-range" ).slider( "values", 0 )+'</span>' + '<span>'+$(this).find( ".slider-range" ).slider( "values", 1 )+'</span>');
		});
	}

	//Qty Up-Down

        $("body").on("click",'.detail-qty .qty-up',function(){
            var min = $(this).prev().attr("data-min");
            var max = $(this).prev().attr("data-max");
            var step = $(this).prev().attr("data-step");
            if(step === undefined) step = 1;
            if(max !==undefined && Number($(this).prev().val())< Number(max) || max === undefined){
                if(step!='') $(this).prev().val(Number($(this).prev().val())+Number(step));
            }
            $( 'body .button[name="update_cart"]' ).prop( 'disabled', false );
            return false;
        });
		$("body").on("click",'.detail-qty .qty-down',function(){
			var seff = $(this).parents('.quantity').find('input');
			var min = seff.attr("min");
			var max = seff.attr("max");
			var step = seff.attr("step");
			if(step === undefined) step = 1;
			if(Number(seff.val()) > 1){
				if(min !==undefined && seff.val()>min || min === undefined || !min){
					if(step!='') seff.val(Number(seff.val())-Number(step));
				}
			}
			$( 'body .button[name="update_cart"]' ).prop( 'disabled', false );
			return false;
		})
		$("body input.qty-val").on("keyup change",function(){
			var max = $(this).attr('data-max');
			if( Number($(this).val()) > Number(max) ) $(this).val(max);
			$( 'body form .button[name="update_cart"]' ).prop( 'disabled', false );
		})
	//Detail Gallery
	detail_gallery();
	//Wishlist Popup
	popup_wishlist();
	//Menu Responsive 
	rep_menu();
	//Offset Menu
	offset_menu();
	//Toggle Tab
	toggle_tab();
	//Animate
	if($('.wow').length>0){
		new WOW().init();
	}
	//Video Light Box
	if($('.btn-video').length>0){
		$('.btn-video').fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			prevEffect : 'none',
			nextEffect : 'none',

			arrows : false,
			helpers : {
				media : {},
				buttons : {}
			}
		});	
	}
	//Light Box
	if($('.fancybox').length>0){
		$('.fancybox').fancybox();	
	}
	//Back To Top
	$('.scroll-top').on('click',function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop:0}, 'slow');
	});
});
//Window Load
jQuery(window).on('load',function(){ 
	//Owl Carousel
	if($('.wrap-item').length>0){
		$('.wrap-item').each(function(){
			var data = $(this).data();
			$(this).owlCarousel({
				addClassActive:true,
				stopOnHover:true,
				itemsCustom:data.itemscustom,
				autoPlay:data.autoplay,
				transitionStyle:data.transition, 
				paginationNumbers:data.paginumber,
				beforeInit:background,
				afterAction:animated,
				navigationText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			});
		});
	}
	//Slick Slider
	if($('.banner-slider .slick').length>0){
		$('.banner-slider .slick').each(function(){
            var data = $(this).data();
			$(this).slick({
				dots: data.dot,
                autoplay: data.autoplay,
                autoplaySpeed: 3000,
				infinite: true,
				slidesToShow: 1,
                arrows: data.arrows,
				prevArrow:'<div class="slick-prev"><div class="slick-caption"></div><div class="slick-nav"></div></div>',
				nextArrow:'<div class="slick-next"><div class="slick-caption"></div><div class="slick-nav"></div></div>',
			});
			slick_control();
			$('.slick').on('afterChange', function(event){
				slick_control();
				slick_animated();
			});
		});
	}	
	//Day Countdown
	if($('.days-countdown').length>0){
		$(".days-countdown").TimeCircles({
			fg_width: 0.05,
			bg_width: 0,
			text_size: 0,
			circle_bg_color: "transparent",
			time: {
				Days: {
					show: true,
					text: "D",
					color: "#fff"
				},
				Hours: {
					show: true,
					text: "H",
					color: "#fff"
				},
				Minutes: {
					show: true,
					text: "M",
					color: "#fff"
				},
				Seconds: {
					show: true,
					text: "S",
					color: "#fff"
				}
			}
		}); 
	}
	//Count Down Master
	if($('.countdown-master').length>0){
		$('.countdown-master').each(function(){
			var time = $(this).data('time');
			$(this).FlipClock(time,{
		        clockFace: 'HourlyCounter',
		        countdown: true,
		        autoStart: true,
		    });
		});
	}
	//Count Down Master
	if($('.countdown-product').length>0){
		$('.countdown-product').each(function(){
			var time = $(this).data('time');
			$(this).FlipClock(time,{
		        clockFace: 'DailyCounter',
		        countdown: true,
		        autoStart: true,
		    });
		});
	}
});
//Window Resize
jQuery(window).on('resize',function(){
	offset_menu();
    fixed_ontop_header();
	//detail_gallery();
});
//Window Scroll
jQuery(window).on('scroll',function(){
	//Scroll Top
	if($(this).scrollTop()>$(this).height()){
		$('.scroll-top').addClass('active');
	}else{
		$('.scroll-top').removeClass('active');
	}
	//Fixed Header
    fixed_ontop_header();
});
})(jQuery); // End of use strict