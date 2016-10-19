$(document).ready(function () {
  $('.tweet').hover(function (event) {
    $(this).find('.social').toggle();
  }).mouseenter(function (event) {
    $(this).addClass('hover');
  }).mouseleave(function (event) {
    $(this).removeClass('hover');
  });
});
