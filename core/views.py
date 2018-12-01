from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse

from .models import Player
from .game.server import Server
from .game.player import BattlePlayer

# Create your views here.

@login_required
def index(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        ranking = sorted(Player.objects.all(), key=lambda x: x.score)
        server = Server()
        
        if not server.player_already_in(user):
            server.connect_player(user)

        data = {
            'user': user, 
            'ranking': ranking,
            'server': server
        }

        return render(request, 'core/index.html', data)

@login_required
def disconnect(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()

        server.disconnect_player(user)

        return redirect('/accounts/logout')

@login_required
def post_fleet(request):
    if request.method == 'POST':
        user = Player.objects.get(user=request.user.id)
        server = Server()
        battleplayer = server.get_battle_player(user)        
        board = battleplayer.get_board()        
        positions = [int(x) for x in request.POST['positions[]']]

        board.insert_fleet(positions)

        print(board)

        return HttpResponse()


@login_required
def join_game(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()

        if not server.player_already_waiting(user):
            server.player_join(BattlePlayer(user))

        return JsonResponse({
            'key': None
        })
    return render(request, 'core/index.html')

def fleet(request):
    return render(request, 'core/tela.html')

def battle(request):
    return render(request, 'core/battle.html')
