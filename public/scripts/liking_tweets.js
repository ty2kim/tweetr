$(document).ready(function () {
  $('section').on('click', 'article footer .fa-heart', function (event) {
    $(this).toggleClass('liked');
    //var $tweet = $(this).closest('.tweet');
    //var curLikes = $tweet.data('likes');


    // use awesome font for 'like'
    // think of a way to use custome data
    // what should be the url for this (REST)

    // var nextLikes = $(this).closest('.tweet').data('likes') + 1;
    // $.ajax({
    //   url: '/tweets',
    //   method: 'PUT',
    //   data: nextLikes,
    // });
  });

  $('section').on('mouseenter', 'article footer .fa-heart', function (event) {
    $(this).addClass('hover_like');
  });

  $('section').on('mouseleave', 'article footer .fa-heart', function (event) {
    $(this).removeClass('hover_like');
  });
});
