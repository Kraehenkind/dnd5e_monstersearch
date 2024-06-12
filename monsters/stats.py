from flask import (
    Blueprint, redirect, render_template, url_for, g
)
import json

from monsters.datacollector import get_statblock
bp = Blueprint("statblock", __name__, url_prefix='/statblock')

@bp.route("/")
def statindex():
    return redirect(url_for("index"))

@bp.route("/<string:monsterindex>")
def statblock(monsterindex = None):
    if not monsterindex:
        return redirect(url_for("index"))

    export_list = []
    data=get_statblock(monsterindex)
    for stat in data:
        stat.pop("_id")
        export_list.append(stat)
    if export_list == []:
        return redirect(url_for("index"))
    statblock = json.dumps(export_list)
    g.monstername = export_list[0]["name"]


    return render_template("/statblock/showstats.html", monsterindex=monsterindex, stats=statblock)