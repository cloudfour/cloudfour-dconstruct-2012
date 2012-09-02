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
        glossHolderSelector     = '#glossHolder',
        storage,
        popupWidth;

    var showGloss = function($glossItem, glossId) {
      var $content, $popup, top, left;   
      popupWidth     = viewportSize().width - 30;
      popupWidth     = (popupWidth > 500) ? 500 : popupWidth;
      $content       = $('#' + glossId).html();
        if (storage.supported() && !storage.has(glossId)) {
          $('.saveBox').addClass('active')
          $('.glossSaveButton').data('saveGloss', glossId).one('click', function() {
            saveGloss($(this).data('saveGloss'));
          });
        } else {
          $('.saveBox').removeClass('active');
        }
        $popup = $(glossHolderSelector);
        $popup.find('.glossContent').html($content);
        top    = (($(window).height() - $popup.height()) / 2) + $(window).scrollTop() + 'px';
        left   = (($(window).width() - popupWidth) / 2) + $(window).scrollLeft() + 'px';
        $popup.css( { left: left, top: top, width: popupWidth + 'px' }).show();
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

      var glosses, glossTemplate;
      storage           = new GlossStorage();
      showSavedGlosses();

      glossTemplate = '<div id="glossHolder"><div class="glossTitle"><h3>Glossary</h3></div>';
      glossTemplate += '<div class="glossContent"></div><div class="glossButtons">';
      glossTemplate += '<div class="buttonBox"><button class="glossButton glossCloseButton">Close</button></div>';
      glossTemplate += '<div class="buttonBox saveBox"><button class="glossButton glossSaveButton">Save</button></div></div></div>';
      $(glossTemplate).css('display', 'none').appendTo('body');
      $('.glossButton').click(function() { $(glossHolderSelector).hide(); });

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