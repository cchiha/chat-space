$(function(){
  function buildHTML(message){
    var image = message.image.url ? `<img src=${message.image.url} class='lower-message__image'>`: ""

    var html =`<div class="messagebox__message" data-message-id='${message.id}'>
                <div class="messagebox__header">
                  <div class="messagebox__header__user-name">
                    ${message.user_name}
                  </div>
                  <div class="messagebox__header__post-time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="messagebox__text">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
    return html;
  }

  function scroll(){
    $('.messagebox').animate({scrollTop: $('.messagebox')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e){
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
      $('.messagebox').append(html)
      $('#new_message')[0].reset();
      $('.form__send').prop("disabled",false);
      scroll();
    })
    .fail(function(){
      alert('error');
      $(".form__send").prop('disabled', false);
    })
  });

  function update(){
    var message_id = $('.messagebox__message:last').data('message-id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: { id: message_id },
      dataType: 'json',
    })
    .done(function(messages){
      if (messages.length > 0){
        messages.forEach(function(message){
          var html = buildHTML(message);
          $('.messagebox').append(html);
          scroll();
        });
      }
    })
    .fail(function(){
      alert('error');
    })
  }

  var interval = setInterval(function(){
    if (window.location.pathname.match(/\/groups\/\d+\/messages/)){
      update();
    }
    else{
      clearInterval(interval)
    }
  } ,5000 )
});
