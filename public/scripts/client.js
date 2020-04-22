/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const renderTweets = function(tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('.tweet-container').append($tweet);
  }
  // loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
  let markup = `
<article class="tweet-article">
<header class = "tweet-header">
  <img src="${tweet.user.avatars}">
  <p class="name">${tweet.user.name}</p>
  <p class="username">${tweet.user.handle}</p>
</header>
<p class="tweet">${tweet.content.text}</p>
<footer>
  <p class="postAge">${new Date(tweet.created_at)}</p>
<div class="footerImgs">
  <img src="images/flag.png">
  <img src="images/repost.png">
  <img src="images/like.png">
</div>
</footer>  
</article>
`
return markup;
}

$(document).ready(function() {
  renderTweets(data);
})
