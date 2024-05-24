from pymongo import MongoClient

def db_connect(chosen_collection = 'monsters'):

    client = MongoClient(
        'localhost',
        port=27017
        )
    dbname = client['dnd']
    collection = dbname[chosen_collection]

    return collection

db = db_connect()
name = "zombie"
data = db.find({'index': {'$regex': name, "$options": "i"}})
print(data)
for i in data:
    print(i)