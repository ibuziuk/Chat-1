
var messageList = [];

var uniqueId = function() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};

var theMessage = function(text, name , done) {
    return {
        nick: name,
        message: text,
        status: !!done,
        id: uniqueId()
    };
};

function createAllTasks(allTasks) {
    for(var i = 0; i < allTasks.length; i++){
        if(allTasks[i].status != false){
            task = allTasks[i];
            messageDiv = $('.exampleMessage').first().clone();
            messageDiv.find('.nick').html(task.nick + ":");
            messageDiv.find('.message').html(task.message);
            messageDiv.attr('message-id', task.id);
            messageDiv.attr('status', task.status);
            $('#showMessage').append(messageDiv.show());
        }
        messageList.push(allTasks[i]);
    }
}

function store(listToSave) {

    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("Chat messageList", JSON.stringify(listToSave));
}

function restoreMessages() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Chat messageList");

    return item && JSON.parse(item);
}

function restoreName(){
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Chat userName");


    $('#messageArea').attr('disabled', false);
    $('#send').attr('disabled', false);

    return item && JSON.parse(item);
}


$(document).ready(function () {

    $userName = $('h4.currentName');
    $inputChange = $('#changeName');

    var allMessages = restoreMessages() || [];
    createAllTasks(allMessages);
    $userName.html(restoreName() || "Имя пользователя");

    if($userName.html()!=""){
        debugger;
        li = $('#onlineArea li').first().clone();
        li.html($userName.html());
        $('#onlineArea').append(li.show());

    }

    //enter in chat
    $('#submitUser').click(function () {    
        if ($('#userLogin').val() != "") {
            userName = $('#userLogin').val();
            $userName.html(userName);
            $('#userLogin').val('');
            $('#messageArea').attr('disabled', false);
            $('#send').attr('disabled', false);
            debugger;
            li = $('#onlineArea li').first().clone();
            li.html($userName.html());
            $('#onlineArea').append(li.show());

            localStorage.setItem("Chat userName", JSON.stringify($userName.html()));
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

        localStorage.setItem("Chat userName", JSON.stringify($userName.html()));
        };
    })

    //delete message (only my msg)
    $('#showMessage').on('click', 'button.close', function () {
        if($userName.html() + ":" != $(this).closest('.exampleMessage').find('.nick').html()){
            return;
        }
        
        id = $(this).closest('.exampleMessage').attr('message-id');
        
        $(this).parent().parent().remove();

        for(var i = 0; i < messageList.length; i++) {
            if(messageList[i].id != id)
                continue;

            messageList[i].status = false;
            store(messageList);

            return;
        }
    })

    //send message
    $('#send').click(function () {
        message = $('#messageArea').val();
        if (message != "") {
            task = theMessage(message,$userName.html(),true);
            messageList.push(task);
            messageDiv = $('.exampleMessage').first().clone();
            messageDiv.find('.nick').html($userName.html() + ":");
            messageDiv.find('.message').html(message);
            messageDiv.attr('message-id', uniqueId());
            messageDiv.attr('status', true);
            $('#showMessage').append(messageDiv.show());
            $('#messageArea').val('');
        };
        store(messageList);
    })

    //edit message (only my msg)
    $('#showMessage').on('click', 'a.editMessage', function () {
        if($userName.html() + ":" != $(this).closest('.exampleMessage').find('.nick').html()){
            return;
        }

        $p = $(this).closest('.exampleMessage')
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
        $p = $(this).closest('.exampleMessage')
        $input = $p.find('#changeMessage')
        editer = $input.val();
        $input.attr('disabled', true);
        $input.hide();
        $p.find('.message').html(editer).show();
        $p.find('.nick').show();
        $(this).hide();
        $p.find('a.editMessage').show();

        id = $(this).closest('.exampleMessage').attr('message-id');
        for(var i = 0; i < messageList.length; i++) {
            if(messageList[i].id != id)
                continue;

            messageList[i].message = editer;
            store(messageList);

            return;
        }
    })
})



