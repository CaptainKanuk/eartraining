function my_js_callback(data)
{
    alert('Got here!');
    alert(data.message);
}

function level_callback(data)
{
	max_level = data.message;
	if (max_level > 22)
		test_set = 1;
	else
		test_set = 0;
	//alert(max_level);
}

<<<<<<< HEAD
function intcurlevel_callback(data)
{
    alert(data.message);
}

function melcurlevel_callback(data)
{
    alert(data.message);
=======
function Mlevel_callback(data)
{
	mel_level = data.message;
	//alert(max_level);
>>>>>>> fdedc93d3b4a48792bb1822534682838b4a071fc
}

function test_function()
{
	Dajaxice.database.sayhello(level_callback);
}
//callback functions that takes data 
