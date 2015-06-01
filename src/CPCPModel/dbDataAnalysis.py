# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$May 29, 2015 9:26:40 AM$"

import sqlite3 as lite
import sys

def searchResults(keywordOrPhrase):
    """ This returns the search results for a keyword or phrase, and includes
    title, time stamps, and the matched text. I will say, however, that the data
    looks far better in table form than it does in the format that this function 
    produces. 
    """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Title, ALLTEXT.StartTimeStamp, \
        ALLTEXT.EndTimeStamp, ALLTEXT.LineText FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'")
        data = cursor.fetchall()
        return data
    
def totalMovies():
    """ Returns total number of movies in the database. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM MOVIES")
        data = cursor.fetchall()
        return data[0][0]
    
def occurrencesByTimeStamps(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT ALLTEXT.StartTimeStamp, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY StartTimeStamp")
        data = cursor.fetchall()
        return data

def cumulativeOccurrencesByReleaseYear(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MovieReleaseYear, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MovieReleaseYear")
        data = cursor.fetchall()
        return data
    
def occurrencesByReleaseYear(keywordOrPhrase):
    """ Same as above but counts each movie only once. Useful for returning
    percentage of movies containing keyword in certain year. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MovieReleaseYear, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MovieReleaseYear")
        data = cursor.fetchall()
        return data
    
def totalMoviesOfSpecifiedYear(year):
    """ Helper function for percentageOfOccurrenceByReleaseYear. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES \
        WHERE MOVIES.MovieReleaseYear = " + year)
        data = cursor.fetchall()
        return data[0][0]
    
def percentageOfOccurrenceByReleaseYear(keywordOrPhrase):
    """ Returns the percentages of movies containing the keyword/phrase for each
    movie release year that occurs in the database. """
    counts = occurrencesByReleaseYear(keywordOrPhrase)
    listOfPercentages = []
    for count in counts:
        listOfPercentages += [(count[0], 100 * count[1] / totalMoviesOfSpecifiedYear(count[0]))]
    return listOfPercentages
    
def cumulativeOccurrencesByMPAARating(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MPAARating, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MPAARating")
        data = cursor.fetchall()
        return data
    
def occurrencesByMPAARating(keywordOrPhrase):
    """ Same as above but counts each movie only once. Useful for returning
    percentage of movies containing keyword of certain rating. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.MPAARating, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY MPAARating")
        data = cursor.fetchall()
        return data
    
def totalMoviesOfSpecifiedMPAARating(rating):
    """ Helper function for percentageOfOccurrenceByMPAARating. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES \
        WHERE MOVIES.MPAARating = '" + rating + "'")
        data = cursor.fetchall()
        return data[0][0]
    
def percentageOfOccurrenceByMPAARating(keywordOrPhrase):
    """ Returns the percentages of movies containing the keyword/phrase for each
    movie MPAA rating that occurs in the database. """
    counts = occurrencesByMPAARating(keywordOrPhrase)
    listOfPercentages = []
    for count in counts:
        listOfPercentages += [(count[0], 100 * count[1] / totalMoviesOfSpecifiedMPAARating(count[0]))]
    return listOfPercentages
    
def cumulativeOccurrencesByGenre1(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre1, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre1")
        data = cursor.fetchall()
        return data
    
def cumulativeOccurrencesByGenre2(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre2, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre2")
        data = cursor.fetchall()
        return data
    
def cumulativeOccurrencesByGenre3(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre3, COUNT(*) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre3")
        data = cursor.fetchall()
        return data
    
def cumulativeOccurrencesByGenre(keywordOrPhrase, genre):
    """ Function to return the total occurrences of a keyword/phrase in movies
    of a specified genre. Less efficient than searching metadata categories
    that only have one column. Has to query the database three times instead
    of once, and then sum the results.
    """
    genre1Counts = cumulativeOccurrencesByGenre1(keywordOrPhrase)
    genre2Counts = cumulativeOccurrencesByGenre2(keywordOrPhrase)
    genre3Counts = cumulativeOccurrencesByGenre3(keywordOrPhrase)
    totalOccurrencesInGenre = 0
    # count occurrences of keyword in genre1, matching specified genre
    for count1 in genre1Counts:
        if count1[0] == genre:
            totalOccurrencesInGenre += count1[1]
    # count occurrences of keyword in genre2, matching specified genre
    for count2 in genre2Counts:
        if count2[0] == genre:
            totalOccurrencesInGenre += count2[1]
    # count occurrences of keyword in genre3, matching specified genre
    for count3 in genre3Counts:
        if count3[0] == genre:
            totalOccurrencesInGenre += count3[1]
    
    return totalOccurrencesInGenre

def occurrencesByGenre1(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre1, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre1")
        data = cursor.fetchall()
        return data
    
def occurrencesByGenre2(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre2, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre2")
        data = cursor.fetchall()
        return data
    
def occurrencesByGenre3(keywordOrPhrase):
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MOVIES.Genre3, COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES, ALLTEXT \
        WHERE ALLTEXT.OCLC_ID = MOVIES.OCLC_ID AND ALLTEXT.LineText MATCH '" \
        + keywordOrPhrase + "'" + " GROUP BY Genre3")
        data = cursor.fetchall()
        return data
    
def occurrencesByGenre(keywordOrPhrase, genre):
    """ Function to return the total occurrences of a keyword/phrase in movies
    of a specified genre. Less efficient than searching metadata categories
    that only have one column. Has to query the database three times instead
    of once, and then sum the results.
    """
    genre1Counts = occurrencesByGenre1(keywordOrPhrase)
    genre2Counts = occurrencesByGenre2(keywordOrPhrase)
    genre3Counts = occurrencesByGenre3(keywordOrPhrase)
    totalOccurrencesInGenre = 0
    # count occurrences of keyword in genre1, matching specified genre
    for count1 in genre1Counts:
        if count1[0] == genre:
            totalOccurrencesInGenre += count1[1]
    # count occurrences of keyword in genre2, matching specified genre
    for count2 in genre2Counts:
        if count2[0] == genre:
            totalOccurrencesInGenre += count2[1]
    # count occurrences of keyword in genre3, matching specified genre
    for count3 in genre3Counts:
        if count3[0] == genre:
            totalOccurrencesInGenre += count3[1]
    
    return totalOccurrencesInGenre

def totalMoviesOfSpecifiedGenre(genre):
    """ Helper function for percentageOfOccurrenceByGenre. """
    connection = lite.connect('cpcp.db')
    with connection:
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(DISTINCT MOVIES.OCLC_ID) FROM MOVIES \
        WHERE MOVIES.Genre1 = '" + genre + "' OR MOVIES.Genre2 = '" + genre \
        + "' OR MOVIES.Genre3 = '" + genre + "'")
        data = cursor.fetchall()
        return data[0][0]
    
def percentageOfOccurrenceByGenre(keywordOrPhrase, genre):
    """ Returns the percentages of movies containing the keyword/phrase for each
    movie genre that occurs in the database. """
    count = occurrencesByGenre(keywordOrPhrase, genre)
    if totalMoviesOfSpecifiedGenre(genre) != 0:
        percentage = 100 * count / totalMoviesOfSpecifiedGenre(genre)
    else:
        percentage = 0.0
    return [(genre, percentage)]

print(totalMovies())
print(percentageOfOccurrenceByReleaseYear("cell phone"))