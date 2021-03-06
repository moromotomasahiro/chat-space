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
            </p>
             ${img}
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
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
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
        $('.main_message').animate({scrollTop: $('.main_message')[0].scrollHeight}); 
      });
      $('.main_message').append(insertHTML);
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  }
  };
  setInterval(reloadMessages, 7000);
});