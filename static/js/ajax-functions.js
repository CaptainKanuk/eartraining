function my_js_callback(data)
{
    alert('Got here!');
    alert(data.message);
}

function level_callback(data)
{
    alert(data.message);
	max_level = data.message;
}

function intcurlevel_callback(data)
{
    curIntLvl = data.message;
}

function melcurlevel_callback(data)
{
    curMelLvl = data.message;
}

function Mlevel_callback(data)
{
	mel_level = data.message;
	//alert(max_level);
}

function test_function()
{
	Dajaxice.database.sayhello(level_callback);
}
//callback functions that takes data 
