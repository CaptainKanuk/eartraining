from django.db import models
#from django.contrib.auth.models import User

class UserProfile(models.Model):
    userId = models.CharField(max_length=30)
    intervalLevel = models.IntegerField()
    melodyLevel = models.IntegerField()
    currentInt = models.IntegerField()
    currentMel = models.IntegerField()

#User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
