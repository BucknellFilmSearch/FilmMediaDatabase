#!/usr/bin/python
from __future__ import print_function

import os
import sys
import json
import psycopg2

this_file = os.path.dirname(__file__)
config_file = os.path.join(this_file, 'dbConfig.json')

# Load the config file
with open(config_file) as db_config:
    pg_config = json.loads(db_config.read())


conn = psycopg2.connect(**pg_config)
cur = conn.cursor()
psycopg2.extensions.register_type(psycopg2.extensions.UNICODE, cur)

def main():
    while True:
        try:
            recognized_object = str(raw_input())
            print(recognized_object)
        except(Exception):
            break

        # Done - exit
        if (recognized_object == ''):
            break

        # JSON data
        data = json.loads(recognized_object)

        # Connect to postgres library
        cur.execute('''
            INSERT INTO media_recognized_objects
              (db_line_id, text_label, confidence, bounding_left, bounding_right, bounding_top, bounding_bottom)
            VALUES
              (%(db_line_id)s, %(label)s, %(confidence)s, %(l)s, %(r)s, %(t)s, %(b)s)
            ON CONFLICT DO NOTHING;
            ''', data)

    # commit all 
    conn.commit()
    conn.close
        

if __name__ == '__main__':
    main()
