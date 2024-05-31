from flask import g
from monsters.db import db_connect

def gather_data(query: dict, fields = None)-> dict:
    """ collects the neccessary data, based on query

    Return: List with requested data
    """
    projection = {field: 1 for field in fields} if fields else None
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
    return db.find({"$and": querylist},projection) if querylist != [] else []

def get_statblock(index):
    db = db_connect()
    return db.find({"index" : index})