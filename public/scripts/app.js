/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('.new-tweet').on('submit', 'form', function (event) {
    event.preventDefault();
    var counter = +$(this).find('.counter').text();
    var $text = $(this).find('textarea');
    if (counter < 0) {
      alert('maximum tweet is 140');
    } else if (!$text.val()) {
      alert('you didn\'t write anything');
    } else {
      var queryStr = $text.serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryStr,
        success: loadTweets(),
      });
    }
  });

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    tweets.forEach(function (tweet) {
      var $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    });

    // faster way
    // createTweetElement returns list of tweets(html) using map
    // $('#tweets-container').append(tweets.join(''));
  }

  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');
    var $header = $('<header>');
    var $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.regular);
    var $name = $('<h2>').addClass('name').text(tweet.user.name);
    var $handle = $('<span>').addClass('handle').text(tweet.user.handle);
    var $tweetText = $('<p>').addClass('tweet-text').text(tweet.content.text);
    var $footer = $('<footer>');
    var today = new Date();
    var dateCreated = new Date(tweet.created_at);
    var diffDays = Math.round((today - dateCreated) / 86400000);
    var $daysAgo = $('<span>').addClass('days-ago').text(diffDays + ' days ago');
    var $social = $('<img>').addClass('social').attr('src', '/images/social.png');
    $header.append($avatar).append($name).append($handle);
    $footer.append($daysAgo).append($social);
    $tweet.append($header).append($tweetText).append($footer);
    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        renderTweets(tweets);
      },
    });
  }

  loadTweets();
});
