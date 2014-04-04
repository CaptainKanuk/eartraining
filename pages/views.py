from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response

# Create your views here.
from django.http import HttpResponse

def index(request):
	context=RequestContext(request)
	context_dict={'boldmessage': "I am bold font from the context"}
	return render_to_response('pages/index.html', context_dict, context)

def about(request):
	context=RequestContext(request)
	return render_to_response('pages/about.html', context)

def vextest(request):
	context=RequestContext(request)
	return render_to_response('pages/vextest.html', context)

def notfound(request):
	context=RequestContext(request)
	return render_to_response('pages/404.html', context)