#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

__author__ = 'Justin Eyster'

# settings for the sql database, change host to localhost when putting this file on the web server
# and change host to 50.87.248.230 when using a local development server

DATABASE = {
    'drivername': 'postgresql+psycopg2',
    'host': '50.87.248.230',
    # 'host': 'localhost',
    'database': 'filmtvse_cpcp',
    'username': 'filmtvse_eyster',
    'password': 'BucknellDH17837!',
    'port': '5432'
}