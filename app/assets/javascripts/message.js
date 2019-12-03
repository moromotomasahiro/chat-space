$(function(){
  function buildMessage(message){
    if ( message.image ) {
      var img = ""
      if (message.image) {
        img = `<img src="${message.image.url}">`
      }
      var html =
        `<div class="contents_main1"data-message-id=${message.id}>
          <div class="message__sender1">
            ${message.user_name}
          </div>
          <div class="message__date1">
            ${message.data}
          </div>
          <div class="message__details1">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          </div>`
        return html;
    };
  }

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
      var html = buildMessage(data);
      console.log(html)
    $('.main_message').append(html)
    $('.main_message').animate({scrollTop: $('.main_message')[0].scrollHeight}); 
    $('#new_message')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
    .fail(function(){
      alert('エラー');
    });
    return false;
  });
});