__author__ = 'justi_000'

import sqlite3 as lite
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import URL
from sqlalchemy.sql.expression import insert
from postgresSettings import DATABASE
from MediaText import MediaText
from MediaMetadata import MediaMetadata

sqliteConnection = lite.connect('cpcp.db')
postgresEngine = create_engine(URL(**DATABASE))

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
    runtime_in_minutes = int(movie[12])
    cc_or_sub = movie[12]
    keyword_count = 0

    postgresEngine.execute(MediaMetadata.__table__.insert((oclc_id,movie_or_tv_show,movie_title,show_title,episode_title,season_number,
                                   episode_number,director,original_release_year,dvd_release_year,country1,country2,
                                   country3,genre1,genre2,genre3,content_rating,runtime_in_minutes,cc_or_sub,
                                   keyword_count)))

count = 0
for line in textData:
    db_line_id = count
    count += 1
    oclc_id = int(line[0])
    line_number = int(line[1])
    start_time_stamp = line[2]
    end_time_stamp = line[3]
    line_text = line[4]
    search_vector = None

    postgresEngine.execute(MediaText.__table__.insert((db_line_id,oclc_id,line_number,start_time_stamp,end_time_stamp,
                                                       line_text,search_vector)))
