// source --> http://www.quartierinterior.com/wp-content/plugins/logo-slider-wp/public/assets/js/logo-slider-wp-public.js 
(function() {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
	 *
	 * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
	 *
	 * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */


    jQuery(document).ready(function($) {

        $('.lgx-logo-carousel').each(function(){
            var $logoitem = $(this);
            var dataAttr = $logoitem.data();
           //console.log(dataAttr.autoplayhoverpause);
            var logocarouselParams = {
                addClassActive:true,
                loop:dataAttr.loop,
                dots:dataAttr.dots,
                autoplay:dataAttr.autoplay,
                lazyLoad: dataAttr.lazyload,
                autoplayTimeout:dataAttr.autoplaytimeout,
                margin:dataAttr.margin,
                autoplayHoverPause:dataAttr.autoplayhoverpause,
                navText :['<img src="'+logosliderwp.owl_navigationTextL+'" alt="Left"/>','<img src="'+logosliderwp.owl_navigationTextR+'" alt="Right"/>'],
                smartSpeed:dataAttr.smartspeed,
                slideSpeed : dataAttr.slidespeed,
                paginationSpeed : dataAttr.paginationspeed,
                rewindSpeed : dataAttr.rewindspeed,
                responsiveClass:true,
                responsive:{
                    // Item in Mobile Devices (Less than 768px)
                    0:{
                        items:dataAttr.itemmobile,
                        nav:dataAttr.navmobile
                    },
                    // Item in Tablets Devices (768px and Up)
                    768:{
                        items:dataAttr.itemtablet,
                        nav:dataAttr.navtablet
                    },
                    // Item in Desktops Devices (Desktops 992px)

                    992:{
                        items:dataAttr.itemdesk,
                        nav:dataAttr.navdesk
                    },
                    // Item in Large Desktops Devices (1200px and Up)
                    1200:{
                        items:dataAttr.itemlarge,
                        nav:dataAttr.navlarge
                    }
                }

            };
            $logoitem.owlCarousel(logocarouselParams);
            //
        });

    });



})();
// source --> http://www.quartierinterior.com/wp-content/plugins/photo-gallery/js/jquery.sumoselect.min.js 
/*
 * jquery.sumoselect - v3.0.3
 * http://hemantnegi.github.io/jquery.sumoselect
 * 2016-12-12
 *
 * Copyright 2015 Hemant Negi
 * Email : hemant.frnz@gmail.com
 * Compressor http://refresh-sf.com/
 */

