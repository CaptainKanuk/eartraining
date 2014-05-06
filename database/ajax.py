from django.db import models
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from pages.models import UserProfile
from django.shortcuts import render_to_response

@dajaxice_register(method='GET')
def getIntervalLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0].currentInt
    #return simplejson.dumps({'message':'Your message is %s!' % u})
    return simplejson.dumps({'message':u})

@dajaxice_register(method='GET')
def getMaxIntervalLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0].intervalLevel
    #return simplejson.dumps({'message':'Your message is %s!' % u})
    return simplejson.dumps({'message':u})

@dajaxice_register(method='GET')
def intervalLvlUp(request, text):
    u=UserProfile.objects.filter(userId=text)[0]
    lvl = u.intervalLevel + 1
    u.intervalLevel = lvl
    u.save()

@dajaxice_register(method='GET')
def intervalLvlUp(request, text):
    u=UserProfile.objects.filter(userId=text)[0]
    lvl = u.intervalLevel + 1
    u.intervalLevel = lvl
    u.save()

@dajaxice_register(method='GET')
def resetIntervalLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0]
    lvl = 0
    u.intervalLevel = lvl
    u.save()

@dajaxice_register
def sendIntLvl(request, text, curIntLvl):
    u=UserProfile.objects.filter(userId=text)[0]
    u.currentInt = curIntLvl
    u.save()
    #return render_to_response('pages/intervals.html')

@dajaxice_register
def sendMelLvl(request, text, curMelLvl):
    u=UserProfile.objects.filter(userId=text)[0]
    u.currentMel = curMelLvl
    u.save()
    #return render_to_response('pages/melodies.html')

@dajaxice_register(method='GET')
def getMelodyLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0].currentMel
    return simplejson.dumps({'message':u})

@dajaxice_register(method='GET')
def getMaxMelodyLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0].melodyLevel
    return simplejson.dumps({'message':u})

@dajaxice_register(method='GET')
def melodyLvlUp(request, text):
    u=UserProfile.objects.filter(userId=text)[0]
    lvl = u.melodyLevel + 1
    u.melodyLevel = lvl
    u.save()

@dajaxice_register(method='GET')
def resetMelodyLvl(request, text):
    u=UserProfile.objects.filter(userId=text)[0]
    lvl = 0
    u.melodyLevel = lvl
    u.save()
