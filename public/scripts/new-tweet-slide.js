$(document).ready(function () {
  $('.new-tweet').hide();
  $('.button').on('click', function () {
    $('.new-tweet').slideToggle();
    $('.new-tweet').find('textarea').focus();
  });
});
