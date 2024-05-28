from flask import g
from monsters.db import db_connect

def gather_data(query: dict)-> dict:
    """ collects the neccessary data, based on query

    Return: List with requested data
    """

    querylist = []
    for key, value in query.items():
        if value != "none" and value != "":
            if not value.replace(".","").isdigit():
                values = value.split()
                for i in values:
                    querylist.append({key : {"$regex": i, "$options": "i"}})
            else: 
                querylist.append({key: {"$eq": float(value), "$type": "number"}})
    db = db_connect()
    return db.find({"$and": querylist}) if querylist != [] else []