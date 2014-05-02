from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from pages.models import UserProfile

@dajaxice_register
def sayhello(request):
    return simplejson.dumps({'message':'Hello World'})