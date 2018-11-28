from django import forms
from django.contrib.auth.models import User
from core.models import Player

class PlayerForm(forms.Form):
    def signup(self, request, user):
        player = Player()
        player.user = user
        player.save()