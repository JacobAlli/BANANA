$(function() {
  function count($this){
    var current = parseInt($this.html(), 10);
    $this.html(++current);
    if(current !== $this.data('count')){
      setTimeout(function(){count($this)}, 30);
    }
  }
  $(".numCount").each(function() {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
  });
});
// ///////////////////////////
// //ADD CLICK COUNT TO PAGE// DONE
// ///////////////////////////
// getClicks();
// var allClicks;
// function getClicks(){
//   // Send the PUT request.
//   $.ajax("/api/clicks", {
//     type: "GET"
//   }).then(
//     function(data) {
//       allClicks= data.clicks;
//     }
//   );
// };

// console.log(allClicks);
// });
