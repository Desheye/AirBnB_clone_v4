#!/usr/bin/python3
"""
This script implements a Flask application integrated with an AirBnB static HTML Template.
"""
from flask import Flask, render_template
from models import storage
import uuid


# Flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
PORT = 5000
HOST = '0.0.0.0'


# Teardown function for SQLAlchemy session
@app.teardown_appcontext
def close_db(exception):
    """
    Closes the current SQLAlchemy session after each request.
    """
    storage.close()


@app.route('/1-hbnb/')
def show_hbnb_filters():
    """
    Renders a custom template with states, cities, and amenities for an AirBnB-like application.
    """
    states_objects = storage.all('State').values()
    states = {state.name: state for state in states_objects}
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = {user.id: f"{user.first_name} {user.last_name}" for user in storage.all('User').values()}
    cache_id = uuid.uuid4()
    return render_template('1-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           users=users,
                           cache_id=cache_id)


if __name__ == "__main__":
    """
    Main entry point for the Flask application.
    """
    app.run(host=HOST, port=PORT)