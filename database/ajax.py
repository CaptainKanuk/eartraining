from django.db import models
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from pages.models import UserProfile

@dajaxice_register(method='GET')
def getIntervalLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0].intervalLevel
    return simplejson.dumps({'message':'Your message is %s!' % u})

@dajaxice_register(method='GET')
def intervalLvlUp(request, text):
    u=UserProfile.objects.filter(userId=text)
    lvl = u.intervalLevel + 1
    u.intervalLevel = lvl
    u.save()

@dajaxice_register(method='POST', name='user_level.update')
@dajaxice_register(method='GET', name='user_level.info')
def user_level(request):
	# return simplejson.dumps({'message':'hello'})
	if request.method == 'POST':
		return simplejson.dumps({'top_level': level})
	else:
		return simplejson.loads({'top_level'})