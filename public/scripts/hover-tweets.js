$(document).ready(function () {
  $('.tweet').hover(function (event) {
    $(this).find('.like').toggle();
  });

});
