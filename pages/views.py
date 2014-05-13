from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.http import Http404
from django.contrib import auth
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from pages.models import UserProfile
from django.utils import simplejson
from django.http import Http404
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import redirect

#=======================================================================
#===========================PAGE LINKS==================================
#=======================================================================

def index(request):
	context=RequestContext(request)
	return render_to_response('pages/index.html', context)

def signin(request):
	context=RequestContext(request)
	context.update(csrf(request))
	return render_to_response('pages/signin.html', context)

def hub(request):
    context=RequestContext(request)
    return render_to_response('pages/hub.html', context)

def intervals(request):
	context=RequestContext(request)
	return render_to_response('pages/intervals.html', context)

def melodies(request):
	context=RequestContext(request)
	return render_to_response('pages/melodies.html', context)

def about(request):
	context=RequestContext(request)
	return render_to_response('pages/about.html', context)

def help(request):
	context=RequestContext(request)
	return render_to_response('pages/help.html', context)

def game_winInt(request):
    context=RequestContext(request)
    return render_to_response('pages/game_winInt.html', context)

def game_winMel(request):
    context=RequestContext(request)
    return render_to_response('pages/game_winMel.html', context)

def game_lossInt(request):
    context=RequestContext(request)
    return render_to_response('pages/game_lossInt.html', context)

def game_lossMel(request):
    context=RequestContext(request)
    return render_to_response('pages/game_lossMel.html', context)

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

def logoutview(request):
    logout(request)
    return redirect('index')

def loggedin(request):
    context=RequestContext(request)
    return render_to_response('pages/loggedin.html', context)

def invalid_login(request):
    context=RequestContext(request)
    return render_to_response('pages/invalid.html', context)

#Try to make a new user
def register_user(request):
    context = RequestContext(request)
    
    errorMsg = ''
    
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            u = UserProfile(userId=request.POST.get('username', ''), intervalLevel="1", melodyLevel="1", currentInt="1", currentMel="1")
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
                    errorMsg = errorMsg + 'Choose another username.\n'
                    break
                elif 'password' in error:
                    errorMsg = errorMsg + 'Your passwords don\'t match, try again. \n'
                    break

    args = {}
    args.update(csrf(request))
    args['errorMsg'] = errorMsg
    
    return render_to_response('pages/signin.html',args, context)

#Success page on registering a user
def register_success(request):
    context=RequestContext(request)
    return render_to_response('pages/register_success.html',context)
