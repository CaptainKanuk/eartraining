from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
#from pages.forms import RegisterForm
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from pages.models import UserProfile
from django.utils import simplejson
from django.http import Http404
from django.contrib.auth import authenticate, login, logout

#=======================================================================
#===========================PAGE LINKS==================================
#=======================================================================

def index(request):
	context=RequestContext(request)
	context_dict={'boldmessage': "I am bold font from the context"}
	return render_to_response('pages/index.html', context_dict, context)

def signin(request):
	context=RequestContext(request)
	context.update(csrf(request))
	return render_to_response('pages/signin.html', context)

def hub(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/hub.html', context)

def intervals(request):
	context=RequestContext(request)
	return render_to_response('pages/intervals.html', context)

def melodies(request):
	context=RequestContext(request)
	return render_to_response('pages/melodies.html', context)

def about(request):
	context=RequestContext(request)
	userstuff={}
	u=UserProfile.objects.filter(user="form.username")
	userstuff['testUser'] = u[0].intervalLevel
	return render_to_response('pages/about.html', userstuff, context)

def help(request):
	context=RequestContext(request)
	return render_to_response('pages/help.html', context)

def game_win(request):
    context=RequestContext(request)
    return render_to_response('pages/game_win.html', context)

def game_loss(request):
    context=RequestContext(request)
    return render_to_response('pages/game_loss.html', context)

def notfound(request):
	context=RequestContext(request)
	return render_to_response('pages/404.html', context)

#=======================================================================
#===========================USER AUTH===================================
#=======================================================================

#Try to login
def auth_user(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user)
        return HttpResponseRedirect('/loggedin')
    else:
        return HttpResponseRedirect('/invalid')
    
#    if request.method == 'POST':
#        form = RegisterForm(request.POST)
#        
#        if form.is_valid():
#            form.save(commit=True)
#            
#            return index(request)
#        else:
#            print form.errors
#    
#    else:
#        form = RegisterForm()
#    
#    return render_to_response('pages/signin.html', {'form': form}, context)

def logout(request):
    logout(request)
    #context.update(csrf(request))
    return render_to_response('pages/404.html', context)

def loggedin(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/loggedin.html', context)

def invalid_login(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/invalid.html', context)

#Try to make a new user
def register_user(request):
    context = RequestContext(request)
    
    errorMsg = ''
    
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        #argTest = {}
        #argTest['test'] = form.is_valid()
        #return render_to_response('pages/register.html', argTest, context)
        if form.is_valid():
            form.save()
            u = UserProfile(userId=request.POST.get('username', ''), intervalLevel="1", melodyLevel="1")
            u.save()
            username = request.POST.get('username', '')
            password = request.POST.get('password1', '')
            user = authenticate(username=username, password=password)
    
            if user is not None:
                login(request, user)
            return HttpResponseRedirect('/register_success/', context)
        else:
            for error in form.errors:
                if 'username' in error:
                    errorMsg = errorMsg + 'Someone else already snagged that username :(\n'
                if 'password' in error:
                    errorMsg = errorMsg + 'The passwords don\'t quite match just yet.\n'

    args = {}
    args.update(csrf(request))
    args['errorMsg'] = errorMsg
    
    return render_to_response('pages/signin.html',args, context)

#Success page on registering a user
def register_success(request):
    context=RequestContext(request)
    return render_to_response('pages/register_success.html',context)

#Failure page with tips on how to fix it
def register_failure(request):
    context=RequestContext(request)
    args = {}
    args['errors'] = UserCreationForm(request.POST).errors
    return render_to_response('pages/register_failure.html', args, context)


#=======================================================================
#==========================DATABASE INTERACTION=========================
#=======================================================================
def get_IntervalLvl(request):
    context = RequestContext(request)
    userId = None
    if request.method == 'GET':
        userId = request.POST.get('username', '')
    #temp = UserProfile.objects.filter(user=user.username).intervalLevel
    return HttpResponse(simplejson.dumps(UserProfile.objects.filter(user=userId)[0].intervalLevel), mimetype='application/json')

def intLvlUp(request):
    context = RequestContext(request)
    userId = None
    if request.method == 'GET':
        userId = request.GET('username')
    lvl=1
    if userId:
        user = UserProfile.objects.get(user=userId)
        if user:
            lvl = user.intervalLevel + 1
            user.intervalLevel = lvl
            user.save()
    #temp = UserProfile.objects.filter(user=user.username).intervalLevel
    return HttpResponse(lvl)


