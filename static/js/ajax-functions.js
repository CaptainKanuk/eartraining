function my_js_callback(data)
{
    alert('Got here!');
    alert(data.message);
}

function level_callback(data)
{
	alert("here", max_level);
	max_level = data.message;
	if (max_level > 22)
		test_set = 1;
	else
		test_set = 0;
	alert("hereb", max_level);
}

function test_function()
{
	Dajaxice.database.sayhello(level_callback);
}
//callback functions that takes data 