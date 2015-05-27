# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$May 21, 2015 11:47:11 AM$"

import sqlite3 as lite
import sys

class dbDataEntry():
    """ Class built for the purpose of data entry. This class will allow a
    member of our team to enter the metadata for movies into our database.
    When complete, it will also automatically fill the tables which store
    the CC/subtitle text. """
    
    def __init__(self):
        # create connection to database and then go to main menu
        self.connection = lite.connect('cpcp.db')
        self.mainMenu()
        
    def mainMenu(self):
        """ Main menu for data entry. """
        while True:
            choice = input("Enter 0 to enter a movie into the database, 1 for a TV show, or 2 to exit: ")
            if choice == "0":
                self.enterMovie()
            elif choice == "1":
                self.enterTVShow()
            elif choice == "2":
                sys.exit()
            else:
                print("Invalid entry. Try again.")

    def enterMovie(self):
        OCLC_ID = input("Enter the DVD's unique OCLC number (from Bucknell's WorldCat catalog): ")
        Title = input("Movie title: ")
        Director = input("Director: ")
        MovieReleaseYear = input("Movie release year: ")
        DVDReleaseYear = input("DVD release year: ")
        while True:
            Country1 = input("Country 1 (3 digit UN code): ")
            Country2 = input("Country 2 (if applicable): ")
            Country3 = input("Country 3 (if applicable): ")
            if len(Country1) == 3 and len(Country2) == 3 and len(Country3) == 3:
                break
            else:
                print("Your 'Country' entries were not 3 digits each. Please \
                use the United Nation's official 3 digit country \
                codes when specifying countries.")
        Genre1 = input("Genre 1 (from imdb): ")
        Genre2 = input("Genre 2 (if applicable): ")
        Genre3 = input("Genre 3 (if applicable): ")
        MPAARating = input("MPAA rating (or enter 'Unrated'): ")
        RuntimeInMinutes = input("Run time (in whole minutes): ")
        CCorSub = input("'CC' or 'Sub': ")
        
        print("\nCarefully verify that the following information is correct: ")
        print("OCLC number: " + OCLC_ID)
        print("Movie title: " + Title)
        print("Movie director: " + Director)
        print("Movie release year: " + MovieReleaseYear)
        print("DVD release year: " + DVDReleaseYear)
        print("Country 1: " + Country1)
        print("Country 2: " + Country2)
        print("Country 3: " + Country3)
        print("Genre 1: " + Genre1)
        print("Genre 2: " + Genre2)
        print("Genre 3: " + Genre3)
        print("MPAA Rating: " + MPAARating)
        print("Run time in minutes: " + RuntimeInMinutes)
        print("'CC' file or 'Sub' file: " + CCorSub)
        
        while True:
            verification = input("Enter 1 if all the information above is correct, or 0 to reenter data: ")

            if verification == "1":
                with self.connection:

                    cursor = self.connection.cursor()
                    cursor.execute("INSERT INTO MOVIES VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", \
                    (OCLC_ID, Title, Director, MovieReleaseYear, DVDReleaseYear, Country1, Country2, \
                    Country3, Genre1, Genre2, Genre3, MPAARating, RuntimeInMinutes, CCorSub))

                # create the table to hold this movie's text
                self.createMediaTextTable(OCLC_ID, CCorSub)
                break
            elif verification == "0":
                self.enterMovie()
            else:
                print("Invalid entry. Try again.")
    
    def enterTVShow(self):
        OCLC_ID = input("Enter the DVD's unique OCLC number (from Bucknell's WorldCat catalog): ")
        ShowTitle = input("Show title: ")
        EpisodeTitle = input("Episode title: ")
        SeasonNumber = input("Season number: ")
        EpisodeNumber = input("Episode number: ")
        Director = input("Director: ")
        EpisodeReleaseYear = input("Episode release year: ")
        DVDReleaseYear = input("DVD release year: ")
        while True:
            Country1 = input("Country 1 (3 digit UN code): ")
            Country2 = input("Country 2 (if applicable): ")
            Country3 = input("Country 3 (if applicable): ")
            if len(Country1) == 3 and len(Country2) == 3 and len(Country3) == 3:
                break
            else:
                print("Your 'Country' entries were not 3 digits each. Please \
                use the United Nation's official 3 digit country \
                codes when specifying countries.")
        Genre1 = input("Genre 1: ")
        Genre2 = input("Genre 2 (if applicable): ")
        Genre3 = input("Genre 3 (if applicable): ")
        TVRating = input("TV rating: ")
        RuntimeInMinutes = input("Run time (in minutes): ")
        CCorSub = input("CC or Sub: ")
        
        print("\nCarefully verify that the following information is correct: ")
        print("OCLC number: " + OCLC_ID)
        print("Show title: " + ShowTitle)
        print("Episode title: " + EpisodeTitle)
        print("Season number: " + SeasonNumber)
        print("Episode number: " + EpisodeNumber)
        print("Show/episode director: " + Director)
        print("Episode release year: " + EpisodeReleaseYear)
        print("DVD release year: " + DVDReleaseYear)
        print("Country 1: " + Country1)
        print("Country 2: " + Country2)
        print("Country 3: " + Country3)
        print("Genre 1: " + Genre1)
        print("Genre 2: " + Genre2)
        print("Genre 3: " + Genre3)
        print("TV Rating: " + TVRating)
        print("Run time in minutes: " + RuntimeInMinutes)
        print("'CC' file or 'Sub' file: " + CCorSub)
        
        while True:
            verification = input("Enter 1 if all the information above is correct, or 0 to reenter data: ")

            if verification == "1":
        
                with self.connection:

                    cursor = self.connection.cursor()
                    cursor.execute("INSERT INTO MOVIES VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", \
                    (OCLC_ID, ShowTitle, EpisodeTitle, SeasonNumber, EpisodeNumber, \
                    Director, EpisodeReleaseYear, DVDReleaseYear, Country1, Country2, \
                    Country3, Genre1, Genre2, Genre3, TVRating, RuntimeInMinutes, CCorSub))

                # create the table to hold this tv show's text
                self.createMediaTextTable(OCLC_ID, CCorSub)
                break
            elif verification == "0":
                self.enterTVShow()
            else:
                print("Invalid entry. Try again.")
    
    def createMediaTextTable(self, oclcId, CCorSub):
        """ This method creates a table to store the text of an individual movie
        or TV Show, given the oclc number of the DVD. """
        
        with self.connection:
            
            cursor = self.connection.cursor()
            # NOTE: concatenating the table name onto the SQL command in the manner
            # below may leave the program vulnerable to SQL injection.
            # Look for better way of doing this, for sake of online version.
            # (This may not be a concern since it's in the database setup phase)
            tableName = CCorSub[0] + oclcId
            cursor.execute("DROP TABLE IF EXISTS " + tableName)
            cursor.execute("CREATE VIRTUAL TABLE " + tableName + " USING fts4( \
            LineNumber          VARCHAR            PRIMARY KEY, \
            StartTimeStamp      VARCHAR, \
            EndTimeStamp        VARCHAR, \
            LineText            VARCHAR)")
            
        self.fillMediaTextTable(tableName)
            
    def fillMediaTextTable(self, tableName):
        """ Method to fill a movie/tv show's text table from the text file.
        Text files should be named OCLC_ID_NUMBER.txt """
        
        with open(tableName[1:]+".txt",'r') as file:
            currentLineNumber = "1"
            nextLineNumber = "1"
            startTimeStamp = ""
            endTimeStamp = ""
            lineText = ""
            firstRun = True
            
            for line in file:
                
                if line[0:len(nextLineNumber)] == nextLineNumber:
                    print("Found line " + nextLineNumber)
                    if firstRun == False:
                        with self.connection:
                            cursor = self.connection.cursor()
                            cursor.execute("INSERT INTO " + tableName + " \
                            (LineNumber, StartTimeStamp, EndTimeStamp, LineText) VALUES (?,?,?,?)",\
                            (currentLineNumber,startTimeStamp,endTimeStamp,lineText))
                    currentLineNumber = nextLineNumber
                    nextLineNumber = str(int(nextLineNumber) + 1)
                    lineText = ""
                    firstRun = False
                elif len(line) >= 9 and line[2] == ":" and line[5] == ":" and line[8] == ",":
#                    and line[19] == ":" and line[22] == ":" and line[25] == ",":
                        print("Found timestamp line #" + currentLineNumber)
                        timeStampLine = line
                        startTimeStamp = timeStampLine[0:12]
                        endTimeStamp = timeStampLine[17:29]
                else:
                    print(line)
                    lineText += line
    
dataEntry = dbDataEntry()