(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

})(function ($) {

  'namespace sumo';
  $.fn.SumoSelect = function (options) {

    /* This is the easiest way to have default options.*/
    var settings = $.extend({
      placeholder: 'Select Here',   /* Dont change it here.*/
      csvDispCount: 3,              /* display no. of items in multiselect. 0 to display all.*/
      captionFormat:'{0} Selected', /* format of caption text. you can set your locale.*/
      captionFormatAllSelected:'{0} all selected!', /* format of caption text when all elements are selected. set null to use captionFormat. It will not work if there are disabled elements in select.*/
      floatWidth: 400,              /* Screen width of device at which the list is rendered in floating popup fashion.*/
      forceCustomRendering: false,  /* force the custom modal on all devices below floatWidth resolution.*/
      nativeOnDevice: ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
      outputAsCSV: false,           /* true to POST data as csv ( false for Html control array ie. default select )*/
      csvSepChar: ',',              /* separation char in csv mode*/
      okCancelInMulti: false,       /* display ok cancel buttons in desktop mode multiselect also.*/
      isClickAwayOk: false,         /* for okCancelInMulti=true. sets whether click outside will trigger Ok or Cancel (default is cancel).*/
      triggerChangeCombined: true,  /* im multi select mode whether to trigger change event on individual selection or combined selection.*/
      selectAll: false,             /* to display select all button in multiselect mode.|| also select all will not be available on mobile devices.*/
      search: false,                /* to display input for filtering content. selectAlltext will be input text placeholder*/
      searchText: 'Search...',      /* placeholder for search input*/
      noMatch: 'No matches for "{0}"',
      prefix: '',                   /* some prefix usually the field name. eg. '<b>Hello</b>'*/
      locale: ['OK', 'Cancel', 'Select All'],  /* all text that is used. don't change the index.*/
      up: false,                    /* set true to open upside.*/
      showTitle: true               /* set to false to prevent title (tooltip) from appearing*/
    }, options);

    var ret = this.each(function () {
      var selObj = this; /* the original select object.*/
      if (this.sumo || !$(this).is('select')) return; /* already initialized*/

      this.sumo = {
        E: $(selObj), /* the jquery object of original select element.*/
        is_multi: $(selObj).attr('multiple'),  /* if its a multiple select*/
        select: '',
        caption: '',
        placeholder: '',
        optDiv: '',
        CaptionCont: '',
        ul:'',
        is_floating: false,
        is_opened: false,
        /* backdrop: '', */
        mob:false, /* if to open device default select */
        Pstate: [],

        createElems: function () {
          var O = this;
          O.E.wrap('<div class="SumoSelect" tabindex="0" role="button" aria-expanded="false">');
          O.select = O.E.parent();
          O.caption = $('<span>');
          O.CaptionCont = $('<p class="CaptionCont SelectBox" ><label><i></i></label></p>')
            .attr('style', O.E.attr('style'))
            .prepend(O.caption);
          O.select.append(O.CaptionCont);

          /* default turn off if no multiselect */
          if(!O.is_multi)settings.okCancelInMulti = false

          if(O.E.attr('disabled'))
            O.select.addClass('disabled').removeAttr('tabindex');

          /* if output as csv and is a multiselect.*/
          if (settings.outputAsCSV && O.is_multi && O.E.attr('name')) {
            /* create a hidden field to store csv value.*/
            O.select.append($('<input class="HEMANT123" type="hidden" />').attr('name', O.E.attr('name')).val(O.getSelStr()));

            /* so it can not post the original select.*/
            O.E.removeAttr('name');
          }

          /* break for mobile rendring.. if forceCustomRendering is false*/
          if (O.isMobile() && !settings.forceCustomRendering) {
            O.setNativeMobile();
            return;
          }

          /* if there is a name attr in select add a class to container div*/
          if(O.E.attr('name')) O.select.addClass('sumo_'+O.E.attr('name').replace(/\[\]/, ''))

          /* hide original select */
          O.E.addClass('SumoUnder').attr('tabindex','-1');

          /* Creating the list... */
          O.optDiv = $('<div class="optWrapper '+ (settings.up?'up':'') +'">');

          /* branch for floating list in low res devices.*/
          O.floatingList();

          /* Creating the markup for the available options*/
          O.ul = $('<ul class="options">');
          O.optDiv.append(O.ul);

          /* Select all functionality*/
          if(settings.selectAll && O.is_multi) O.SelAll();

          /* search functionality*/
          if(settings.search) O.Search();

          O.ul.append(O.prepItems(O.E.children()));

          /* if multiple then add the class multiple and add OK / CANCEL button */
          if (O.is_multi) O.multiSelelect();

          O.select.append(O.optDiv);
          O.basicEvents();
          O.selAllState();
        },

        prepItems: function(opts, d){
          var lis = [], O=this;
          $(opts).each(function (i, opt) { /* parsing options to li */
            opt = $(opt);
            lis.push(opt.is('optgroup')?
              $('<li class="group '+ (opt[0].disabled?'disabled':'') +'"><label>' + opt.attr('label') +'</label><ul></ul></li>')
                .find('ul')
                .append(O.prepItems(opt.children(), opt[0].disabled))
                .end()
              :
              O.createLi(opt, d)
            );
          });
          return lis;
        },

        /* Creates a LI element from a given option and binds events to it*/
        /*returns the jquery instance of li (not inserted in dom)*/
        createLi: function (opt, d) {
          var O = this;

          if(!opt.attr('value'))opt.attr('value',opt.val());
          var li = $('<li class="opt"><label>' + opt.text() + '</label></li>');

          li.data('opt', opt); /* store a direct reference to option.*/
          opt.data('li', li); /* store a direct reference to list item.*/
          if (O.is_multi) li.prepend('<span><i></i></span>');

          if (opt[0].disabled || d)
            li = li.addClass('disabled');

          O.onOptClick(li);

          if (opt[0].selected)
            li.addClass('selected');

          if (opt.attr('class'))
            li.addClass(opt.attr('class'));

          if (opt.attr('title'))
            li.attr('title', opt.attr('title'));

          return li;
        },

        /* Returns the selected items as string in a Multiselect.*/
        getSelStr: function () {
          /* get the pre selected items.*/
          sopt = [];
          this.E.find('option:selected').each(function () { sopt.push($(this).val()); });
          return sopt.join(settings.csvSepChar);
        },

        /* THOSE OK/CANCEL BUTTONS ON MULTIPLE SELECT.*/
        multiSelelect: function () {
          var O = this;
          O.optDiv.addClass('multiple');
          O.okbtn = $('<p tabindex="0" class="btnOk">'+settings.locale[0]+'</p>').click(function () {
            /* if combined change event is set.*/
            O._okbtn();
            O.hideOpts();
          });
          O.cancelBtn = $('<p tabindex="0" class="btnCancel">'+settings.locale[1]+'</p>').click(function () {
            O._cnbtn();
            O.hideOpts();
          });
          var btns = O.okbtn.add(O.cancelBtn);
          O.optDiv.append($('<div class="MultiControls">').append(btns));

          /* handling keyboard navigation on ok cancel buttons. */
          btns.on('keydown.sumo', function (e) {
            var el = $(this);
            switch (e.which) {
              case 32: /* space */
              case 13: /* enter */
                el.trigger('click');
                break;

              case 9:  /* tab */
                if(el.hasClass('btnOk'))return;
              case 27: /* esc */
                O._cnbtn();
                O.hideOpts();
                return;
            }
            e.stopPropagation();
            e.preventDefault();
          });
        },

        _okbtn:function(){
          var O = this, cg = 0;
          /* if combined change event is set. */
          if (settings.triggerChangeCombined) {
            /* check for a change in the selection. */
            if (O.E.find('option:selected').length != O.Pstate.length) {
              cg = 1;
            }
            else {
              O.E.find('option').each(function (i,e) {
                if(e.selected && O.Pstate.indexOf(i) < 0) cg = 1;
              });
            }

            if (cg) {
              O.callChange();
              O.setText();
            }
          }
        },
        _cnbtn:function(){
          var O = this;
          /* remove all selections */
          O.E.find('option:selected').each(function () { this.selected = false; });
          O.optDiv.find('li.selected').removeClass('selected')

          /* restore selections from saved state. */
          for(var i = 0; i < O.Pstate.length; i++) {
            O.E.find('option')[O.Pstate[i]].selected = true;
            O.ul.find('li.opt').eq(O.Pstate[i]).addClass('selected');
          }
          O.selAllState();
        },

        SelAll:function(){
          var O = this;
          if(!O.is_multi)return;
          O.selAll = $('<p class="select-all"><span><i></i></span><label>' + settings.locale[2] + '</label></p>');
          O.optDiv.addClass('selall');
          O.selAll.on('click',function(){
            O.selAll.toggleClass('selected');
            O.toggSelAll(O.selAll.hasClass('selected'), 1);
            //O.selAllState();
          });

          O.optDiv.prepend(O.selAll);
        },

        /* search module (can be removed if not required.) */
        Search: function(){
          var O = this,
            cc = O.CaptionCont.addClass('search'),
            P = $('<p class="no-match">');

          O.ftxt = $('<input type="text" class="search-txt" value="" placeholder="' + settings.searchText + '">')
            .on('click', function(e){
              e.stopPropagation();
            });
          cc.append(O.ftxt);
          O.optDiv.children('ul').after(P);

          O.ftxt.on('keyup.sumo',function(){
            var hid = O.optDiv.find('ul.options li.opt').each(function(ix,e){
              var e = $(e),
                opt = e.data('opt')[0];
              opt.hidden = e.text().toLowerCase().indexOf(O.ftxt.val().toLowerCase()) < 0;
              e.toggleClass('hidden', opt.hidden);
            }).not('.hidden');

            P.html(settings.noMatch.replace(/\{0\}/g, '<em></em>')).toggle(!hid.length);
            P.find('em').text(O.ftxt.val());
            O.selAllState();
          });
        },

        selAllState: function () {
          var O = this;
          if (settings.selectAll && O.is_multi) {
            var sc = 0, vc = 0;
            O.optDiv.find('li.opt').not('.hidden').each(function (ix, e) {
              if ($(e).hasClass('selected')) sc++;
              if (!$(e).hasClass('disabled')) vc++;
            });
            /* select all checkbox state change. */
            if (sc == vc) O.selAll.removeClass('partial').addClass('selected');
            else if (sc == 0) O.selAll.removeClass('selected partial');
            else O.selAll.addClass('partial') /* .removeClass('selected'); */
          }
        },

        showOpts: function () {
          var O = this;
          if (O.E.attr('disabled')) return; /* if select is disabled then retrun */
          O.E.trigger('sumo:opening', O);
          O.is_opened = true;
          O.select.addClass('open').attr('aria-expanded', 'true');
          O.E.trigger('sumo:opened', O);

          if(O.ftxt)O.ftxt.focus();
          else O.select.focus();

          /* hide options on click outside.*/
          $(document).on('click.sumo', function (e) {
            if (!O.select.is(e.target)                  /* if the target of the click isn't the container... */
              && O.select.has(e.target).length === 0){ /* ... nor a descendant of the container */
              if(!O.is_opened)return;
              O.hideOpts();
              if (settings.okCancelInMulti){
                if(settings.isClickAwayOk)
                  O._okbtn();
                else
                  O._cnbtn();
              }
            }
          });

          if (O.is_floating) {
            H = O.optDiv.children('ul').outerHeight() + 2;  /* +2 is clear fix*/
            if (O.is_multi) H = H + parseInt(O.optDiv.css('padding-bottom'));
            O.optDiv.css('height', H);
            $('body').addClass('sumoStopScroll');
          }

          O.setPstate();
        },

        /* maintain state when ok/cancel buttons are available storing the indexes. */
        setPstate: function(){
          var O = this;
          if (O.is_multi && (O.is_floating || settings.okCancelInMulti)){
            O.Pstate = [];
            /* assuming that find returns elements in tree order */
            O.E.find('option').each(function (i, e){if(e.selected) O.Pstate.push(i);});
          }
        },

        callChange:function(){
          this.E.trigger('change').trigger('click');
        },

        hideOpts: function () {
          var O = this;
          if(O.is_opened){
            O.E.trigger('sumo:closing', O);
            O.is_opened = false;
            O.select.removeClass('open').attr('aria-expanded', 'true').find('ul li.sel').removeClass('sel');
            O.E.trigger('sumo:closed', O);
            $(document).off('click.sumo');
            O.select.focus();
            $('body').removeClass('sumoStopScroll');

            /* clear the search */
            if(settings.search){
              O.ftxt.val('');
              O.ftxt.trigger('keyup.sumo');
            }
          }
        },
        setOnOpen: function () {
          var O = this,
            li = O.optDiv.find('li.opt:not(.hidden)').eq(settings.search?0:O.E[0].selectedIndex);
          if(li.hasClass('disabled')){
            li = li.next(':not(disabled)')
            if(!li.length) return;
          }
          O.optDiv.find('li.sel').removeClass('sel');
          li.addClass('sel');
          O.showOpts();
        },
        nav: function (up) {
          var O = this, c,
            s=O.ul.find('li.opt:not(.disabled, .hidden)'),
            sel = O.ul.find('li.opt.sel:not(.hidden)'),
            idx = s.index(sel);
          if (O.is_opened && sel.length) {

            if (up && idx > 0)
              c = s.eq(idx-1);
            else if(!up && idx < s.length-1 && idx > -1)
              c = s.eq(idx+1);
            else return; /* if no items before or after*/

            sel.removeClass('sel');
            sel = c.addClass('sel');

            /* setting sel item to visible view. */
            var ul = O.ul,
              st = ul.scrollTop(),
              t = sel.position().top + st;
            if(t >= st + ul.height()-sel.outerHeight())
              ul.scrollTop(t - ul.height() + sel.outerHeight());
            if(t<st)
              ul.scrollTop(t);

          }
          else
            O.setOnOpen();
        },

        basicEvents: function () {
          var O = this;
          O.CaptionCont.click(function (evt) {
            O.E.trigger('click');
            if (O.is_opened) O.hideOpts(); else O.showOpts();
            evt.stopPropagation();
          });

          O.select.on('keydown.sumo', function (e) {
            switch (e.which) {
              case 38: /* up */
                O.nav(true);
                break;

              case 40: /* down */
                O.nav(false);
                break;

              case 65: /* shortcut ctrl + a to select all and ctrl + shift + a to unselect all.*/
                if (O.is_multi && e.ctrlKey){
                  O.toggSelAll(!e.shiftKey, 1);
                  break;
                }
                else
                  return;

              case 32: /* space*/
                if(settings.search && O.ftxt.is(e.target))return;
              case 13: /* enter*/
                if (O.is_opened)
                  O.optDiv.find('ul li.sel').trigger('click');
                else
                  O.setOnOpen();
                break;
              case 9:	 /* tab*/
                if(!settings.okCancelInMulti)
                  O.hideOpts();
                return;
              case 27: /* esc*/
                if(settings.okCancelInMulti)O._cnbtn();
                O.hideOpts();
                return;

              default:
                return; /* exit this handler for other keys */
            }
            e.preventDefault(); /* prevent the default action (scroll / move caret) */
          });

          $(window).on('resize.sumo', function () {
            O.floatingList();
          });
        },

        onOptClick: function (li) {
          var O = this;
          li.click(function () {
            var li = $(this);
            if(li.hasClass('disabled'))return;
            var txt = "";
            if (O.is_multi) {
              li.toggleClass('selected');
              li.data('opt')[0].selected = li.hasClass('selected');
              O.selAllState();
            }
            else {
              li.parent().find('li.selected').removeClass('selected'); //if not multiselect then remove all selections from this list
              li.toggleClass('selected');
              li.data('opt')[0].selected = true;
            }

            //branch for combined change event.
            if (!(O.is_multi && settings.triggerChangeCombined && (O.is_floating || settings.okCancelInMulti))) {
              O.setText();
              O.callChange();
            }

            if (!O.is_multi) O.hideOpts(); //if its not a multiselect then hide on single select.
          });
        },

        setText: function () {
          var O = this;
          O.placeholder = "";
          if (O.is_multi) {
            sels = O.E.find(':selected').not(':disabled'); //selected options.

            for (i = 0; i < sels.length; i++) {
              if (i + 1 >= settings.csvDispCount && settings.csvDispCount) {
                if (sels.length == O.E.find('option').length && settings.captionFormatAllSelected) {
                  O.placeholder = settings.captionFormatAllSelected.replace(/\{0\}/g, sels.length)+',';
                } else {
                  O.placeholder = settings.captionFormat.replace(/\{0\}/g, sels.length)+',';
                }

                break;
              }
              else O.placeholder += $(sels[i]).text() + ", ";
            }
            O.placeholder = O.placeholder.replace(/,([^,]*)$/, '$1'); //remove unexpected "," from last.
          }
          else {
            O.placeholder = O.E.find(':selected').not(':disabled').text();
          }

          var is_placeholder = false;

          if (!O.placeholder) {

            is_placeholder = true;

            O.placeholder = O.E.attr('placeholder');
            if (!O.placeholder)                  //if placeholder is there then set it
              O.placeholder = O.E.find('option:disabled:selected').text();
          }

          O.placeholder = O.placeholder ? (settings.prefix + ' ' + O.placeholder) : settings.placeholder

          //set display text
          O.caption.html(O.placeholder);
          if (settings.showTitle) O.CaptionCont.attr('title', O.placeholder);

          //set the hidden field if post as csv is true.
          var csvField = O.select.find('input.HEMANT123');
          if (csvField.length) csvField.val(O.getSelStr());

          //add class placeholder if its a placeholder text.
          if (is_placeholder) O.caption.addClass('placeholder'); else O.caption.removeClass('placeholder');
          return O.placeholder;
        },

        isMobile: function () {

          /* Adapted from http://www.detectmobilebrowsers.com */
          var ua = navigator.userAgent || navigator.vendor || window.opera;

          /* Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices */
          for (var i = 0; i < settings.nativeOnDevice.length; i++) if (ua.toString().toLowerCase().indexOf(settings.nativeOnDevice[i].toLowerCase()) > 0) return settings.nativeOnDevice[i];
          return false;
        },

        setNativeMobile: function () {
          var O = this;
          O.E.addClass('SelectClass'); /* .css('height', O.select.outerHeight()); */
          O.mob = true;
          O.E.change(function () {
            O.setText();
          });
        },

        floatingList: function () {
          var O = this;
          /*called on init and also on resize.*/
          /*O.is_floating = true if window width is < specified float width*/
          O.is_floating = $(window).width() <= settings.floatWidth;

          /*set class isFloating*/
          O.optDiv.toggleClass('isFloating', O.is_floating);

          /*remove height if not floating*/
          if (!O.is_floating) O.optDiv.css('height', '');

          /*toggle class according to okCancelInMulti flag only when it is not floating*/
          O.optDiv.toggleClass('okCancelInMulti', settings.okCancelInMulti && !O.is_floating);
        },

        /* HELPERS FOR OUTSIDERS*/
        /* validates range of given item operations*/
        vRange: function (i) {
          var O = this;
          var opts = O.E.find('option');
          if (opts.length <= i || i < 0) throw "index out of bounds"
          return O;
        },

        /*toggles selection on c as boolean.*/
        toggSel: function (c, i) {
          var O = this;
          var opt;
          if (typeof(i) === "number"){
            O.vRange(i);
            opt = O.E.find('option')[i];
          }
          else{
            opt = O.E.find('option[value="'+i+'"]')[0]||0;
          }
          if (!opt || opt.disabled)
            return;

          if(opt.selected != c){
            opt.selected = c;
            if(!O.mob) $(opt).data('li').toggleClass('selected',c);

            O.callChange();
            O.setPstate();
            O.setText();
            O.selAllState();
          }
        },

        /*toggles disabled on c as boolean.*/
        toggDis: function (c, i) {
          var O = this.vRange(i);
          O.E.find('option')[i].disabled = c;
          if(c)O.E.find('option')[i].selected = false;
          if(!O.mob)O.optDiv.find('ul.options li').eq(i).toggleClass('disabled', c).removeClass('selected');
          O.setText();
        },

        /* toggle disable/enable on complete select control*/
        toggSumo: function(val) {
          var O = this;
          O.enabled = val;
          O.select.toggleClass('disabled', val);

          if (val) {
            O.E.attr('disabled', 'disabled');
            O.select.removeAttr('tabindex');
          }
          else{
            O.E.removeAttr('disabled');
            O.select.attr('tabindex','0');
          }

          return O;
        },

        /* toggles all option on c as boolean.*/
        /* set direct=false/0 bypasses okCancelInMulti behaviour.*/
        toggSelAll: function (c, direct) {
          var O = this;
          O.E.find('option:not(:disabled,:hidden)')
           .each(function(ix,e){
             var is_selected=e.selected,
               e = $(e).data('li');
             if(e.hasClass('hidden'))return;
             if(!!c){
               if(!is_selected)e.trigger('click');
             }
             else{
               if(is_selected)e.trigger('click');
             }
           });

          if(!direct){
            if(!O.mob && O.selAll)O.selAll.removeClass('partial').toggleClass('selected',!!c);
            O.callChange();
            O.setText();
            O.setPstate();
          }
        },

        /* outside accessibility options
         which can be accessed from the element instance.
         */
        reload:function(){
          var elm = this.unload();
          return $(elm).SumoSelect(settings);
        },

        unload: function () {
          var O = this;
          O.select.before(O.E);
          O.E.show();

          if (settings.outputAsCSV && O.is_multi && O.select.find('input.HEMANT123').length) {
            O.E.attr('name', O.select.find('input.HEMANT123').attr('name')); /* restore the name; */
          }
          O.select.remove();
          delete selObj.sumo;
          return selObj;
        },

        /* add a new option to select at a given index.*/
        add: function (val, txt, i) {
          if (typeof val == "undefined") throw "No value to add"

          var O = this;
          opts=O.E.find('option')
          if (typeof txt == "number") { i = txt; txt = val; }
          if (typeof txt == "undefined") { txt = val; }

          opt = $("<option></option>").val(val).html(txt);

          if (opts.length < i) throw "index out of bounds"

          if (typeof i == "undefined" || opts.length == i) { /* add it to the last if given index is last no or no index provides.*/
            O.E.append(opt);
            if(!O.mob)O.ul.append(O.createLi(opt));
          }
          else {
            opts.eq(i).before(opt);
            if(!O.mob)O.ul.find('li.opt').eq(i).before(O.createLi(opt));
          }

          return selObj;
        },

        /* removes an item at a given index. */
        remove: function (i) {
          var O = this.vRange(i);
          O.E.find('option').eq(i).remove();
          if(!O.mob)O.optDiv.find('ul.options li').eq(i).remove();
          O.setText();
        },

        /* Select an item at a given index.*/
        selectItem: function (i) { this.toggSel(true, i); },

        /* UnSelect an iten at a given index.*/
        unSelectItem: function (i) { this.toggSel(false, i); },

        /* Select all items  of the select.*/
        selectAll: function () { this.toggSelAll(true); },

        /* UnSelect all items of the select.*/
        unSelectAll: function () { this.toggSelAll(false); },

        /* Disable an iten at a given index.*/
        disableItem: function (i) { this.toggDis(true, i) },

        /* Removes disabled an iten at a given index.*/
        enableItem: function (i) { this.toggDis(false, i) },

        /* New simple methods as getter and setter are not working fine in ie8-*/
        /* variable to check state of control if enabled or disabled.*/
        enabled : true,
        /* Enables the control*/
        enable: function(){return this.toggSumo(false)},

        /* Disables the control*/
        disable: function(){return this.toggSumo(true)},
        init: function () {
          var O = this;
          O.createElems();
          O.setText();
          return O
        }
      };
      selObj.sumo.init();
    });

    return ret.length == 1 ? ret[0] : ret;
  };
});
// source --> http://www.quartierinterior.com/wp-content/plugins/photo-gallery/js/jquery.mobile.min.js 
/*! jQuery Mobile v1.3.2 | Copyright 2010, 2013 jQuery Foundation, Inc. | jquery.org/license */
(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function x(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function T(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=x(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function N(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function C(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function k(){g=!1}function L(){g=!0}function A(){E=0,v.length=0,m=!1,L()}function O(){k()}function M(){_(),c=setTimeout(function(){c=0,A()},e.vmouse.resetTimerDuration)}function _(){c&&(clearTimeout(c),c=0)}function D(t,n,r){var i;if(r&&r[t]||!r&&C(n.target,t))i=T(n,t),e(n.target).trigger(i);return i}function P(t){var n=e.data(t.target,s);if(!m&&(!E||E!==n)){var r=D("v"+t.type,t);r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation())}}function H(t){var n=x(t).touches,r,i;if(n&&n.length===1){r=t.target,i=N(r);if(i.hasVirtualBinding){E=w++,e.data(r,s,E),_(),O(),d=!1;var o=x(t).touches[0];h=o.pageX,p=o.pageY,D("vmouseover",t,i),D("vmousedown",t,i)}}}function B(e){if(g)return;d||D("vmousecancel",e,N(e.target)),d=!0,M()}function j(t){if(g)return;var n=x(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=N(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&D("vmousecancel",t,s),D("vmousemove",t,s),M()}function F(e){if(g)return;L();var t=N(e.target),n;D("vmouseup",e,t);if(!d){var r=D("vclick",e,t);r&&r.isDefaultPrevented()&&(n=x(e).changedTouches[0],v.push({touchID:E,x:n.clientX,y:n.clientY}),m=!0)}D("vmouseout",e,t),d=!1,M()}function I(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function q(){}function R(t){var n=t.substr(1);return{setup:function(r,s){I(this)||e.data(this,i,{});var o=e.data(this,i);o[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,P),e(this).bind(n,q),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",H).bind("touchend",F).bind("touchmove",j).bind("scroll",B))},teardown:function(r,s){--l[t],l[t]||b.unbind(n,P),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",H).unbind("touchmove",j).unbind("touchend",F).unbind("scroll",B));var o=e(this),u=e.data(this,i);u&&(u[t]=!1),o.unbind(n,q),I(this)||o.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(var U=0;U<o.length;U++)e.event.special[o[U]]=R(o[U]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,r){var i=r.type;r.type=n,e.event.dispatch.call(t,r),r.type=i}var i=e(n);e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)});var s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})}},e.event.special.tap={tapholdThreshold:750,setup:function(){var t=this,n=e(t);n.bind("vmousedown",function(r){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),s===e.target&&l(t,"tap",e)}if(r.which&&r.which!==1)return!1;var s=r.target,o=r.originalEvent,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){l(t,"taphold",e.Event("taphold",{target:s}))},e.event.special.tap.tapholdThreshold)})}},e.event.special.swipe={scrollSupressionThreshold:10,durationThreshold:1000,horizontalDistanceThreshold:10,verticalDistanceThreshold:475,start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t;return{time:(new Date).getTime(),coords:[n.pageX,n.pageY],origin:e(t.target)}},stop:function(e){var t=e.originalEvent.touches?e.originalEvent.touches[0]:e;return{time:(new Date).getTime(),coords:[t.pageX,t.pageY]}},handleSwipe:function(t,n){n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&t.origin.trigger("swipe").trigger(t.coords[0]>n.coords[0]?"swipeleft":"swiperight")},setup:function(){var t=this,n=e(t);n.bind(u,function(t){function o(t){if(!i)return;s=e.event.special.swipe.stop(t),Math.abs(i.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()}var i=e.event.special.swipe.start(t),s;n.bind(f,o).one(a,function(){n.unbind(f,o),i&&s&&e.event.special.swipe.handleSwipe(i,s),i=s=r})})}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)}}})}(e,this)});
// source --> http://www.quartierinterior.com/wp-content/plugins/photo-gallery/js/jquery.mCustomScrollbar.concat.min.js 
/*mousewheel*/
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/*custom scrollbar*/
(function(c){var b={init:function(e){var f={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,snapAmount:null,snapOffset:0,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true,normalizeMouseWheelDelta:false},contentTouchScroll:true,callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},e=c.extend(true,f,e);return this.each(function(){var m=c(this);if(e.set_width){m.css("width",e.set_width)}if(e.set_height){m.css("height",e.set_height)}if(!c(document).data("mCustomScrollbar-index")){c(document).data("mCustomScrollbar-index","1")}else{var t=parseInt(c(document).data("mCustomScrollbar-index"));c(document).data("mCustomScrollbar-index",t+1)}m.wrapInner("<div class='mCustomScrollBox mCS-"+e.theme+"' id='mCSB_"+c(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+c(document).data("mCustomScrollbar-index"));var g=m.children(".mCustomScrollBox");if(e.horizontalScroll){g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var k=g.children(".mCSB_h_wrapper");k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:k.children().outerWidth(),position:"relative"}).unwrap()}else{g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var o=g.children(".mCSB_container");if(c.support.touch){o.addClass("mCS_touch")}o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var l=g.children(".mCSB_scrollTools"),h=l.children(".mCSB_draggerContainer"),q=h.children(".mCSB_dragger");if(e.horizontalScroll){q.data("minDraggerWidth",q.width())}else{q.data("minDraggerHeight",q.height())}if(e.scrollButtons.enable){if(e.horizontalScroll){l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}g.bind("scroll",function(){if(!m.is(".mCS_disabled")){g.scrollTop(0).scrollLeft(0)}});m.data({mCS_Init:true,mCustomScrollbarIndex:c(document).data("mCustomScrollbar-index"),horizontalScroll:e.horizontalScroll,scrollInertia:e.scrollInertia,scrollEasing:"mcsEaseOut",mouseWheel:e.mouseWheel,mouseWheelPixels:e.mouseWheelPixels,autoDraggerLength:e.autoDraggerLength,autoHideScrollbar:e.autoHideScrollbar,snapAmount:e.snapAmount,snapOffset:e.snapOffset,scrollButtons_enable:e.scrollButtons.enable,scrollButtons_scrollType:e.scrollButtons.scrollType,scrollButtons_scrollSpeed:e.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:e.scrollButtons.scrollAmount,autoExpandHorizontalScroll:e.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:e.advanced.autoScrollOnFocus,normalizeMouseWheelDelta:e.advanced.normalizeMouseWheelDelta,contentTouchScroll:e.contentTouchScroll,onScrollStart_Callback:e.callbacks.onScrollStart,onScroll_Callback:e.callbacks.onScroll,onTotalScroll_Callback:e.callbacks.onTotalScroll,onTotalScrollBack_Callback:e.callbacks.onTotalScrollBack,onTotalScroll_Offset:e.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:e.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:e.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(e.horizontalScroll){if(m.css("max-width")!=="none"){if(!e.advanced.updateOnContentResize){e.advanced.updateOnContentResize=true}}}else{if(m.css("max-height")!=="none"){var s=false,r=parseInt(m.css("max-height"));if(m.css("max-height").indexOf("%")>=0){s=r,r=m.parent().height()*s/100}m.css("overflow","hidden");g.css("max-height",r)}}m.mCustomScrollbar("update");if(e.advanced.updateOnBrowserResize){var i,j=c(window).width(),u=c(window).height();c(window).bind("resize."+m.data("mCustomScrollbarIndex"),function(){if(i){clearTimeout(i)}i=setTimeout(function(){if(!m.is(".mCS_disabled")&&!m.is(".mCS_destroyed")){var w=c(window).width(),v=c(window).height();if(j!==w||u!==v){if(m.css("max-height")!=="none"&&s){g.css("max-height",m.parent().height()*s/100)}m.mCustomScrollbar("update");j=w;u=v}}},150)})}if(e.advanced.updateOnContentResize){var p;if(e.horizontalScroll){var n=o.outerWidth()}else{var n=o.outerHeight()}p=setInterval(function(){if(e.horizontalScroll){if(e.advanced.autoExpandHorizontalScroll){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var v=o.outerWidth()}else{var v=o.outerHeight()}if(v!=n){m.mCustomScrollbar("update");n=v}},300)}})},update:function(){var n=c(this),k=n.children(".mCustomScrollBox"),q=k.children(".mCSB_container");q.removeClass("mCS_no_scrollbar");n.removeClass("mCS_disabled mCS_destroyed");k.scrollTop(0).scrollLeft(0);var y=k.children(".mCSB_scrollTools"),o=y.children(".mCSB_draggerContainer"),m=o.children(".mCSB_dragger");if(n.data("horizontalScroll")){var A=y.children(".mCSB_buttonLeft"),t=y.children(".mCSB_buttonRight"),f=k.width();if(n.data("autoExpandHorizontalScroll")){q.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:q.outerWidth(),position:"relative"}).unwrap()}var z=q.outerWidth()}else{var w=y.children(".mCSB_buttonUp"),g=y.children(".mCSB_buttonDown"),r=k.height(),i=q.outerHeight()}if(i>r&&!n.data("horizontalScroll")){y.css("display","block");var s=o.height();if(n.data("autoDraggerLength")){var u=Math.round(r/i*s),l=m.data("minDraggerHeight");if(u<=l){m.css({height:l})}else{if(u>=s-10){var p=s-10;m.css({height:p})}else{m.css({height:u})}}m.children(".mCSB_dragger_bar").css({"line-height":m.height()+"px"})}var B=m.height(),x=(i-r)/(s-B);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().top);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{if(z>f&&n.data("horizontalScroll")){y.css("display","block");var h=o.width();if(n.data("autoDraggerLength")){var j=Math.round(f/z*h),C=m.data("minDraggerWidth");if(j<=C){m.css({width:C})}else{if(j>=h-10){var e=h-10;m.css({width:e})}else{m.css({width:j})}}}var v=m.width(),x=(z-f)/(h-v);n.data("scrollAmount",x).mCustomScrollbar("scrolling",k,q,o,m,w,g,A,t);var D=Math.abs(q.position().left);n.mCustomScrollbar("scrollTo",D,{scrollInertia:0,trigger:"internal"})}else{k.unbind("mousewheel focusin");if(n.data("horizontalScroll")){m.add(q).css("left",0)}else{m.add(q).css("top",0)}y.css("display","none");q.addClass("mCS_no_scrollbar");n.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(h,p,m,j,w,e,A,v){var k=c(this);if(!k.data("bindEvent_scrollbar_drag")){var n,o;if(c.support.msPointer){j.bind("MSPointerDown",function(H){H.preventDefault();k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");var G=c(this),J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;if(F<G.width()&&F>0&&I<G.height()&&I>0){n=I;o=F}});c(document).bind("MSPointerMove."+k.data("mCustomScrollbarIndex"),function(H){H.preventDefault();if(k.data("on_drag")){var G=j,J=G.offset(),F=H.originalEvent.pageX-J.left,I=H.originalEvent.pageY-J.top;D(n,o,I,F)}}).bind("MSPointerUp."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}else{j.bind("mousedown touchstart",function(H){H.preventDefault();H.stopImmediatePropagation();var G=c(this),K=G.offset(),F,J;if(H.type==="touchstart"){var I=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0];F=I.pageX-K.left;J=I.pageY-K.top}else{k.data({on_drag:true});j.addClass("mCSB_dragger_onDrag");F=H.pageX-K.left;J=H.pageY-K.top}if(F<G.width()&&F>0&&J<G.height()&&J>0){n=J;o=F}}).bind("touchmove",function(H){H.preventDefault();H.stopImmediatePropagation();var K=H.originalEvent.touches[0]||H.originalEvent.changedTouches[0],G=c(this),J=G.offset(),F=K.pageX-J.left,I=K.pageY-J.top;D(n,o,I,F)});c(document).bind("mousemove."+k.data("mCustomScrollbarIndex"),function(H){if(k.data("on_drag")){var G=j,J=G.offset(),F=H.pageX-J.left,I=H.pageY-J.top;D(n,o,I,F)}}).bind("mouseup."+k.data("mCustomScrollbarIndex"),function(x){k.data({on_drag:false});j.removeClass("mCSB_dragger_onDrag")})}k.data({bindEvent_scrollbar_drag:true})}function D(G,H,I,F){if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",(j.position().left-(H))+F,{moveDragger:true,trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",(j.position().top-(G))+I,{moveDragger:true,trigger:"internal"})}}if(c.support.touch&&k.data("contentTouchScroll")){if(!k.data("bindEvent_content_touch")){var l,B,r,s,u,C,E;p.bind("touchstart",function(x){x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this);r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;C=s;E=u});p.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();l=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];B=c(this).parent();r=B.offset();u=l.pageX-r.left;s=l.pageY-r.top;if(k.data("horizontalScroll")){k.mCustomScrollbar("scrollTo",E-u,{trigger:"internal"})}else{k.mCustomScrollbar("scrollTo",C-s,{trigger:"internal"})}})}}if(!k.data("bindEvent_scrollbar_click")){m.bind("click",function(F){var x=(F.pageY-m.offset().top)*k.data("scrollAmount"),y=c(F.target);if(k.data("horizontalScroll")){x=(F.pageX-m.offset().left)*k.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){k.mCustomScrollbar("scrollTo",x,{trigger:"internal",scrollEasing:"draggerRailEase"})}});k.data({bindEvent_scrollbar_click:true})}if(k.data("mouseWheel")){if(!k.data("bindEvent_mousewheel")){h.bind("mousewheel",function(H,J){var G,F=k.data("mouseWheelPixels"),x=Math.abs(p.position().top),I=j.position().top,y=m.height()-j.height();if(k.data("normalizeMouseWheelDelta")){if(J<0){J=-1}else{J=1}}if(F==="auto"){F=100+Math.round(k.data("scrollAmount")/2)}if(k.data("horizontalScroll")){I=j.position().left;y=m.width()-j.width();x=Math.abs(p.position().left)}if((J>0&&I!==0)||(J<0&&I!==y)){H.preventDefault();H.stopImmediatePropagation()}G=x-(J*F);k.mCustomScrollbar("scrollTo",G,{trigger:"internal"})});k.data({bindEvent_mousewheel:true})}}if(k.data("scrollButtons_enable")){if(k.data("scrollButtons_scrollType")==="pixels"){if(k.data("horizontalScroll")){v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_x:false});if(!k.data("bindEvent_buttonsPixels_x")){v.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)+k.data("scrollButtons_scrollAmount"))});A.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().left)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_x:true})}}else{e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",i,g);k.data({bindEvent_buttonsContinuous_y:false});if(!k.data("bindEvent_buttonsPixels_y")){e.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)+k.data("scrollButtons_scrollAmount"))});w.bind("click",function(x){x.preventDefault();q(Math.abs(p.position().top)-k.data("scrollButtons_scrollAmount"))});k.data({bindEvent_buttonsPixels_y:true})}}function q(x){if(!j.data("preventAction")){j.data("preventAction",true);k.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(k.data("horizontalScroll")){v.add(A).unbind("click");k.data({bindEvent_buttonsPixels_x:false});if(!k.data("bindEvent_buttonsContinuous_x")){v.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollRight:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var i=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollRight"))};v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",i);A.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollLeft:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().left)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var g=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollLeft"))};A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",g);k.data({bindEvent_buttonsContinuous_x:true})}}else{e.add(w).unbind("click");k.data({bindEvent_buttonsPixels_y:false});if(!k.data("bindEvent_buttonsContinuous_y")){e.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollDown:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)+x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var t=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollDown"))};e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",t);w.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=z();k.data({mCSB_buttonScrollUp:setInterval(function(){k.mCustomScrollbar("scrollTo",Math.abs(p.position().top)-x,{trigger:"internal",scrollEasing:"easeOutCirc"})},17)})});var f=function(x){x.preventDefault();clearInterval(k.data("mCSB_buttonScrollUp"))};w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",f);k.data({bindEvent_buttonsContinuous_y:true})}}function z(){var x=k.data("scrollButtons_scrollSpeed");if(k.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((k.data("scrollInertia")+100)/40)}return x}}}if(k.data("autoScrollOnFocus")){if(!k.data("bindEvent_focusin")){h.bind("focusin",function(){h.scrollTop(0).scrollLeft(0);var x=c(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var G=p.position().top,y=x.position().top,F=h.height()-x.outerHeight();if(k.data("horizontalScroll")){G=p.position().left;y=x.position().left;F=h.width()-x.outerWidth()}if(G+y<0||G+y>F){k.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});k.data({bindEvent_focusin:true})}}if(k.data("autoHideScrollbar")){if(!k.data("bindEvent_autoHideScrollbar")){h.bind("mouseenter",function(x){h.addClass("mCS-mouse-over");d.showScrollbar.call(h.children(".mCSB_scrollTools"))}).bind("mouseleave touchend",function(x){h.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){d.hideScrollbar.call(h.children(".mCSB_scrollTools"))}});k.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(e,f){var i=c(this),o={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:i.data("scrollInertia"),scrollEasing:i.data("scrollEasing")},f=c.extend(o,f),p,g=i.children(".mCustomScrollBox"),k=g.children(".mCSB_container"),r=g.children(".mCSB_scrollTools"),j=r.children(".mCSB_draggerContainer"),h=j.children(".mCSB_dragger"),t=draggerSpeed=f.scrollInertia,q,s,m,l;if(!k.hasClass("mCS_no_scrollbar")){i.data({mCS_trigger:f.trigger});if(i.data("mCS_Init")){f.callbacks=false}if(e||e===0){if(typeof(e)==="number"){if(f.moveDragger){p=e;if(i.data("horizontalScroll")){e=h.position().left*i.data("scrollAmount")}else{e=h.position().top*i.data("scrollAmount")}draggerSpeed=0}else{p=e/i.data("scrollAmount")}}else{if(typeof(e)==="string"){var v;if(e==="top"){v=0}else{if(e==="bottom"&&!i.data("horizontalScroll")){v=k.outerHeight()-g.height()}else{if(e==="left"){v=0}else{if(e==="right"&&i.data("horizontalScroll")){v=k.outerWidth()-g.width()}else{if(e==="first"){v=i.find(".mCSB_container").find(":first")}else{if(e==="last"){v=i.find(".mCSB_container").find(":last")}else{v=i.find(e)}}}}}}if(v.length===1){if(i.data("horizontalScroll")){e=v.position().left}else{e=v.position().top}p=e/i.data("scrollAmount")}else{p=e=v}}}if(i.data("horizontalScroll")){if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.width()-k.outerWidth()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollLeft"));if(!s){q=true}}else{if(p>=j.width()-h.width()){p=j.width()-h.width();e=g.width()-k.outerWidth();clearInterval(i.data("mCSB_buttonScrollRight"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"left",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"left",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().left>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().left<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}else{if(i.data("onTotalScrollBack_Offset")){s=-i.data("onTotalScrollBack_Offset")}if(i.data("onTotalScroll_Offset")){l=g.height()-k.outerHeight()+i.data("onTotalScroll_Offset")}if(p<0){p=e=0;clearInterval(i.data("mCSB_buttonScrollUp"));if(!s){q=true}}else{if(p>=j.height()-h.height()){p=j.height()-h.height();e=g.height()-k.outerHeight();clearInterval(i.data("mCSB_buttonScrollDown"));if(!l){m=true}}else{e=-e}}var n=i.data("snapAmount");if(n){e=Math.round(e/n)*n-i.data("snapOffset")}d.mTweenAxis.call(this,h[0],"top",Math.round(p),draggerSpeed,f.scrollEasing);d.mTweenAxis.call(this,k[0],"top",Math.round(e),t,f.scrollEasing,{onStart:function(){if(f.callbacks&&!i.data("mCS_tweenRunning")){u("onScrollStart")}if(i.data("autoHideScrollbar")){d.showScrollbar.call(r)}},onUpdate:function(){if(f.callbacks){u("whileScrolling")}},onComplete:function(){if(f.callbacks){u("onScroll");if(q||(s&&k.position().top>=s)){u("onTotalScrollBack")}if(m||(l&&k.position().top<=l)){u("onTotalScroll")}}h.data("preventAction",false);i.data("mCS_tweenRunning",false);if(i.data("autoHideScrollbar")){if(!g.hasClass("mCS-mouse-over")){d.hideScrollbar.call(r)}}}})}if(i.data("mCS_Init")){i.data({mCS_Init:false})}}}function u(w){this.mcs={top:k.position().top,left:k.position().left,draggerTop:h.position().top,draggerLeft:h.position().left,topPct:Math.round((100*Math.abs(k.position().top))/Math.abs(k.outerHeight()-g.height())),leftPct:Math.round((100*Math.abs(k.position().left))/Math.abs(k.outerWidth()-g.width()))};switch(w){case"onScrollStart":i.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(i,this.mcs);break;case"whileScrolling":i.data("whileScrolling_Callback").call(i,this.mcs);break;case"onScroll":i.data("onScroll_Callback").call(i,this.mcs);break;case"onTotalScrollBack":i.data("onTotalScrollBack_Callback").call(i,this.mcs);break;case"onTotalScroll":i.data("onTotalScroll_Callback").call(i,this.mcs);break}}},stop:function(){var g=c(this),e=g.children().children(".mCSB_container"),f=g.children().children().children().children(".mCSB_dragger");d.mTweenAxisStop.call(this,e[0]);d.mTweenAxisStop.call(this,f[0])},disable:function(e){var j=c(this),f=j.children(".mCustomScrollBox"),h=f.children(".mCSB_container"),g=f.children(".mCSB_scrollTools"),i=g.children().children(".mCSB_dragger");f.unbind("mousewheel focusin mouseenter mouseleave touchend");h.unbind("touchstart touchmove");if(e){if(j.data("horizontalScroll")){i.add(h).css("left",0)}else{i.add(h).css("top",0)}}g.css("display","none");h.addClass("mCS_no_scrollbar");j.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var e=c(this);e.removeClass("mCustomScrollbar _mCS_"+e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();c(document).unbind("mousemove."+e.data("mCustomScrollbarIndex")+" mouseup."+e.data("mCustomScrollbarIndex")+" MSPointerMove."+e.data("mCustomScrollbarIndex")+" MSPointerUp."+e.data("mCustomScrollbarIndex"));c(window).unbind("resize."+e.data("mCustomScrollbarIndex"))}},d={showScrollbar:function(){this.stop().animate({opacity:1},"fast")},hideScrollbar:function(){this.stop().animate({opacity:0},"fast")},mTweenAxis:function(g,i,h,f,o,y){var y=y||{},v=y.onStart||function(){},p=y.onUpdate||function(){},w=y.onComplete||function(){};var n=t(),l,j=0,r=g.offsetTop,s=g.style;if(i==="left"){r=g.offsetLeft}var m=h-r;q();e();function t(){if(window.performance&&window.performance.now){return window.performance.now()}else{if(window.performance&&window.performance.webkitNow){return window.performance.webkitNow()}else{if(Date.now){return Date.now()}else{return new Date().getTime()}}}}function x(){if(!j){v.call()}j=t()-n;u();if(j>=g._time){g._time=(j>g._time)?j+l-(j-g._time):j+l-1;if(g._time<j+1){g._time=j+1}}if(g._time<f){g._id=_request(x)}else{w.call()}}function u(){if(f>0){g.currVal=k(g._time,r,m,f,o);s[i]=Math.round(g.currVal)+"px"}else{s[i]=h+"px"}p.call()}function e(){l=1000/60;g._time=j+l;_request=(!window.requestAnimationFrame)?function(z){u();return setTimeout(z,0.01)}:window.requestAnimationFrame;g._id=_request(x)}function q(){if(g._id==null){return}if(!window.requestAnimationFrame){clearTimeout(g._id)}else{window.cancelAnimationFrame(g._id)}g._id=null}function k(B,A,F,E,C){switch(C){case"linear":return F*B/E+A;break;case"easeOutQuad":B/=E;return -F*B*(B-2)+A;break;case"easeInOutQuad":B/=E/2;if(B<1){return F/2*B*B+A}B--;return -F/2*(B*(B-2)-1)+A;break;case"easeOutCubic":B/=E;B--;return F*(B*B*B+1)+A;break;case"easeOutQuart":B/=E;B--;return -F*(B*B*B*B-1)+A;break;case"easeOutQuint":B/=E;B--;return F*(B*B*B*B*B+1)+A;break;case"easeOutCirc":B/=E;B--;return F*Math.sqrt(1-B*B)+A;break;case"easeOutSine":return F*Math.sin(B/E*(Math.PI/2))+A;break;case"easeOutExpo":return F*(-Math.pow(2,-10*B/E)+1)+A;break;case"mcsEaseOut":var D=(B/=E)*B,z=D*B;return A+F*(0.499999999999997*z*D+-2.5*D*D+5.5*z+-6.5*D+4*B);break;case"draggerRailEase":B/=E/2;if(B<1){return F/2*B*B*B+A}B-=2;return F/2*(B*B*B+2)+A;break}}},mTweenAxisStop:function(e){if(e._id==null){return}if(!window.requestAnimationFrame){clearTimeout(e._id)}else{window.cancelAnimationFrame(e._id)}e._id=null},rafPolyfill:function(){var f=["ms","moz","webkit","o"],e=f.length;while(--e>-1&&!window.requestAnimationFrame){window.requestAnimationFrame=window[f[e]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[e]+"CancelAnimationFrame"]||window[f[e]+"CancelRequestAnimationFrame"]}}};d.rafPolyfill.call();c.support.touch=!!("ontouchstart" in window);c.support.msPointer=window.navigator.msPointerEnabled;var a=("https:"==document.location.protocol)?"https:":"http:";c.event.special.mousewheel||document.write('<script src="'+a+'//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');c.fn.mCustomScrollbar=function(e){if(b[e]){return b[e].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof e==="object"||!e){return b.init.apply(this,arguments)}else{c.error("Method "+e+" does not exist")}}}})(jQuery);
// source --> http://www.quartierinterior.com/wp-content/plugins/photo-gallery/js/jquery.fullscreen-0.4.1.min.js 
/*
 * jQuery.fullscreen library v0.4.0
 * Copyright (c) 2013 Vladimir Zhuravlev
 *
 * @license https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: Wed Dec 11 22:45:17 ICT 2013
 **/
