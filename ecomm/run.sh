#!/bin/bash
cd /home/docker/code/app
while true; do
 echo "Restarting Django development server"
 /usr/local/bin/python manage.py runserver 0.0.0.0:8000
 sleep 2
done
