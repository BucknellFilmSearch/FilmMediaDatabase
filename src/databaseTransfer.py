__author__ = 'justi_000'

import sqlite3 as lite
import pymysql

sqliteConnection = lite.connect('cpcp.db')
mysqlConnection = pymysql.connect(user="filmtvse_eyster",host="50.87.248.230",database="filmtvse_cpcp",
                                      password="BucknellDH17837!",port=3306)

with sqliteConnection:
    cursor = sqliteConnection.cursor()
    sql = "SELECT * FROM MOVIES"
    cursor.execute(sql)
    movieData = cursor.fetchall()
    sql = "SELECT * FROM ALLTEXT"
    cursor.execute(sql)
    textData = cursor.fetchall()

for movie in movieData:
    oclc_id = int(movie[0])
    movie_or_tv_show = "Movie"
    movie_title = movie[1]
    show_title = None
    episode_title = None
    season_number = None
    episode_number = None
    director = movie[2]
    original_release_year = int(movie[3])
    dvd_release_year = int(movie[4])
    country1 = movie[5]
    country2 = movie[6]
    country3 = movie[7]
    genre1 = movie[8]
    genre2 = movie[9]
    genre3 = movie[10]
    content_rating = movie[11]
    runtime_in_minutes = movie[12]
    cc_or_sub = movie[12]
    keyword_count = 0
