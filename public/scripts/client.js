/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // Error handling
  const errorPopup = function(message) {
    const $error = $(`<div id="errMessage"><span>${message}</span></div>`);
    return $error;
  };

  const errorDisplay = function(error) {
    let errMsg = errorPopup(error);
    $(".new-tweet").prepend(errMsg).hide().slideDown();
  }
// tweets rendering and prepending them to the container
  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
}
// jQuery create new tweet
  const createTweetElement = function(tweet) {
    let escapedText = $("<div>").text(tweet.content.text).html();
    let markup = `
    <article class="tweet-article">
      <header class = "tweet-header">
        <img src="${tweet.user.avatars}">
        <p class="name">${tweet.user.name}</p>
        <p class="username">${tweet.user.handle}</p>
      </header>
      <p class="tweet">${escapedText}</p>
      <footer>
        <p class="postAge">${timeago.format(tweet.created_at)}</p>
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
// new tweet submission via form and handling empty input or more than 140 characters limit
  $("#submit").submit(function(event) {
    
    event.preventDefault();
    let input = $("#tweet-text").val();
    if (input === "" || input === null) {
      errorDisplay("🛑🛑🛑The tweet is empty, there is nothing to submit!🛑🛑🛑")
      return false;
    }
    if (input.length > 140) {
      errorDisplay("🛑🛑🛑Max character limit is exceeded, please make your post shorter than 140 characters!🛑🛑🛑")
      return false;
    }
    $(".counter").text(140);
    $('#errMessage').slideUp(300, function() { 
      $(this).remove(); 
    });

    $.ajax({
      url: "/tweets",
      type: "POST",
      dataType: "text",
      data: $("#submit").serialize()
    })
    .then((response) => {
      $('#tweet-text').val('');
      loadTweets();
    })
    .catch((response) => {
      console.log(response);
    })
  })
// loading tweets from /tweets objects
  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    .then(function (response) {
      renderTweets(response);
    })
  }
// toggling new tweet field on and off
  $("#new-tweet-post").click(function() {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  loadTweets();
})
