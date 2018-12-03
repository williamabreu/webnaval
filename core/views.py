from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse

from .models import Player
from .game.server import Server
from .game.player import BattlePlayer
from .game.battle import Battle

# Create your views here.

@login_required
def index(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        ranking = Player.objects.all().order_by('-score')
        server = Server()
        
        if not user in server.players:
            server.players.append(user)

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
def start_game(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()
        battleplayer = BattlePlayer(user)
        server.player_join(battleplayer)
        return render(request, 'core/tela.html')

@login_required
def join_game(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()
        battleplayer = server.get_battle_player(user)
        
        if server.battles == []:
            server.battles = [Battle(battleplayer, None)]
            return HttpResponse(b'Aguradando alguem conectar para jogar')
        else:
            for battle in server.battles:
                if battle.player1 == battleplayer:
                    if battle.player2 != None:
                        return HttpResponse(b'Conectado')
                elif battle.player2 == None:
                    battle.player2 = battleplayer
                    return HttpResponse(b'Conectado')
            return HttpResponse(b'Aguradando alguem conectar para jogar')
            


@login_required
def battle(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()

        return render(request, 'core/battle.html')

@login_required
def post_fleet(request):
    if request.method == 'POST':
        user = Player.objects.get(user=request.user.id)
        server = Server()
        battleplayer = server.get_battle_player(user)        
        board = battleplayer.get_board()        
        positions = [int(x) for x in request.POST.getlist('positions[]')]

        board.insert_fleet(positions)

        return HttpResponse()


def status(request):
    if request.method == 'GET':
        user = Player.objects.get(user=request.user.id)
        server = Server()

        if user in server.queue:
            if len(server.queue) % 2 == 0:
                server.queue.remove(user)
