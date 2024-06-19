import os
import json
import mimetypes

from flask import Flask, render_template, request, g

from monsters.datacollector import gather_data
from monsters.init_db import initiate_db


def create_app():
    # application factory function
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev", MONGO_CLIENT="localhost", MONGO_PORT=27017
    )

    # set MIME-Types for .js files
    mimetypes.add_type("application/javascript", ".js")

    # create instance folder
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/", methods=("GET", "POST"))
    def index():
        export_list = []
        searchvalues = dict()
        if request.method == "POST":
            fields = ["index", "name"]
            data = gather_data(request.form, fields)
            for field in request.form:
                if request.form[field] and request.form[field] != "none":
                    searchvalues.setdefault(field, request.form[field])
            searchvalues = json.dumps([searchvalues])
            for stat in data:
                stat.pop("_id")
                export_list.append(stat)
            export_data = json.dumps(export_list)
        else:
            export_data = json.dumps(export_list)

        return render_template(
            "index.html", monster_data=export_data, searchvalues=searchvalues
        )

    from . import stats

    app.register_blueprint(stats.bp)

    with app.app_context():
        initiate_db()

    return app