;(function($) {

function defined(a) {
	return typeof a !== 'undefined';
}

function extend(child, parent, prototype) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
	parent.prototype.constructor = parent;
    child._super = parent.prototype;
    if (prototype) {
        $.extend(child.prototype, prototype);
    }
}

var SUBST = [
    ['', ''],               /* spec*/
    ['exit', 'cancel'],     /* firefox & old webkits expect cancelFullScreen instead of exitFullscreen*/
    ['screen', 'Screen']    /* firefox expects FullScreen instead of Fullscreen*/
];

var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];

function native(obj, name) {
    var prefixed;

    if (typeof obj === 'string') {
        name = obj;
        obj = document;
    }

    for (var i = 0; i < SUBST.length; ++i) {
        name = name.replace(SUBST[i][0], SUBST[i][1]);
        for (var j = 0; j < VENDOR_PREFIXES.length; ++j) {
            prefixed = VENDOR_PREFIXES[j];
            prefixed += j === 0 ? name : name.charAt(0).toUpperCase() + name.substr(1);
            if (defined(obj[prefixed])) {
                return obj[prefixed];
            }
        }
    }

    return void 0;
}var ua = navigator.userAgent;
var fsEnabled = native('fullscreenEnabled');
var IS_ANDROID_CHROME = ua.indexOf('Android') !== -1 && ua.indexOf('Chrome') !== -1; 
var IS_NATIVELY_SUPPORTED = 
		!IS_ANDROID_CHROME &&
		 defined(native('fullscreenElement')) && 
		(!defined(fsEnabled) || fsEnabled === true);

