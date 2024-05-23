import os

from flask import Flask

def create_app():
    # application factory function
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = "dev",
        MONGO_CLIENT = "localhost",
        MONGO_PORT = 27017
        )
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from . import db
    db.init_app(app)

    @app.route("/confirm_running")
    def confirm_running():
        return "RUNNING confirmed"
    
    return app