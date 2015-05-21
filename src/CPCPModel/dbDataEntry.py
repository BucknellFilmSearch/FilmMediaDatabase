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
            choice = input("Enter 0 to enter a movie into the database, 1 for a TV show, or 2 to exit.")
            if choice == 0:
                self.enterMovie()
            elif choice == 1:
                self.enterTVShow()
            elif choice == 2:
                sys.exit()
            else:
                print("Invalid entry. Try again.")
