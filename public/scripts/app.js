/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data =
[
  {
    user: {
      name: 'Newton',
      avatars: {
        small:   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
        regular: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
        large:   'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png',
      },
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: {
        small:   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png',
        regular: 'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png',
        large:   'https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png',
      },
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
  {
    user: {
      name: 'Johann von Goethe',
      avatars: {
        small:   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png',
        regular: 'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png',
        large:   'https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png',
      },
      handle: '@johann49',
    },
    content: {
      text: 'Es ist nichts schrecklicher als eine tätige Unwissenheit.',
    },
    created_at: 1461113796368,
  },
];

$(document).ready(function () {
  $('.new-tweet').on('submit', 'form', function (event) {
    event.preventDefault();
    var $text = $(this).find('textarea');
    var queryStr = $text.serialize();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: queryStr,
    });
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

  renderTweets(data);
});
