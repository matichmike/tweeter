$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    $('.counter').text(140 - this.value.length);
    if (this.value.length > 140) {
      $('.counter').addClass('counterMax');
    }
    else {
      $('.counter').removeClass('counterMax');
    }
  })
});