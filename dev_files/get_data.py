import json
from urllib import request
import ssl

def get_data(selection :str = 'monsters')-> dict:
    """ Get Data under the selected API-Key from https://www.dnd5eapi.co

    Return: 
        Dictionary of the JSON requested

    """
    context = ssl._create_unverified_context()
    url = f"https://www.dnd5eapi.co/api/{selection}"
    response = request.urlopen(url, context=context)
    data_set = json.load(response)

    return data_set

# safe Data in JSON
with open("dev_files/dnd_data_monsters.json", "w", encoding="utf-8") as file:
    json.dump(get_data(), file, indent=4)