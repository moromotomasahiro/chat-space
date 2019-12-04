$(function(){
  function buildHTML(message){
      var img = ""
      if (message.image) {
        img = `<img src="${message.image}">`
      }

      var html =
        `<div class="contents_main1"data-message-id=${message.id}>
          <div class="message__sender1">
            ${message.user_name}
          </div>
          <div class="message__date1">
            ${message.created_at}
          </div>
          <div class="message__details1">
            <p class="lower-message__content">
              ${message.content}
              ${img}
            </p>
          </div>
          </div>`
        return html;
   };
  

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
    $('.main_message').append(html)
    $('.main_message').animate({scrollTop: $('.main_message')[0].scrollHeight}); 
    $('#new_message')[0].reset();
    $('.form_form_btn').prop('disabled', false);
  })
    .fail(function(){
      alert('エラー');
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.contents_main1:last').data("message-id")
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
    
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.contents_main1').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 7000);
});

//   var reloadMessages = function() {
//     last_message_id = $('.contents_main1:last').data("message-id")
//     $.ajax({
//       url: "api/messages",
//       type: 'GET',
//       dataType: 'json',
//       data: {id: last_message_id}
//     })
//     .done(function(messages) {
//       var insertHTML = '';
//       $.each(messages, function(i, message) {
//         insertHTML += buildHTML(message)
//       });
//       $('.messages').append(insertHTML);
//     })
//     .fail(function() {
//       console.log('error');
//     });
//   };
//   setInterval(reloadMessages, 7000);
// });



      
//       console.log("aaaaa");
//       var html = buildHTML(data);
//     $('.main_message').append(html)
//     $('.main_message').animate({scrollTop: $('.main_message')[0].scrollHeight}); 
//     $('#new_message')[0].reset();
//     $('.form__submit').prop('disabled', false);
        
//   })
//     .fail(function(){
//       alert('エラー');
//     });
//   }
//   setInterval(reloadMessages, 7000);
// });