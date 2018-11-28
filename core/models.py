from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)
