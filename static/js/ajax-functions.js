function my_js_callback(data){
    alert(data.message);
}

function level_callback(data){
	alert('Got here!');
	alert(data.message);
}

function test_function()
{
	Dajaxice.database.sayhello(level_callback);
}
//callback functions that takes data 
