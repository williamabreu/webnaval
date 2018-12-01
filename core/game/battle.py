class Battle:
    def __init__(self, player1, player2):
        self.__players = (player1, player2)
        self.__round = 0
    
    def next_play(self):
        if self.__round == 1:
            