from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .models import Player

# Create your views here.

@login_required
def index(request):
    if request.method == "GET":
        player = Player.objects.get(user=request.user.id)
        data = {'user': player}
        return render(request, 'core/index.html', data)