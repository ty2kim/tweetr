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

  function renderTweets(data) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#tweets-container').html('');
    var list = [];
    data.forEach(function (user) {
      var $tweet = createTweetElement(user);
      list.push($tweet);
    });

    // lower created_at, old tweet
    list.reverse().forEach(function (tweet) {
      $('#tweets-container').append(tweet);
    });

    // faster way
    // createTweetElement returns list of tweets(html) using map
    // $('#tweets-container').append(tweets.join(''));
  }

  function createTweetElement(data) {
    var $tweet = $('<article>').addClass('tweet').data('tweet_id', data.content[0].id);
    var $header = $('<header>');
    var $avatar = $('<img>').addClass('avatar').attr('src', data.user.avatars.regular);
    var $name = $('<h2>').addClass('name').text(data.user.name);
    var $handle = $('<span>').addClass('handle').text(data.user.handle);
    var $tweetText = $('<p>').addClass('tweet-text').text(data.content[0].text);
    var $footer = $('<footer>');
    var today = new Date();
    var dateCreated = new Date(data.content[0].created_at);
    var diffDays = Math.round((today - dateCreated) / 86400000);
    var $daysAgo = $('<span>').addClass('days-ago').text(diffDays + ' days ago');
    var $flag = $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true');
    var $retweet = $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true');
    var $heart = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true');
    var $likes = $('<span>').addClass('likes').data('num_likes', data.content[0].likes).text(data.content[0].likes + ' likes');

    $header.append($avatar).append($name).append($handle);
    $footer.append($daysAgo).append($heart).append($retweet).append($flag).append($likes);
    $tweet.append($header).append($tweetText).append($footer);
    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      },
    });
  }

  loadTweets();

});
