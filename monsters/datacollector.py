from monsters.db import db_connect

def gather_data(query: dict)-> dict:
    """ collects the neccessary data, based on query

    Return: List with requested data
    """

    name = query['search_name']

    db = db_connect()
    data = db.find({'index': {'$regex': name, '$options': 'i'}})
    for stat in data:
        stat.pop("_id")
        export_list.append(stat)
        pass