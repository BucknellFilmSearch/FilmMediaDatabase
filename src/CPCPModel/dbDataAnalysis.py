# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$May 29, 2015 9:26:40 AM$"

import sqlite3 as lite
import sys

def cumulativeOccurrencesAcrossReleaseYears(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MovieReleaseYear, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MovieReleaseYear")
        data = cursor.fetchall()
        print(data)
        return data
    
def occurrencesAcrossReleaseYears(keywordOrPhrase):
    """ Same as above but counts each movie only once. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MovieReleaseYear, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MovieReleaseYear")
        data = cursor.fetchall()
        print(data)
        return data
        
def occurrencesAcrossTimeStamps(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT ALLTEXT.StartTimeStamp, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY StartTimeStamp")
        data = cursor.fetchall()
        print(data)
        return data
    
def cumulativeOccurrencesByMPAARating(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MPAARating, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MPAARating")
        data = cursor.fetchall()
        print(data)
        return data
    
occurrencesAcrossReleaseYears("cell phone")
    