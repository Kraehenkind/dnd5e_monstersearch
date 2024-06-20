import os
from pymongo import MongoClient
from flask import current_app
import json
from urllib import request
import ssl


def initiate_db() -> str:
    """Checks for existing Data in db,
    if no entries exist, searches for datafile.
    if no datafile exists, creates file from API.
    than safes data to db.

    return messega of done task
    """
    client = MongoClient(current_app.config["MONGO_CLIENT"])
    dbname = client["dnd"]
    collection = dbname["monsters"]

    def get_data(selection: str = "/api/monsters") -> dict:
        """Get Data under the selected API-Key from
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

    def create_data_json() -> str:
        """Saves all JSONs with Monsterstat from
        https://www.dnd5eapi.co in one JSON.

        return:
        string with number of safed monsterstats in data.json
        """

        url_data = get_data()

        data_for_json = []

        if url_data:
            for entry in url_data["results"]:
                try:
                    stats = get_data(entry["url"])

                    data_for_json.append(stats)
                except OSError:
                    continue

            with open(
                "monsters/static/data/statdata.json", "w", encoding="utf-8"
            ) as file:
                json.dump(data_for_json, file, indent=4)

        return f"{len(url_data['results'])} entries taken from API, {len(data_for_json)} were safed in file and db"

    def init_db() -> str:
        """Loads statdata.json from static/data/,
        if not exists: tries to create file
        then: safes loaded data in db


        return: string success message or "Internal Error"
        """

        try:
            with open(
                "monsters/static/data/statdata.json", "r", encoding="utf-8"
            ) as file:
                data = json.load(file)
                for entry in data:
                    collection.insert_one(entry)
                return "statdata.json safed to db"
        except FileNotFoundError:
            created_file = create_data_json()
            try:
                with open(
                    "monsters/static/data/statdata.json", "r", encoding="utf-8"
                ) as file:
                    data = json.load(file)
                    for entry in data:
                        collection.insert_one(entry)
                return created_file
            except FileNotFoundError:
                return "Internal error"

    datacheck = collection.count_documents({})
    if datacheck != 0:
        return f"{datacheck} entries found in db"
    else:
        return init_db()
