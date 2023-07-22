#!/bin/bash

# Apply database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8001
