# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps.home import blueprint
from flask import render_template, request,jsonify
from flask_login import login_required
from jinja2 import TemplateNotFound
import requests

@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')

@blueprint.route('/<template>')
@login_required
def route_template(template):
    

    try:

        if not template.endswith('.html'):
            pass

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None




@blueprint.route("/api/<point>")
def getvoltage(point):
    if point == 'voltage':
        num = 1
    elif point == "charge":
        num = 2
    elif point == 'bookings':
        return render_template("home/bookings.html",segment="bookings")
    else :
        e = []
        for i in (1,2):
            g = []
            f = requests.get(f"https://thingspeak.com/channels/2084395/field/{i}.json?&amp;offset=0&amp").json()
            f = f["feeds"]
            time = []
            value = []
            for j in f:
                time.append(j['created_at'].split("T")[1].split("Z")[0])
                value.append(float(j[f"field{i}"]))
            g.append(time)
            g.append(value)
            e.append(g)
        
        return jsonify(e)


    url  =f"https://thingspeak.com/channels/2084395/field/{num}.json?&amp;offset=0&amp"
    re = requests.get(url).json()  
    return jsonify(re)