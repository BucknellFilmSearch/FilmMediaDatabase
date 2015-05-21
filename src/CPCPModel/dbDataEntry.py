# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$May 21, 2015 11:47:11 AM$"

import sqlite3 as lite
import sys

class dbDataEntry():
    
    def __init__(self):
        self.connection = lite.connect('cpcp.db')
        self.mainMenu()
        
    def mainMenu(self):
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
        Country1 = input("Country 1: ")
        Country2 = input("Country 2 (if applicable): ")
        Country3 = input("Country 3 (if applicable): ")
        Genre1 = input("Genre 1: ")
        Genre2 = input("Genre 2 (if applicable): ")
        Genre3 = input("Genre 3 (if applicable): ")
        MPAARating = input("MPAA rating: ")
        RuntimeInMinutes = input("Run time (in minutes): ")
        CCorSub = input("CC or Sub: ")
        
        with self.connection:
            
            cursor = self.connection.cursor()
            cursor.execute("INSERT INTO MOVIES VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", \
            (OCLC_ID, Title, Director, MovieReleaseYear, DVDReleaseYear, Country1, Country2, \
            Country3, Genre1, Genre2, Genre3, MPAARating, RuntimeInMinutes, CCorSub))
    
    def enterTVShow(self):
        pass
    
dataEntry = dbDataEntry()