var version = $.fn.jquery.split('.');
var JQ_LT_17 = (parseInt(version[0]) < 2 && parseInt(version[1]) < 7);

var FullScreenAbstract = function() {
	this.__options = null;
	this._fullScreenElement = null;
	this.__savedStyles = {};
};

FullScreenAbstract.prototype = {
	_DEFAULT_OPTIONS: {
		styles: {
			'boxSizing': 'border-box',
			'MozBoxSizing': 'border-box',
			'WebkitBoxSizing': 'border-box'
		},
		toggleClass: null
	},
	__documentOverflow: '',
	__htmlOverflow: '',
	_preventDocumentScroll: function() {
		this.__documentOverflow = $('body')[0].style.overflow;
		this.__htmlOverflow = $('html')[0].style.overflow;
		/* $('body, html').css('overflow', 'hidden');*/
	},
	_allowDocumentScroll: function() {
		/* $('body')[0].style.overflow = this.__documentOverflow;*/
		/* $('html')[0].style.overflow = this.__htmlOverflow; */
	},
	_fullScreenChange: function() {
		if (!this.isFullScreen()) {
			this._allowDocumentScroll();
			this._revertStyles();
			this._triggerEvents();
			this._fullScreenElement = null;
		} else {
			this._preventDocumentScroll();
			this._triggerEvents();
		}
	},
	_fullScreenError: function(e) {
		this._revertStyles();
		this._fullScreenElement = null;
		if (e) {
			$(document).trigger('fscreenerror', [e]);
		}
	},
	_triggerEvents: function() {
		$(this._fullScreenElement).trigger(this.isFullScreen() ? 'fscreenopen' : 'fscreenclose');
		$(document).trigger('fscreenchange', [this.isFullScreen(), this._fullScreenElement]);
	},
	_saveAndApplyStyles: function() {
		var $elem = $(this._fullScreenElement);
		this.__savedStyles = {};
		for (var property in this.__options.styles) {
			/* save */
			this.__savedStyles[property] = this._fullScreenElement.style[property];
			/* apply */
			this._fullScreenElement.style[property] = this.__options.styles[property];
		}
		if (this.__options.toggleClass) {
			$elem.addClass(this.__options.toggleClass);
		}
	},
	_revertStyles: function() {
		var $elem = $(this._fullScreenElement);
		for (var property in this.__options.styles) {
			this._fullScreenElement.style[property] = this.__savedStyles[property];
		}
		if (this.__options.toggleClass) {
			$elem.removeClass(this.__options.toggleClass);
		}
	},
	open: function(elem, options) {
		/* do nothing if request is for already fullscreened element */
		if (elem === this._fullScreenElement) {
			return;
		}
		/* exit active fullscreen before opening another one */
		if (this.isFullScreen()) {
			this.exit();
		}
		/* save fullscreened element */
		this._fullScreenElement = elem;
		/* apply options, if any */
		this.__options = $.extend(true, {}, this._DEFAULT_OPTIONS, options);
		/* save current element styles and apply new */
		this._saveAndApplyStyles();
	},
	exit: null,
	isFullScreen: null,
	isNativelySupported: function() {
		return IS_NATIVELY_SUPPORTED;
	}
};
var FullScreenNative = function() {
	FullScreenNative._super.constructor.apply(this, arguments);
	this.exit = $.proxy(native('exitFullscreen'), document);
	this._DEFAULT_OPTIONS = $.extend(true, {}, this._DEFAULT_OPTIONS, {
		'styles': {
			'width': '100%',
			'height': '100%'
		}
	});
	$(document)
		.bind(this._prefixedString('fullscreenchange') + ' MSFullscreenChange', $.proxy(this._fullScreenChange, this))
		.bind(this._prefixedString('fullscreenerror') + ' MSFullscreenError', $.proxy(this._fullScreenError, this));
};

