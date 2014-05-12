from django.db import models

class UserProfile(models.Model):
    userId = models.CharField(max_length=30)
    intervalLevel = models.IntegerField()
    melodyLevel = models.IntegerField()
    currentInt = models.IntegerField()
    currentMel = models.IntegerField()