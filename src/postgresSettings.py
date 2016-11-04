#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

from config import DEBUG_MODE

__author__ = 'Justin Eyster'

# settings for the sql database, change host to localhost when putting this file on the web server
# and change host to 50.87.248.230 when using a local development server

DATABASE = {
    'drivername': 'postgresql+psycopg2',
    'host': ('50.87.248.230' if DEBUG_MODE else 'localhost'),
    # 'host': 'localhost',
    'database': 'filmtvse_cpcp',
    'username': 'filmtvse_nasimi',
    'password': 'BucknellDH17837!',
    'port': '5432'
}
