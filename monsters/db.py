from pymongo import MongoClient

from flask import current_app, g

def db_connect(chosen_collection = 'monsters'):
    if 'db' not in g:
        client = MongoClient(
            current_app.config['MONGO_CLIENT'],
            port=current_app.config['MONGO_PORT']
            )
        dbname = client['dnd']
        collection = dbname[chosen_collection]

        g.db = collection

        return g.db