$(document).ready(function() {
                  $('#upLvl').click(function() {
                                    var userid;
                                    userid = $(this).attr("data-userid");
                                    $.get('/intLvlUp/', {username: userid}, function(data){
                                          $('#int_lvl').html(data);
                                          }); 
                                    }
                  });

/*function gameOver() {
    alert('here!');
    $.getJSON('/getIntLvl/', {userid: user.username}, function() {alert('hello!');});
    //var board = $('#testtimes');//.attr('data-board-id');
    //alert($('#testtimes').attr('data-done-ref'));
    /*$.ajax({type:"POST", url:("/getIntLvl/"), data:{'Hello!'});
    /*$.ajax({
           type: "POST",
           url: $('#testtimes').attr('data-done-ref'),  // or just url: "/my-url/path/"
           data: {
           csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
           board: board,
           //move_list: move_list.join(','),
           },
           success: function(data) {
           alert("Congratulations! You scored: "+data);
           },
           error: function(xhr, textStatus, errorThrown) {
           alert("Please report this error: "+errorThrown+xhr.status+xhr.responseText);
           }
           });
    alert('done!');
}*/