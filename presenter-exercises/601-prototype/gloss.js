/*
 * jQuery Messi Plugin 1.2
 * http://marcosesperon.es/apps/messi/
 *
 * Copyright 2012, Marcos EsperÃ³n
 * http://marcosesperon.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
function Messi(a,b){var c=this;c.options=jQuery.extend({},Messi.prototype.options,b||{});c.messi=jQuery(c.template);c.setContent(a);if(c.options.title==null){jQuery(".messi-titlebox",c.messi).remove()}else{jQuery(".messi-title",c.messi).append(c.options.title);if(c.options.buttons.length===0&&!c.options.autoclose){if(c.options.closeButton){var d=jQuery('<span class="messi-closebtn"></span>');d.bind("click",function(){c.hide()});jQuery(".messi-titlebox",this.messi).prepend(d)}}if(c.options.titleClass!=null)jQuery(".messi-titlebox",this.messi).addClass(c.options.titleClass)}if(c.options.width!=null)jQuery(".messi-box",c.messi).css("width",c.options.width);if(c.options.buttons.length>0){for(var e=0;e<c.options.buttons.length;e++){var f=c.options.buttons[e].btnClass?c.options.buttons[e].btnClass:"";var g=c.options.buttons[e].val?c.options.buttons[e].val:"";var h=jQuery('<div class="btnbox"><button class="btn '+f+'" href="#">'+c.options.buttons[e].label+"</button></div>").data("value",g);h.bind("click",function(){var a=jQuery.data(this,"value");var b=c.options.callback!=null?function(){c.options.callback(a)}:null;c.hide(b)});jQuery(".messi-actions",this.messi).append(h)}}else{jQuery(".messi-footbox",this.messi).remove()}if(c.options.buttons.length===0&&c.options.title==null&&!c.options.autoclose){if(c.options.closeButton){var d=jQuery('<span class="messi-closebtn"></span>');d.bind("click",function(){c.hide()});jQuery(".messi-content",this.messi).prepend(d)}}c.modal=c.options.modal?jQuery('<div class="messi-modal"></div>').css({opacity:c.options.modalOpacity,width:jQuery(document).width(),height:jQuery(document).height(),"z-index":c.options.zIndex+jQuery(".messi").length}).appendTo(document.body):null;if(c.options.show)c.show();jQuery(window).bind("resize",function(){c.resize()});if(c.options.autoclose!=null){setTimeout(function(a){a.hide()},c.options.autoclose,this)}return c}Messi.prototype={options:{autoclose:null,buttons:[],callback:null,center:true,closeButton:true,height:"auto",title:null,titleClass:null,modal:false,modalOpacity:.2,padding:"10px",show:true,unload:true,viewport:{top:"0px",left:"0px"},width:"500px",zIndex:99999},template:'<div class="messi"><div class="messi-box"><div class="messi-wrapper"><div class="messi-titlebox"><span class="messi-title"></span></div><div class="messi-content"></div><div class="messi-footbox"><div class="messi-actions"></div></div></div></div></div>',content:"<div></div>",visible:false,setContent:function(a){jQuery(".messi-content",this.messi).css({padding:this.options.padding,height:this.options.height}).empty().append(a)},viewport:function(){return{top:(jQuery(window).height()-this.messi.height())/2+jQuery(window).scrollTop()+"px",left:(jQuery(window).width()-this.messi.width())/2+jQuery(window).scrollLeft()+"px"}},show:function(){if(this.visible)return;if(this.options.modal&&this.modal!=null)this.modal.show();this.messi.appendTo(document.body);if(this.options.center)this.options.viewport=this.viewport(jQuery(".messi-box",this.messi));this.messi.css({top:this.options.viewport.top,left:this.options.viewport.left,"z-index":this.options.zIndex+jQuery(".messi").length}).show().animate({opacity:1},300);this.visible=true},hide:function(a){if(!this.visible)return;var b=this;this.messi.animate({opacity:0},300,function(){if(b.options.modal&&b.modal!=null)b.modal.remove();b.messi.css({display:"none"}).remove();b.visible=false;if(a)a.call();if(b.options.unload)b.unload()});return this},resize:function(){if(this.options.modal){jQuery(".messi-modal").css({width:jQuery(document).width(),height:jQuery(document).height()})}if(this.options.center){this.options.viewport=this.viewport(jQuery(".messi-box",this.messi));this.messi.css({top:this.options.viewport.top,left:this.options.viewport.left})}},toggle:function(){this[this.visible?"hide":"show"]();return this},unload:function(){if(this.visible)this.hide();jQuery(window).unbind("resize",this.resize());this.messi.remove()}};jQuery.extend(Messi,{alert:function(a,b,c){var d=c.btnText?c.btnText:"OK";var e=[{id:"ok",label:d}];c=jQuery.extend({closeButton:false,modal:true,buttons:e,callback:function(){}},c||{},{show:true,unload:true,callback:b});return new Messi(a,c)},ask:function(a,b,c){var d=c.btnYesText?c.btnYesText:"Yes";var e=c.btnNoText?c.btnNoText:"No";var f=[{id:"yes",label:d,val:"Y",btnClass:"btn-success"},{id:"no",label:e,val:"N",btnClass:"btn-danger"}];c=jQuery.extend({closeButton:false,modal:true,buttons:f,callback:function(){}},c||{},{show:true,unload:true,callback:b});return new Messi(a,c)},img:function(a,b){var c=new Image;jQuery(c).load(function(){var a={width:jQuery(window).width()-50,height:jQuery(window).height()-50};var d=this.width>a.width||this.height>a.height?Math.min(a.width/this.width,a.height/this.height):1;jQuery(c).css({width:this.width*d,height:this.height*d});b=jQuery.extend(b||{},{show:true,unload:true,closeButton:true,width:this.width*d,height:this.height*d,padding:0});new Messi(c,b)}).error(function(){console.log("Error loading "+a)}).attr("src",a)},load:function(a,b){b=jQuery.extend(b||{},{show:true,unload:true});var c={url:a,dataType:"html",cache:false,error:function(a,b,c){console.log(a.responseText)},success:function(a){new Messi(a,b)}};jQuery.ajax(c)}});

(function($) {
  function GlossStorage() {
    var savedGlosses  = [],
        glossKey      = 'glosses';

    this.supported = function() {
      return (typeof JSON != 'undefined'
                && typeof JSON.stringify      != 'undefined' 
                && typeof window.localStorage != 'undefined');
    };
    this.save = function(gloss) {
      if (!this.has(gloss)) {
        savedGlosses[savedGlosses.length] = gloss;
        localStorage.setItem(glossKey, JSON.stringify(savedGlosses));
        return savedGlosses;
      }
    };
    this.has = function(gloss) {
      for (var i = 0; i < savedGlosses.length; i++) {
        if (savedGlosses[i] == gloss) {
          return true;
        }
      }
      return false;
    };
    this.all    = function() { return savedGlosses; };
    this.clear  = function() {
      savedGlosses = [];
      localStorage.removeItem(glossKey);
      return savedGlosses;
    }; 
    if (this.supported()) {
      savedGlosses = [];
      if (localStorage.getItem(glossKey)) {
        savedGlosses = JSON.parse(localStorage.getItem(glossKey));
      }
    }
  };

  $.fn.gloss = function() {
    var glossarySelector        = '.glossary',
        glossDefinitionSelector = '.glossary-entry',
        glossItemSelector       = 'span.gloss-item',
        savedBeforeSelector     = 'body',
        glossClass              = 'gloss-item',
        savedGlossClass         = 'gloss-item-saved',
        savedGlossesSelector    = 'div.saved-glosses',
        storage,
        popupWidth;

    var showGloss = function($glossItem, glossId) {
      var $content, buttons;    
      popupWidth     = viewportSize().width - 30;
      popupWidth     = (popupWidth > 500) ? 500 : popupWidth;
      $content       = $('#' + glossId).html();
        buttons      = [ { label: 'Close' } ];
        if (storage.supported() && !storage.has(glossId)) {
          buttons[1] = { id: 'save-' + glossId, 
            label       : 'Save', 
            val         : glossId, 
            btnClass    : 'btn-success' 
          };
        }
        new Messi($content,
          { title      : 'Glossary', 
            modal      : true, 
            width      : popupWidth + 'px',
            buttons    : buttons,
            callback   : function(val) { if (val) { saveGloss(val); } } 
          } 
        );
    };
    var saveGloss = function(val) {
      var glosses = storage.save(val);
      showSavedGlosses();
      $('span[data-gloss="' + val + '"]').addClass(savedGlossClass);
    };
    var showSavedGlosses = function() {
      var glosses,
          $list,
          $savedWrapper;
      glosses = storage.all();
      if (!glosses.length) {
        return;
      }
      $list = buildSavedList(glosses);
      if (!$(savedGlossesSelector).length) {
        $savedWrapper = $('<div></div>').addClass('saved-glosses').html('<h3>Saved Items</h3>');
        $savedWrapper.append($list).prependTo($(savedBeforeSelector));
        $(savedGlossesSelector + ' h3').click(function() {
          $(savedGlossesSelector).toggleClass('open').find('dl').slideToggle('fast');
        });
      } else {
        $(savedGlossesSelector + ' dl').replaceWith($list)
        $(savedGlossesSelector + ' dl').toggle($(savedGlossesSelector).hasClass('open'));
      }
    };
    var buildSavedList = function(glosses) {
      var $list, $remove, glossId, $content, $d, $dtContent, $dd, $definition;
      $list        = $('<dl></dl>').addClass('saved-glosses');
      for(var i = 0; i < glosses.length; i++) {
        glossId    = glosses[i];
        $content   = $("#" + glossId).html();
        $dtContent = '';
        $('span[data-gloss="' + glossId + '"]').each(function() {
          $definition = $(this).clone();
          $definition.find('sup').remove(); // TODO: spaces
          $dtContent += $definition.html();
        });
        $dt = $('<dt></dt>').html($dtContent);
        $dd = $('<dd></dd>').attr('id', 'saved-' + glossId).html($content);
        $list.append($dt).append($dd);
      }
      $remove = $('<dt></dt>').addClass('remove-glosses').html('Clear All').click(function() {
        clearGlosses();
      });
      $list.append($remove);
      return $list;
    };
    var clearGlosses = function() {
      storage.clear();
      $(glossItemSelector).removeClass(savedGlossClass);
      $(savedGlossesSelector).fadeOut(500, function() { $(savedGlossesSelector).remove(); });
    };
    var viewportSize = function() {
      return { width: window.innerWidth || 
          (document.documentElement || document.body).clientWidth, 
         height: window.innerHeight || 
          (document.documentElement || document.body).clientHeight};
    };
    var init            = function() {
      var glosses;
      storage           = new GlossStorage();
      showSavedGlosses();
      $(glossarySelector).find(glossDefinitionSelector).each(function() {
        var glossId     = $(this).attr('id'),
            $glossItems = $('[data-gloss ="' + glossId + '"]');
        $glossItems.addClass(glossClass).toggleClass(savedGlossClass, storage.has(glossId));
        $glossItems.click(function(event) { showGloss($(this), glossId); });
      });
    }();
  }
})( jQuery );

$(document).ready(function() {
  $('.scene').gloss();
});