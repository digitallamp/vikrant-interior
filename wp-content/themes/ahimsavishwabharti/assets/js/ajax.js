(function($){
    "use strict";
    function get_currency(pricehtml){
        var check,index,price,i;
        for(i = 0;i<6;i++){
            if(pricehtml.search(currency[i]) != -1)  {
                check = true;
                index = i;
            }
        }
        if(check) price =  pricehtml.replace(currency[index],"");
        else price = pricehtml.replace(/[^0-9\.]+/g,"");
        return price;

    }
    function live_search(){
        var key = $(this).val();
        var post_type = $(this).parents('.live-search-true').find('input[name="post_type"]').val();
        var cat = $(this).parents('.live-search-true').find('input[name="product_cat"]').val();
        var seff = $(this);
        var content = seff.parent().find('.list-product-search');
        var live_search = seff.parents('.live-search-true');
        content.html('<i class="fa fa-spinner fa-spin"></i>');
        content.addClass('ajax-loading');
        $(this).parents('.live-search-true').addClass('active');

        $.ajax({
            type : "post",
            url : ajax_process.ajaxurl,
            crossDomain: true,
            data: {
                action: "live_search",
                key: key,
                post_type: post_type,
                cat: cat,
            },
            success: function(data){

                //live_search.removeClass('active');
                if(data[data.length-1] == '0' ){
                    data = data.split('');
                    data[data.length-1] = '';
                    data = data.join('');
                }
                content.html(data);
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                console.log(errorThrown);
            }
        });
    }
    $(document).ready(function() {
        $('body').on('click', '.masonry-ajax', function(e){
            e.preventDefault();
            $(this).find('i').addClass('fa-spin');
            var current = $(this).parents('.mb-element-blog-masonry');
            var data_load = $(this);
            var content = current.find('.masonry-list-post');
            var number = data_load.attr('data-number');
            var orderby = data_load.attr('data-orderby');
            var order = data_load.attr('data-order');
            var cats = data_load.attr('data-cat');
            var paged = data_load.attr('data-paged');
            var maxpage = data_load.attr('data-maxpage');
            var postid = data_load.attr('data-postid');
            var userid = data_load.attr('data-userid');
            $.ajax({
                type: 'POST',
                url: ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                    action: 'load_more_post_masonry',
                    number: number,
                    orderby: orderby,
                    order: order,
                    cats: cats,
                    paged: paged,
                    postid: postid,
                    userid: userid,
                },
                success: function(data){
                    if(data[data.length-1] == '0' ){
                        data = data.split('');
                        data[data.length-1] = '';
                        data = data.join('');
                    }
                    var $newItem = $(data);
                    content.append($newItem).masonry( 'appended', $newItem, true );
                    content.imagesLoaded( function() {
                        content.masonry('layout');
                    });
                    paged = Number(paged) + 1;
                    data_load.attr('data-paged',paged);
                    data_load.find('i').removeClass('fa-spin');
                    if(Number(paged)>=Number(maxpage)){
                        data_load.parent().fadeOut();
                    }
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
            return false;
        });

        $('body').on('click', '.ajax-loadmore-tab', function(e){
            e.preventDefault();
            $(this).find('i').addClass('fa-spin');
            var current = $(this).parents('.product-loadmore');
            var data_load = $(this);
            var content = current.find('.list-product-loadmore');
            var number = data_load.attr('data-number');
            var orderby = data_load.attr('data-orderby');
            var order = data_load.attr('data-order');
            var cats = data_load.attr('data-cat');
            var paged = data_load.attr('data-paged');
            var maxpage = data_load.attr('data-maxpage');
            var pro_featured  = data_load.attr('data-profeatured');
            var pro_sale  = data_load.attr('data-prosale');
            var col_layout  = data_load.attr('data-collayout');
            var img_size  = data_load.attr('data-imgsize');
            var animation_img  = data_load.attr('data-animationimg');
            console.log(col_layout);
            $.ajax({
                type: 'POST',
                url: ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                    action: 'load_more_product_tab_layout',
                    number: number,
                    orderby: orderby,
                    order: order,
                    cats: cats,
                    paged: paged,
                    pro_featured: pro_featured,
                    pro_sale: pro_sale,
                    col_layout: col_layout,
                    img_size: img_size,
                    animation_img: animation_img,
                },
                success: function(data){


                    if(data[data.length-1] == '0' ){
                        data = data.split('');
                        data[data.length-1] = '';
                        data = data.join('');
                    }
                    var $newItem = $(data);
                    content.append(data);
                    paged = Number(paged) + 1;
                    data_load.attr('data-paged',paged);
                    data_load.find('i').removeClass('fa-spin');
                    if(Number(paged)>=Number(maxpage)){
                        data_load.parent().fadeOut();
                    }
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
            return false;
        });

        $('.wishlist-close').on('click',function(){
            $('.wishlist-mask').fadeOut();
        })

        $('.add_to_wishlist').live('click',function(){
            $('.wishlist-countdown').html('3');
            $(this).addClass('added');
            var product_id = $(this).attr("data-product-id");
            var product_title = $(this).attr("data-product-title");
            $('.wishlist-title').html(product_title);
            $('.wishlist-mask').fadeIn();
            var counter = 3;
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
        })

        $('body').on('click','.product-ajax-popup', function(e){
            $.fancybox.showLoading();
            var product_id = $(this).attr('data-product-id');

            $.ajax({
                type: 'POST',
                url: ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                    action: 'product_popup_content',
                    product_id: product_id
                },
                success: function(res){
                    if(res[res.length-1] == '0' ){
                        res = res.split('');
                        res[res.length-1] = '';
                        res = res.join('');
                    }
                    $.fancybox.hideLoading();
                    $.fancybox(res, {
                        width: 800,
                        height: 470,
                        autoSize: false,
                        onStart: function(opener) {
                            if ($(opener).attr('id') == 'login') {
                                $.get('/hicommon/authenticated', function(res) {
                                    if ('yes' == res) {
                                        console.log('this user must have already authenticated in another browser tab, SO I want to avoid opening the fancybox.');
                                        return false;
                                    } else {
                                        console.log('the user is not authenticated');
                                        return true;
                                    }
                                });
                            }
                        },
                    });
                    if($('.detail-gallery').length>0){
                        $('.detail-gallery').each(function(){
                            var vertical = $(this).find('.carousel').data('vertical');
                            $(this).find(".carousel").jCarouselLite({
                                btnNext: $(this).find(".gallery-control .next"),
                                btnPrev: $(this).find(".gallery-control .prev"),
                                speed: 800,
                                visible:4,
                                vertical: vertical
                            });
                            //Elevate Zoom

                            $('.detail-gallery').find('.mid img').on('hover',
                                function () {
                                    $.removeData($('.detail-gallery .mid img'), 'elevateZoom');//remove zoom instance from image
                                    $('.zoomContainer').remove();
                                    $(this).elevateZoom({
                                        zoomType: "inner",
                                        cursor: "crosshair",
                                        zoomWindowFadeIn: 500,
                                        zoomWindowFadeOut: 750
                                    });
                                }

                            )


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
                    $('.fancybox-overlay, .fancybox-close').on('click',function () {
                        $('.zoomContainer').remove();
                    })
                    /*!
                     * Variations Plugin
                     */
                    !function(a,b,c,d){a.fn.wc_variation_form=function(){var c=this,f=c.closest(".product"),g=parseInt(c.data("product_id"),10),h=c.data("product_variations"),i=h===!1,j=!1,k=c.find(".reset_variations");return c.unbind("check_variations update_variation_values found_variation"),c.find(".reset_variations").unbind("click"),c.find(".variations select").unbind("change focusin"),c.on("click",".reset_variations",function(){return c.find(".variations select").val("").change(),c.trigger("reset_data"),!1}).on("reload_product_variations",function(){h=c.data("product_variations"),i=h===!1}).on("reset_data",function(){var b={".sku":"o_sku",".product_weight":"o_weight",".product_dimensions":"o_dimensions"};a.each(b,function(a,b){var c=f.find(a);c.attr("data-"+b)&&c.text(c.attr("data-"+b))}),c.wc_variations_description_update(""),c.trigger("reset_image"),c.find(".single_variation_wrap").slideUp(200).trigger("hide_variation")}).on("reset_image",function(){var a=f.find("div.images img:eq(0)"),b=f.find("div.images a.zoom:eq(0)"),c=a.attr("data-o_src"),e=a.attr("data-o_title"),g=a.attr("data-o_title"),h=b.attr("data-o_href");c!==d&&a.attr("src",c),h!==d&&b.attr("href",h),e!==d&&(a.attr("title",e),b.attr("title",e)),g!==d&&a.attr("alt",g)}).on("change",".variations select",function(){if(c.find('input[name="variation_id"], input.variation_id').val("").change(),c.find(".wc-no-matching-variations").remove(),i){j&&j.abort();var b=!0,d=!1,e={};c.find(".variations select").each(function(){var c=a(this).data("attribute_name")||a(this).attr("name");0===a(this).val().length?b=!1:d=!0,e[c]=a(this).val()}),b?(e.product_id=g,j=a.ajax({url:wc_cart_fragments_params.wc_ajax_url.toString().replace("%%endpoint%%","get_variation"),type:"POST",data:e,success:function(a){a?(c.find('input[name="variation_id"], input.variation_id').val(a.variation_id).change(),c.trigger("found_variation",[a])):(c.trigger("reset_data"),c.find(".single_variation_wrap").after('<p class="wc-no-matching-variations woocommerce-info">'+wc_add_to_cart_variation_params.i18n_no_matching_variations_text+"</p>"),c.find(".wc-no-matching-variations").slideDown(200))}})):c.trigger("reset_data"),d?"hidden"===k.css("visibility")&&k.css("visibility","visible").hide().fadeIn():k.css("visibility","hidden")}else c.trigger("woocommerce_variation_select_change"),c.trigger("check_variations",["",!1]),a(this).blur();c.trigger("woocommerce_variation_has_changed")}).on("focusin touchstart",".variations select",function(){i||(c.trigger("woocommerce_variation_select_focusin"),c.trigger("check_variations",[a(this).data("attribute_name")||a(this).attr("name"),!0]))}).on("found_variation",function(a,b){var e=f.find("div.images img:eq(0)"),g=f.find("div.images a.zoom:eq(0)"),h=e.attr("data-o_src"),i=e.attr("data-o_title"),j=e.attr("data-o_alt"),k=g.attr("data-o_href"),l=b.image_src,m=b.image_link,n=b.image_caption,o=b.image_title;c.find(".single_variation").html(b.price_html+b.availability_html),h===d&&(h=e.attr("src")?e.attr("src"):"",e.attr("data-o_src",h)),k===d&&(k=g.attr("href")?g.attr("href"):"",g.attr("data-o_href",k)),i===d&&(i=e.attr("title")?e.attr("title"):"",e.attr("data-o_title",i)),j===d&&(j=e.attr("alt")?e.attr("alt"):"",e.attr("data-o_alt",j)),l&&l.length>1?(e.attr("src",l).attr("alt",o).attr("title",o),g.attr("href",m).attr("title",n)):(e.attr("src",h).attr("alt",j).attr("title",i),g.attr("href",k).attr("title",i));var p=c.find(".single_variation_wrap"),q=f.find(".product_meta").find(".sku"),r=f.find(".product_weight"),s=f.find(".product_dimensions");q.attr("data-o_sku")||q.attr("data-o_sku",q.text()),r.attr("data-o_weight")||r.attr("data-o_weight",r.text()),s.attr("data-o_dimensions")||s.attr("data-o_dimensions",s.text()),b.sku?q.text(b.sku):q.text(q.attr("data-o_sku")),b.weight?r.text(b.weight):r.text(r.attr("data-o_weight")),b.dimensions?s.text(b.dimensions):s.text(s.attr("data-o_dimensions"));var t=!1,u=!1;b.is_purchasable&&b.is_in_stock&&b.variation_is_visible||(u=!0),b.variation_is_visible||c.find(".single_variation").html("<p>"+wc_add_to_cart_variation_params.i18n_unavailable_text+"</p>"),""!==b.min_qty?p.find(".quantity input.qty").attr("min",b.min_qty).val(b.min_qty):p.find(".quantity input.qty").removeAttr("min"),""!==b.max_qty?p.find(".quantity input.qty").attr("max",b.max_qty):p.find(".quantity input.qty").removeAttr("max"),"yes"===b.is_sold_individually&&(p.find(".quantity input.qty").val("1"),t=!0),t?p.find(".quantity").hide():u||p.find(".quantity").show(),u?p.is(":visible")?c.find(".variations_button").slideUp(200):c.find(".variations_button").hide():p.is(":visible")?c.find(".variations_button").slideDown(200):c.find(".variations_button").show(),c.wc_variations_description_update(b.variation_description),p.slideDown(200).trigger("show_variation",[b])}).on("check_variations",function(c,d,f){if(!i){var g=!0,j=!1,k={},l=a(this),m=l.find(".reset_variations");l.find(".variations select").each(function(){var b=a(this).data("attribute_name")||a(this).attr("name");0===a(this).val().length?g=!1:j=!0,d&&b===d?(g=!1,k[b]=""):k[b]=a(this).val()});var n=e.find_matching_variations(h,k);if(g){var o=n.shift();o?(l.find('input[name="variation_id"], input.variation_id').val(o.variation_id).change(),l.trigger("found_variation",[o])):(l.find(".variations select").val(""),f||l.trigger("reset_data"),b.alert(wc_add_to_cart_variation_params.i18n_no_matching_variations_text))}else l.trigger("update_variation_values",[n]),f||l.trigger("reset_data"),d||l.find(".single_variation_wrap").slideUp(200).trigger("hide_variation");j?"hidden"===m.css("visibility")&&m.css("visibility","visible").hide().fadeIn():m.css("visibility","hidden")}}).on("update_variation_values",function(b,d){i||(c.find(".variations select").each(function(b,c){var e,f=a(c);f.data("attribute_options")||f.data("attribute_options",f.find("option:gt(0)").get()),f.find("option:gt(0)").remove(),f.append(f.data("attribute_options")),f.find("option:gt(0)").removeClass("attached"),f.find("option:gt(0)").removeClass("enabled"),f.find("option:gt(0)").removeAttr("disabled"),e="undefined"!=typeof f.data("attribute_name")?f.data("attribute_name"):f.attr("name");for(var g in d)if("undefined"!=typeof d[g]){var h=d[g].attributes;for(var i in h)if(h.hasOwnProperty(i)){var j=h[i];if(i===e){var k="";d[g].variation_is_active&&(k="enabled"),j?(j=a("<div/>").html(j).text(),j=j.replace(/'/g,"\\'"),j=j.replace(/"/g,'\\"'),f.find('option[value="'+j+'"]').addClass("attached "+k)):f.find("option:gt(0)").addClass("attached "+k)}}}f.find("option:gt(0):not(.attached)").remove(),f.find("option:gt(0):not(.enabled)").attr("disabled","disabled")}),c.trigger("woocommerce_update_variation_values"))}),c.trigger("wc_variation_form"),c};var e={find_matching_variations:function(a,b){for(var c=[],d=0;d<a.length;d++){var f=a[d];e.variations_match(f.attributes,b)&&c.push(f)}return c},variations_match:function(a,b){var c=!0;for(var e in a)if(a.hasOwnProperty(e)){var f=a[e],g=b[e];f!==d&&g!==d&&0!==f.length&&0!==g.length&&f!==g&&(c=!1)}return c}};a.fn.wc_variations_description_update=function(b){var c=this,d=c.find(".woocommerce-variation-description");if(0===d.length)b&&(c.find(".single_variation_wrap").prepend(a('<div class="woocommerce-variation-description" style="border:1px solid transparent;">'+b+"</div>").hide()),c.find(".woocommerce-variation-description").slideDown(200));else{var e=d.outerHeight(!0),f=0,g=!1;d.css("height",e),d.html(b),d.css("height","auto"),f=d.outerHeight(!0),Math.abs(f-e)>1&&(g=!0,d.css("height",e)),g&&d.animate({height:f},{duration:200,queue:!1,always:function(){d.css({height:"auto"})}})}},a(function(){"undefined"!=typeof wc_add_to_cart_variation_params&&a(".variations_form").each(function(){a(this).wc_variation_form().find(".variations select:eq(0)").change()})})}(jQuery,window,document);


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

                    //Fix product variable thumb
                    $('body .variations_form select').live('change',function(){
                        var text = $(this).val();
                        $(this).parents('.attr-product').find('.current-color').html(text);
                        var id = $('input[name="variation_id"]').val();
                        if(id){
                            $('.product-gallery .bx-pager').find('a[data-variation_id="'+id+'"]').trigger( 'click' );
                            if($('.product-supper11').length > 0){
                                var slider_owl = $(this).parents('.product-supper11').find('.product-detail11 .wrap-item');
                                var index = slider_owl.find('.item[data-variation_id="'+id+'"]').attr('data-index');
                                slider_owl.trigger('owl.goTo', index);
                            }
                            if($('.trend-box18').length > 0){
                                $(this).parents('.item-detail18').find('.trend-thumb18').find('img').removeClass('active');
                                $(this).parents('.item-detail18').find('.trend-thumb18').find('div[data-variation_id="'+id+'"]').find('img').addClass('active');
                            }
                        }
                    })
                    // variable product
                    if($('.wrap-attr-product.special').length > 0){
                        $('.attr-filter ul li a').live('click',function(){
                            event.preventDefault();
                            var text = $(this).html();
                            $(this).parents('.attr-product').find('.current-color').html(text);
                            $(this).parents('ul').find('li').removeClass('active');
                            $(this).parents('ul').find('li a').removeClass('active');
                            $(this).parent().addClass('active');
                            $(this).addClass('active');
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
                                var in_class = '';
                                if(current_val == val){
                                    el_class = ' class="active"';
                                    in_class = 'active';
                                }
                                if(val != ''){
                                    content += '<li'+el_class+' data-attribute="'+val+'"><a href="#" class="bgcolor-'+val+' '+in_class+'"><span></span>'+title+'</a></li>';
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
                                    var in_class = '';
                                    if(current_val == val){
                                        el_class = ' class="active"';
                                        in_class = 'active';
                                    }
                                    if(val != ''){
                                        content += '<li'+el_class+' data-attribute="'+val+'"><a href="#" class="bgcolor-'+val+' '+in_class+'"><span></span>'+title+'</a></li>';
                                    }
                                })
                                if(old_html != content) $(this).find('ul').html(content);
                                $(this).find('ul li').removeClass('active');
                            })
                        })
                    }
                    //end

                    //QUANTITY CLICK

                    //END
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
            return false;
        })

        $("body").on("click",".add_to_cart_button.s7up_ajax_add_to_cart:not(.product_type_variable)",function(e){

            e.preventDefault();
            var product_id = $(this).attr("data-product_id");
            var seff = $(this);
            seff.removeClass('added');
            seff.addClass('loading');
            $.ajax({
                type : "post",
                url : ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                    action: "add_to_cart",
                    product_id: product_id
                },

                success: function(data){
                    seff.removeClass('loading');
                    var cart_content = data.fragments['div.widget_shopping_cart_content'];

                    $('.mini-cart-content').html(cart_content);

                    var count_item = cart_content.split("product-mini-cart").length;
                    var cart_item_count = $('.cart-item-count').html();

                    $('.mini-cart-link .mb-count-ajax').html(count_item-1);
                    var price = $('.mini-cart-content').find('.mini-cart-total').find('.woocommerce-Price-amount').html();
                    $('.mini-cart-link .mb-price').html(price);
                    seff.addClass('added');
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
        });
        //Update cart
        $('.button[name="update_cart"],.woocommerce-cart-form .product-remove .remove').live('click', function(e){
            $( document ).ajaxComplete(function( event, xhr, settings ) {
                if(settings.url.indexOf('?wc-ajax=get_refreshed_fragments') != -1){
                    $.ajax({
                        type: 'POST',
                        url: ajax_process.ajaxurl,
                        crossDomain: true,
                        data: {
                            action: 'update_mini_cart',
                        },
                        success: function(data){
                            // Load html
                            var cart_content = data.fragments['div.widget_shopping_cart_content'];
                            $('.mini-cart-content').html(cart_content);
                            $('.widget_shopping_cart_content').html(cart_content);
                            // set count
                            var count_item = cart_content.split("product-mini-cart").length;
                            var cart_item_count = $('.cart-item-count').html();
                            $('.mb-count-ajax').html(count_item-1);
                            // set price
                            var price = $('.mini-cart-content').find('.mini-cart-total').find('.woocommerce-Price-amount').html();
                            if(price) $('.mb-price').html(price);
                            else $('.mb-price').html($('.total-default').html());
                        },
                        error: function(MLHttpRequest, textStatus, errorThrown){
                            console.log(errorThrown);
                        }
                    });
                }
            });

        });
        $('body').on('click', '.product-mini-cart .remove', function(e){
            e.preventDefault();
            $(this).parents('.product-mini-cart').addClass('hidden');
            var cart_item_key = $(this).parents('.product-mini-cart').attr("data-key");
            $.ajax({
                type: 'POST',
                url: ajax_process.ajaxurl,
                crossDomain: true,
                data: {
                    action: 'product_remove',
                    cart_item_key: cart_item_key
                },
                success: function(data){
                    var cart_content = data.fragments['div.widget_shopping_cart_content'];
                    $('.mini-cart-content').html(cart_content);
                    // set count
                    var count_item = cart_content.split("product-mini-cart").length;
                    var cart_item_count = $('.cart-item-count').html();
                    $('.mb-count-ajax').html(count_item-1);
                    //$('.cart-item-count').html(cart_item_count);
                    // set price
                    var price = $('.mini-cart-content').find('.mini-cart-total').find('.woocommerce-Price-amount').html();
                    if(price) $('.mini-cart-link .mb-price').html(price);
                    else $('.mini-cart-link .mb-price').html($('.total-default').html());
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            });
            return false;
        });
        $('.live-search-true input[name="s"]').on('click',function(event){
            event.preventDefault();
            event.stopPropagation();
            $(this).parents('.live-search-true').addClass('active');
        })

        $('.live-search-true input[name="s"]').on('change keyup click',live_search)
        $('.live-search-true input[name="s"]').on(' click',live_search)
        $('body').on('click',function(event){
            $('.live-search-true.active').removeClass('active');
        })
    });

})(jQuery);