#!/usr/bin/python

import psycopg2
import sys
import os
import urllib
import json

with open("src/dbConfig.json", 'r') as json_file:
    json_data = json.load(json_file)

#this is super bad. put in a config file to hide
username = json_data["DATABASE"]["username"]
password = json_data["DATABASE"]["password"]
host = json_data["DATABASE"]["host"]
port = json_data["DATABASE"]["port"]

print "Creating images/ directory if one does not already exist"
try:
    os.stat("images")
except:
    os.mkdir("images")

try:
    print "Logging into the database..."
    conn = psycopg2.connect(dbname='filmtvse_cpcp', user=username, host=host, password=password, port=port)
    print("Login Success!")
except psycopg2.Error as e:
    print "Connection to db failed"
    print e
    sys.exit(1)

cursor = conn.cursor()

try:
    cursor.execute("SELECT oclc_id FROM media_metadata") #unique movies
    movies = cursor.fetchall()
    for movie in movies:
        print("In directory " + str(movie[0]))
        directory = "./images/" + str(movie[0]) #movie is a tuple so take movie[0]
        try:
            os.stat(directory)
        except:
            os.mkdir(directory)
        cursor.execute("SELECT line_number, db_line_id  FROM media_text WHERE oclc_id = " + str(movie[0]));
        line_numbers = cursor.fetchall()
        for line_number in line_numbers:
            print('\tdownloading image number ' + str(line_number[0]))
            #download(http://www.filmtvsearch.net/static/imageFiles/screenshots/" + str(movie[0]) + "/" + str(line_number[0]) + ".png")
            url = "http://www.filmtvsearch.net/static/imageFiles/screenshots/" + str(movie[0]) + "/" + str(line_number[0]) + ".png"
            path = './images/' + str(movie[0]) + "/" + str(line_number[1]) + ".png"
            if(os.path.isfile(path)):
                print("\t" + str(line_number[1]) + ".png already exists")
            else:
                urllib.urlretrieve(url, path)
except psycopg2.Error as e:
    print('Fetching images failed')
    print e
    sys.exit(1)

sys.exit(0)
