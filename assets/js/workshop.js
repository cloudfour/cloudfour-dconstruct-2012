$(document).ready(function() {
  $('div.slide').each(function() {
    var figureCount = $(this).find('div.figure').length;
    var stuffCount  = $(this).children().not('h1, h2, h3, h4, h5, h6, div.figure').length;
    $(this).addClass('figures-' + figureCount).addClass('stuff-' + stuffCount);
    $(this).toggleClass('stuff', (stuffCount > 0)).toggleClass('no-stuff', (stuffCount === 0));
    $(this).toggleClass('figures', (figureCount > 0)).toggleClass('no-figures', (figureCount === 0));
  });
});