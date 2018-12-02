from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse

# Create your views here.

@login_required
def index(request):
    return render(request, 'core/index.html')

def fleet(request):
    return render(request, 'core/tela.html')

def battle(request):
    return render(request, 'core/battle.html')

def post_fleet(request):
    if request.method == 'POST':
        return HttpResponse()

def post_battle_attack(request):
    if request.method == 'POST':
        return JsonResponse({
            'hit': True,
            'status': "You ",
        })

def start(request):
    if request.method == 'POST':
        return HttpResponse()