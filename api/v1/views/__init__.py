#!/usr/bin/python3
"""
the views
"""

from api.v1.views.states import *
from api.v1.views.index import *
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

# Import and expose specific modules

# from api.v1.views import index
# from api.v1.views import states
# from api.v1.views import amenities
# from api.v1.views import cities
# from api.v1.views import places
# from api.v1.views import places_reviews
# from api.v1.views import users
# from api.v1.views import places_amenities