extend(FullScreenNative, FullScreenAbstract, {
	VENDOR_PREFIXES: ['', 'o', 'moz', 'webkit'],
	_prefixedString: function(str) {
		return $.map(this.VENDOR_PREFIXES, function(s) {
			return s + str;
		}).join(' ');
	},
	open: function(elem, options) {
		FullScreenNative._super.open.apply(this, arguments);
		var requestFS = native(elem, 'requestFullscreen');
		requestFS.call(elem);
	},
	exit: $.noop,
	isFullScreen: function() {
		return native('fullscreenElement') !== null;
	},
	element: function() {
		return native('fullscreenElement');
	}
});
var FullScreenFallback = function() {
	FullScreenFallback._super.constructor.apply(this, arguments);
	this._DEFAULT_OPTIONS = $.extend({}, this._DEFAULT_OPTIONS, {
		'styles': {
			'position': 'fixed',
			'zIndex': '2147483647',
			'left': 0,
			'top': 0,
			'bottom': 0,
			'right': 0
		}
	});
	this.__delegateKeydownHandler();
};

extend(FullScreenFallback, FullScreenAbstract, {
	__isFullScreen: false,
	__delegateKeydownHandler: function() {
		var $doc = $(document);
		$doc.delegate('*', 'keydown.fullscreen', $.proxy(this.__keydownHandler, this));
		var data = JQ_LT_17 ? $doc.data('events') : $._data(document).events;
		var events = data['keydown'];
		if (!JQ_LT_17) {
			events.splice(0, 0, events.splice(events.delegateCount - 1, 1)[0]);
		} else {
			data.live.unshift(data.live.pop());
		}
	},
	__keydownHandler: function(e) {
		if (this.isFullScreen() && e.which === 27) {
			this.exit();
			return false;
		}
		return true;
	},
	_revertStyles: function() {
		FullScreenFallback._super._revertStyles.apply(this, arguments);
		/* force redraw (fixes bug in IE7 with content dissapearing) */
		this._fullScreenElement.offsetHeight;
	},
	open: function(elem) {
		FullScreenFallback._super.open.apply(this, arguments);
		this.__isFullScreen = true;
		this._fullScreenChange();
	},
	exit: function() {
		this.__isFullScreen = false;
		this._fullScreenChange();
	},
	isFullScreen: function() {
		return this.__isFullScreen;
	},
	element: function() {
		return this.__isFullScreen ? this._fullScreenElement : null;
	}
});$.fullscreen = IS_NATIVELY_SUPPORTED 
				? new FullScreenNative() 
				: new FullScreenFallback();

$.fn.fullscreen = function(options) {
	var elem = this[0];

	options = $.extend({
		toggleClass: null,
		/* overflow: 'hidden'*/
	}, options);
	options.styles = {
		/* overflow: options.overflow */
	};
	/* delete options.overflow; */

	if (elem) {
		$.fullscreen.open(elem, options);
	}

	return this;
};
})(jQuery);