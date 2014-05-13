from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from pages.forms import RegisterForm
from django.http import HttpResponse
from django.contrib import auth
from django.core.context_processors import csrf

# Create your views here.

def index(request):
	context=RequestContext(request)
	context_dict={'boldmessage': "I am bold font from the context"}
	return render_to_response('pages/index.html', context_dict, context)

def signin(request):
    context=RequestContext(request)
    context.update(csrf(request))
    return render_to_response('pages/signin.html', context)

def train(request):
	context=RequestContext(request)
	return render_to_response('pages/train.html', context)

def intervals(request):
	context=RequestContext(request)
	return render_to_response('pages/intervals.html', context)

def about(request):
	context=RequestContext(request)
	return render_to_response('pages/about.html', context)

def help(request):
	context=RequestContext(request)
	return render_to_response('pages/help.html', context)

def vextest(request):
	context=RequestContext(request)
	return render_to_response('pages/vextest.html', context)

def notfound(request):
	context=RequestContext(request)
	return render_to_response('pages/404.html', context)

#def login(request):
#   print "Hello"
#   context = RequestContext(request)
#   context.update(csrf(request))
#   return render_to_response('login.html',context)

def add_user(request):
    context = RequestContext(request)

    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            form.save(commit=True)

            return index(request)
        else:
            print form.errors

    else: 
        form = RegisterForm()

    return render_to_response('pages/signin.html', {'form': form}, context)

def auth_user(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    
    user = auth.authenticate(username=username, password=password)
    
    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect('/loggedin')
    else:
        return HttpResponseRedirect('/invalid')
    
    if request.method == "POST":
        form = RegisterForm(request.POST)
        
        if form.is_valid():
            form.save(commit=True)
            
            return index(request)
        else:
            print form.errors
    
    else:
        form = RegisterForm()
    
    return render_to_response('pages/signin.html', {'form': form}, context)

def logout(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/404.html', context)

def loggedin(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/404.html', context)

def invalid_login(request):
    context=RequestContext(request)
    #context.update(csrf(request))
    return render_to_response('pages/404.html', context)
