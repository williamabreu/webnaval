class Server:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(Server, cls).__new__(cls, *args, **kwargs)
            cls._instance.__players = []
            cls._instance.__players_waiting = []
            cls._instance.__battles = []

        return cls._instance

    def connect_player(self, model_player):
        self.__players.append(model_player)
    
    def disconnect_player(self, model_player):
        self.__players.remove(model_player)
    
    def count_players(self):
        return len(self.__players)
    
    def count_waiting(self):
        return len(self.__players_waiting)
    
    def player_already_in(self, model_player):
        for player in self.__players:
            if player.id == model_player.id:
                return True
        return False
    
    def player_already_waiting(self, model_player):
        for player in self.__players_waiting:
            if player.id == model_player.id:
                return True
        return False

    def player_join(self, battle_player):
        self.__players_waiting.append(battle_player)
    
    def get_battle_player(self, model_player):
        for battleplayer in self.__players_waiting:
            if battleplayer.get_id() == model_player.id:
                return battleplayer
        return False
