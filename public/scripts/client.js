/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  //timeago().render(document.querySelectorAll('.postAge'));
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

  $("#submit").submit(function(event) {
    event.preventDefault();
    let input = $("#tweet-text").val();
    if (input === "" || input === null) {
      alert("The tweet is empty, there is nothing to submit!")
      return false;
    }
    if (input.length > 140) {
      alert("Max character limit is exceeded, please make your post shorter than 140 characters!")
      return false;
    }
    
    $.ajax({
      url: "/tweets",
      type: "POST",
      dataType: "text",
      data: $("#submit").serialize()
    })
    .then((response) => {
      $('.tweet-container').empty();
      loadTweets();
    })
    .catch((response) => {
      console.log(response);
    })
  })

  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    .then(function (response) {
      renderTweets(response);
    })
  }

  loadTweets();
})
