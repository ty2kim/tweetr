$(document).ready(function () {
  $('section').on('click', 'article footer .fa-heart', function (event) {
    $(this).toggleClass('like');
  });

  $('section').on('mouseenter', 'article footer .fa-heart', function (event) {
    $(this).addClass('hover_like');
  });

  $('section').on('mouseleave', 'article footer .fa-heart', function (event) {
    $(this).removeClass('hover_like');
  });
});
