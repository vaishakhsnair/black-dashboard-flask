# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask import Blueprint
import flask_cors
blueprint = Blueprint(
    'home_blueprint',
    __name__,
    url_prefix=''
)
