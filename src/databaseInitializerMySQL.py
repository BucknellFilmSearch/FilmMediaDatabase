__author__ = 'justi_000'

import pymysql

connection = pymysql.connect(user="filmtvse_eyster",host="50.87.248.230",database="filmtvse_cpcp",
                                      password="BucknellDH17837!",port=3306)

try:
    with connection.cursor() as cursor:
        sql = "CREATE TABLE MEDIA (" + \
            "oclc_id INTEGER NOT NULL," + \
            "movie_or_tv_show VARCHAR(6) NOT NULL," + \
            "movie_title VARCHAR(50)," + \
            "show_title VARCHAR(50)," + \
            "episode_title VARCHAR(50)," + \
            "season_number INTEGER," + \
            "episode_number INTEGER," + \
            "director VARCHAR(50) NOT NULL," + \
            "original_release_year INTEGER NOT NULL," + \
            "dvd_release_year INTEGER NOT NULL," + \
            "country1 VARCHAR(3) NOT NULL," + \
            "country2 VARCHAR(3)," + \
            "country3 VARCHAR(3)," + \
            "genre1 VARCHAR(25) NOT NULL," + \
            "genre2 VARCHAR(25)," + \
            "genre3 VARCHAR(25)," + \
            "content_rating VARCHAR(5) NOT NULL," + \
            "runtime_in_minutes INTEGER NOT NULL," + \
            "cc_or_sub VARCHAR(3) NOT NULL," + \
            "keyword_count INTEGER," + \
            "PRIMARY KEY (oclc_id))"
        cursor.execute(sql)
        sql = "CREATE TABLE ALLTEXT (" + \
            "db_line_id INTEGER NOT NULL AUTO_INCREMENT," + \
            "oclc_id INTEGER NOT NULL," + \
            "line_number INTEGER NOT NULL," + \
            "start_time_stamp VARCHAR(12) NOT NULL," + \
            "end_time_stamp VARCHAR(12) NOT NULL," + \
            "line_text VARCHAR(200) NOT NULL," + \
            "PRIMARY KEY (db_line_id)," + \
            "FOREIGN KEY (oclc_id) REFERENCES MEDIA (oclc_id) ON DELETE CASCADE," + \
            "FULLTEXT (line_text))"
        cursor.execute(sql)
    connection.commit()
finally:
    connection.close()