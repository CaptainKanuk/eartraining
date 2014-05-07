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

function intcurlevel_callback(data)
{
    alert("int");
    alert(data.message);
    curIntLvl = data.message;
}

function melcurlevel_callback(data)
{
	alert("mel");
    curMelLvl = data.message;
    alert(curMelLvl);
}

function Mlevel_callback(data)
{
	mel_level = data.message;
    alert(mel_level);
	//alert(max_level);
}

function test_function()
{
	Dajaxice.database.sayhello(level_callback);
}
//callback functions that takes data 
