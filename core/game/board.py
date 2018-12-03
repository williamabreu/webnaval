class Board:
    __WIDTH = 6
    __HEIGHT = 6

    def __init__(self):
        self.__matrix = [0] * (self.__WIDTH * self.__HEIGHT)
        self.__control = 0

    def insert_fleet(self, positions_list):
        self.__control += 1
        for pos in positions_list:
            self.__matrix[pos] = self.__control
    
    def attack(self, position):
        if self.__matrix[position] == 0:
            return False # atingiu a embarcação
        else:
            self.__matrix[position] = 0
            return True # errou
    
    def check_board(self):
        for item in self.__matrix:
            if item != 0:
                return False # jogo não acabou
        return True # todas as embarcações foram destruídas
    
    def __repr__(self):
        return '{} {} {} {} {} {}\n{} {} {} {} {} {}\n{} {} {} {} {} {}\n{} {} {} {} {} {}\n{} {} {} {} {} {}\n{} {} {} {} {} {}\n'.format(*self.__matrix)