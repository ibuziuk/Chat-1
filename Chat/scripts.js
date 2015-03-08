
$(document).ready(function () {

    $userName = $('h4.currentName');
    $inputChange = $('#changeName');

    //enter in chat
    $('#submitUser').click(function () {
        if ($('#userLogin').val() != "") {
            userName = $('#userLogin').val();
            $userName.html(userName);
            $('#userLogin').val('');
            $('#messageArea').attr('disabled', false);
            $('#send').attr('disabled', false);
        };
    })

    //change name
    $('#changeCurrentName').click(function () {
        name = $userName.html();
        $userName.hide();
        $inputChange.attr('disabled', false);
        $inputChange.val(name);
        $inputChange.show();
        $(this).hide();
        $('#saveCurrentName').show();
    })

    // save change name
    $('#saveCurrentName').click(function () {
        name = $inputChange.val();
        if (name != "") {
        $inputChange.attr('disabled', true);
        $inputChange.hide();
        $userName.html(name);
        $(this).hide();
        $('#changeCurrentName').show()
        $userName.show();
        };
    })

    //delete message
    $('#showMessage').on('click', 'button.close', function () {
        $(this).parent().remove();
    })


    //send message
    $('#send').click(function () {
        message = $('#messageArea').val();
        if (message != "") {
            messageDiv = $('#showMessage p').first().clone();
            messageDiv.find('.nick').html($userName.html());
            messageDiv.find('.message').html(message);
            $('#showMessage').append(messageDiv);
            $('#messageArea').val('');
        };

    })

    //edit message
    $('#showMessage').on('click', 'a.editMessage', function () {
        $p = $(this).closest('p')
        $message = $p.find('.message')
        $input = $p.find('#changeMessage')
        editer = $message.html();
        $message.hide();
        $p.find('.nick').hide();
        $input.attr('disabled', false);
        $input.val(editer);
        $input.show();
        $(this).hide();
        $p.find('#saveMessage').show();
    })

    //save edit message
    $('#showMessage').on('click', 'button#saveMessage', function () {
        debugger
        $p = $(this).closest('p')
        $input = $p.find('#changeMessage')
        editer = $input.val();
        $input.attr('disabled', true);
        $input.hide();
        $p.find('.message').html(editer).show();
        $p.find('.nick').show();
        $(this).hide();
        $p.find('a.editMessage').show();
    })

    //автоматический логин и генерация соообщений
    $('#userLogin').val('TEST NIC')
    $('#submitUser').click()
    for(var i = 0 ; i < 20; ++i){
       $('#messageArea').val('TEST MESSAGE ' + i)
        $('#send').click()    
    }
})



