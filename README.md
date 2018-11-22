# WebNaval

Protótipo de jogo online de batalha naval para a disciplina de Sistemas Distribuídos

## Tecnologias Utilizadas

- Python 3.6
- Django 2.1
- SQLite 3

## Configuração Inicial

### Linux

```python3 -m venv .venv```

```source .venv/bin/activate```

```pip install -r requirements.txt```

### Windows

```python -m venv .venv```

```.venv/Scripts/activate.bat```

```pip install -r requirements.txt```

## Aplicando Mudanças no Banco de Dados

```python manage.py makemigrations```

```python manage.py migrate```

## Criando Super-usuário para Acessar Django Admin

```python manage.py createsuperuser```

## Executando Servidor para Testes

```python manage.py runserver```
