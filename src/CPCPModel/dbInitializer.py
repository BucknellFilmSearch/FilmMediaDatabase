__author__ = "Justin Eyster"
__date__ = "$May 12, 2015 9:47:20 AM$"

import sqlite3 as lite
import sys

class dbInitializer():
    """ A class which, when initialized, will initialize the main project database
    in an empty condition. If the database already exists (and it will, more often than not)
    the program asks the user if they want to re-initialize the database. 
    Doing so erases the database and sets up the database in a clean, 
    data-less condition. USE CAUTION OR THIS COULD CAUSE DATA LOSS! """
    
    def __init__(self):
        while True:
            # safeguard to prevent erasing important data
            choice = input("Are you sure you want to re-initialize the database?" 
            + " If the database already exists, this will erase all entries currently"
            + " in the database. Enter 9 to erase and reset the database. Enter 1 to cancel: ")
            if choice == "9":
                self.connection = lite.connect('cpcp.db')
                self.createMoviesTable()
                self.createTVShowsTable()
                self.createAllTextTable()
                break
            elif choice == "1":
                sys.exit()
            else:
                print("Invalid choice. Try again.")
    
    def createMoviesTable(self):
        """ This method creates the MOVIES table in the database. """
        
        with self.connection:
            
            cursor = self.connection.cursor()
            cursor.execute("DROP TABLE IF EXISTS MOVIES")
            cursor.execute("CREATE TABLE MOVIES (\
            OCLC_ID             INTEGER            PRIMARY KEY, \
            Title               VARCHAR, \
            Director            VARCHAR, \
            MovieReleaseYear    INTEGER, \
            DVDReleaseYear      INTEGER, \
            Country1            CHAR (3), \
            Country2            CHAR (3), \
            Country3            CHAR (3), \
            Genre1              VARCHAR, \
            Genre2              VARCHAR, \
            Genre3              VARCHAR, \
            MPAARating          VARCHAR, \
            RuntimeInMinutes    INTEGER, \
            CCorSUB             VARCHAR )")
            
    def createTVShowsTable(self):
        """ This method creates the TVSHOWS table in the database. """
        
        with self.connection:
            
            cursor = self.connection.cursor()
            cursor.execute("DROP TABLE IF EXISTS TVSHOWS")
            cursor.execute("CREATE TABLE TVSHOWS (\
            OCLC_ID             INTEGER            PRIMARY KEY, \
            ShowTitle           VARCHAR, \
            EpisodeTitle        VARCHAR, \
            SeasonNumber        INTEGER, \
            EpisodeNumber       INTEGER, \
            Director            VARCHAR, \
            EpisodeReleaseYear  INTEGER, \
            DVDReleaseYear      INTEGER, \
            Country1            CHAR (3), \
            Country2            CHAR (3), \
            Country3            CHAR (3), \
            Genre1              VARCHAR, \
            Genre2              VARCHAR, \
            Genre3              VARCHAR, \
            TVRating            VARCHAR, \
            RuntimeInMinutes    INTEGER, \
            CCorSUB             VARCHAR )")
            
    def createAllTextTable(self):
        """ This method creates a table to store the text of ALL the movies
        and TV Shows, implementing the fts4 sqlite module for maximum
        search efficiency."""
        
        with self.connection:
            
            cursor = self.connection.cursor()

            cursor.execute("DROP TABLE IF EXISTS ALLTEXT")
            cursor.execute("CREATE VIRTUAL TABLE ALLTEXT USING fts4( \
            OCLC_ID             INTEGER, \
            LineNumber          INTEGER            PRIMARY KEY, \
            StartTimeStamp      VARCHAR, \
            EndTimeStamp        VARCHAR, \
            LineText            VARCHAR, \
            CONSTRAINT OCLC_ID_MOVIEFK FOREIGN KEY (OCLC_ID) \
                REFERENCES MOVIES(OCLC_ID) \
                ON DELETE CASCADE \
            CONSTRAINT OCLC_ID_TVFK FOREIGN KEY (OCLC_ID) \
                REFERENCES TVSHOWS(OCLC_ID) \
                ON DELETE CASCADE)")
        
initializer = dbInitializer()