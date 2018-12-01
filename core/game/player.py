from .board import Board

class BattlePlayer:
    def __init__(self, model_player):
        self.__model = model_player
        self.__board = Board()
        self.__available = True
    
    def in_battle(self):
        return self.__available
    
    def join_battle(self):
        self.__available = False
    
    def quit_battle(self, status):
        if status == 'win':
            self.__model.score += 1
        self.__model.games_played += 1
        self.__available = True
    
    def get_id(self):
        return self.__model.id
    
    def get_board(self):
        return self.__board
