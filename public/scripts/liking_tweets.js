$(document).ready(function () {
  $('section').on('click', 'article footer .fa-heart', function (event) {
    $(this).toggleClass('liked');
    var $tweetId = $(this).closest('article').data('tweet_id');
    var $likes = $(this).closest('footer').find('.likes');
    var numLikes = $likes.data('num_likes');
    $(this).hasClass('liked') ? numLikes++ : numLikes--;
    $likes.data('num_likes', numLikes);
    $likes.text(numLikes + ' likes');
    var jsonData = { tweet_id: $tweetId, num_likes: numLikes };
    $.ajax({
      url: '/tweets',
      method: 'PUT',
      data: jsonData,
      success: function () {
        console.log('success');
      },
    });
  });

  $('section').on('mouseenter', 'article footer .fa-heart', function (event) {
    $(this).addClass('hover_like');
  });

  $('section').on('mouseleave', 'article footer .fa-heart', function (event) {
    $(this).removeClass('hover_like');
  });
});
