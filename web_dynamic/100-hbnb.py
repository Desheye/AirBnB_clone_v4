#!/usr/bin/python3
"""Starts a Flask web application.

The application listens on 0.0.0.0, port 5000.
Routes:
    /0-hbnb: HBnB home page.
"""
import uuid  # Import the uuid module to generate UUIDs
from models import storage
from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route("/100-hbnb", strict_slashes=False)
def hbnb():
    """Displays the main HBnB filters HTML page."""
    states = storage.all("State")
    amenities = storage.all("Amenity")
    places = storage.all("Place")

    # Generate a UUID as the cache_id variable
    cache_id = uuid.uuid4()

    return render_template("100-hbnb.html",
                           states=states, amenities=amenities,
                           places=places, cache_id=cache_id)


@app.teardown_appcontext
def teardown(exc):
    """Remove the current SQLAlchemy session."""
    storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0")