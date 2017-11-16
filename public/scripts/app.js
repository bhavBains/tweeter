/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).on("ready", function() {
  function createTweetElement(tweet) {
    //To make article of posted tweets
    var tweetBody =     tweet.content.text,
        tweetUserName = tweet.user.name,
        tweetAvatar =   tweet.user.avatars.small,
        tweetHandler =  tweet.user.handle,
        tweetFooter =   new Date(tweet.created_at);

    const $tweet = 
      `<article>
      <header><img src="${tweetAvatar}">${tweetUserName}<p class="userId">${tweetHandler}</p></header>
      <div class="recent-tweets-body">
        <p class="">${tweetBody}</p>
      </div>
      <footer>${tweetFooter}</footer>
      </article>` ;
    
    return $tweet;
  }

  function renderTweets(tweets) {
    //To loop through every posted tweet database
    tweets.forEach ((tweet) =>{
        $(".recent-tweets").prepend(createTweetElement(tweet));
    })
  }

  function loadTweets() {
    //GET request to database
    $.get("/tweets/",function(data) {
      return renderTweets(data);
    }) 
  }
  loadTweets();

  //Post request on submit button
  $("form").on("submit", function(event) {
    event.preventDefault();
    if ($('#tweet-textarea').val().length !== 0 && $('#tweet-textarea').val().length < 140) {
      $.post("/tweets/", $(this).serialize(), (data) => {
        $('#tweet-textarea').val("");
        $(".recent-tweets").html("");
        loadTweets();
      })
    } else {
      alert("empty string or maximum number of characters reached");
    } 
  });

});
