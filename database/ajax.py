from django.utils import simplejson
from dajaxice.decorators import dajaxice_register


@dajaxice_register(method='POST', name='user_level.update')
@dajaxice_register(method='GET', name='user_level.info')
def user_level(request):
	# return simplejson.dumps({'message':'hello'})
	if request.method == 'POST':
		return simplejson.dumps({'top_level': level})
	else:
		return simplejson.loads({'top_level'})


# @dajaxice_register
# def sayhello(request):
#     return simplejson.dumps({'message':'Hello World'})






# @dajaxice_register
# def sayhello(request):
#     return simplejson.dumps({'message':'Hello World'})
# @dajaxice_register
# def setlevel(request):
# 	return simplejson.dumps({'top_level': 2})
# @dajaxice_register(method= "GET")
# def getlevel(request):
# 	return simplejson.dumps({'top_level': 2})