__author__ = "justi_000"
__date__ = "$May 12, 2015 9:47:20 AM$"

import sqlite3 as lite
import sys

class dbInitializer():
    
    def __init__(self):
        self.connection = lite.connect('cpcp.db')
        self.createMoviesTable()
        self.createTVShowsTable()
    
    def createMoviesTable(self):
        
        with self.connection:
            
            cursor = self.connection.cursor()
            cursor.execute("DROP TABLE IF EXISTS MOVIES")
            cursor.execute("CREATE TABLE MOVIES (\
            OCLC_ID             CHAR (8)            PRIMARY KEY, \
            Title               VARCHAR, \
            Director            VARCHAR, \
            MovieReleaseYear    CHAR (4), \
            DVDReleaseYear      CHAR (4), \
            Country1            CHAR (3), \
            Country2            CHAR (3), \
            Country3            CHAR (3), \
            Genre1              VARCHAR, \
            Genre2              VARCHAR, \
            Genre3              VARCHAR, \
            MPAARating          VARCHAR, \
            RuntimeInMinutes    VARCHAR, \
            CCorSUB             VARCHAR )\
            ")
            
    def createTVShowsTable(self):
        
        with self.connection:
            
            cursor = self.connection.cursor()
            cursor.execute("DROP TABLE IF EXISTS TVSHOWS")
            cursor.execute("CREATE TABLE TVSHOWS (\
            OCLC_ID             CHAR (8)            PRIMARY KEY, \
            ShowTitle           VARCHAR, \
            EpisodeTitle        VARCHAR, \
            SeasonNumber        VARCHAR, \
            EpisodeNumber       VARCHAR, \
            Director            VARCHAR, \
            EpisodeReleaseYear  CHAR (4), \
            DVDReleaseYear      CHAR (4), \
            Country1            CHAR (3), \
            Country2            CHAR (3), \
            Country3            CHAR (3), \
            Genre1              VARCHAR, \
            Genre2              VARCHAR, \
            Genre3              VARCHAR, \
            TVRating            VARCHAR, \
            RuntimeInMinutes    VARCHAR, \
            CCorSUB             VARCHAR )\
            ")
        
initializer = dbInitializer()