import os
from pymongo import MongoClient
import json
from urllib import request
import ssl

def get_data(selection :str = '/api/monsters')-> dict:
    """ Get Data under the selected API-Key from 
        https://www.dnd5eapi.co<selection>

        default selection= '/api/monsters'

    Return: 
        Dictionary of the JSON requested
        False if connection Error

    """
    context = ssl._create_unverified_context()
    url = f"https://www.dnd5eapi.co{selection}"
    try:
        response = request.urlopen(url, context=context)
    except OSError:
        return False
    data_set = json.load(response)

    return data_set

def create_JSON(selection :str = 'monsters', subfolder = None)->bool:
    """ Checks for JSON dev_files/subfolder/dnd_data_<selection>.json",
        if not exists creates JSON with Data from 
        https://www.dnd5eapi.co/api/<subfolder>/<selection>
        
        Default selection = 'monsters', subfolder = None
    
    Return: True if file was created, else False
           
    """
    directory = 'dev_files'
    if subfolder:
        try:
            os.mkdir(f'dev_files/{subfolder}')
        except OSError:
            pass
        directory = f'dev_files/{subfolder}'

    nametag = selection [len(subfolder)+1:]
    
    try:
        with open(f'{directory}/dnd_data_{nametag}.json', 'r', encoding='utf-8') as file:
            return False
    except FileNotFoundError:
        data = get_data(f'/api/{selection}')
        if data:
            
            with open(f'{directory}/dnd_data_{nametag}.json', 'w', encoding='utf-8') as file:
                json.dump(data, file, indent=4)
                return True
        return False

def get_all_monster_jsons()->bool:
    """ creates DIR dev_files/monsters and creates JSON files for all
        Monsters by URL taken from "dev_files/dnd_data_monsters.json"


    Return: True if all went through, else False

    """
    try:
        with open('dev_files/dnd_data_monsters.json', 'r', encoding='utf-8') as file:
            monsterlist = json.load(file)
            for entry in monsterlist['results']:
                api_key = entry['url'][5:]
                create_JSON(api_key, 'monsters')
        return True
    except FileNotFoundError:
        return False
        
def populate_database():
    """Takes all data from JSON Files in Folder /dev/monsters
        put them into local MongoDB

    Return: True if success, else False
    """
    client = MongoClient('localhost', port=27017)
    dbname = client['dnd']
    collection = dbname['monsters']
    
    with open('dev_files/dnd_data_monsters.json', 'r', encoding='utf-8') as file:
        monsterlist = json.load(file)
        for entry in monsterlist['results']:
            with open(f'dev_files/monsters/dnd_data_{entry["index"]}.json', 'r', encoding='utf-8') as file:
                monsterdata = json.load(file)
                collection.insert_one(monsterdata)

    return collection.find()

def get_types():
    """ get all existing Types in /dev/monsters/*.json

    return: list of all types
    """
    types = set()
    with open('dev_files/dnd_data_monsters.json', 'r', encoding='utf-8') as file:
        monsterlist = json.load(file)
        for entry in monsterlist['results']:
            with open(f'dev_files/monsters/dnd_data_{entry["index"]}.json', 'r', encoding='utf-8') as file:
                monsterdata = json.load(file)
                types.add(monsterdata.get("challenge_rating"))
    return [i for i in types]
                
print(get_types())
#get_all_monster_jsons()
#print(populate_database())