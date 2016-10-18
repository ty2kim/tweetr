$(document).ready(function () {
  $('.new-tweet').on('keyup', 'textarea', function () {
    var max = 140;
    var counter = $(this).closest('.new-tweet').find('.counter');
    var now = $(this).val().length;
    var diff = max - now;
    if (diff < 0) {
      counter.addClass('exceed-limit');
    } else {
      counter.removeClass('exceed-limit');
    }

    counter.text(diff);
  });
});
