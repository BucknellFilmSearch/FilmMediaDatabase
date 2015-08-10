#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

__author__ = "Justin Eyster"
__date__ = "$May 29, 2015 9:26:40 AM$"

from sqlalchemy import create_engine, distinct, func
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker
from postgresSettings import DATABASE
from datetime import datetime
from MediaText import MediaText
from MediaMetadata import MediaMetadata

# create connection to database
engine = create_engine(URL(**DATABASE))
Session = sessionmaker(bind=engine)

def search(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear,defaultEarliestReleaseYear):
    currentYear = datetime.now().year
    # no params specified
    if genre == "All" and earliestReleaseYear==defaultEarliestReleaseYear and latestReleaseYear==currentYear:
        results = searchResults(keywordOrPhrase)
    # if genre specified, no release year params specified
    elif genre != "All" and earliestReleaseYear==defaultEarliestReleaseYear and latestReleaseYear==currentYear:
        results = searchResultsByGenre(keywordOrPhrase,genre)
    # if genre specified, and one or both release year params specified
    elif genre != "All" and (earliestReleaseYear!=defaultEarliestReleaseYear or latestReleaseYear!=currentYear):
        if earliestReleaseYear=="":
            earliestReleaseYear = defaultEarliestReleaseYear
        if latestReleaseYear=="":
            latestReleaseYear = str(datetime.now().year)
        results = searchResultsByGenreAndReleaseYear(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear)
    # if genre not specified, and one or both release year params specified
    elif genre == "All" and (earliestReleaseYear!=defaultEarliestReleaseYear or latestReleaseYear!=currentYear):
        if earliestReleaseYear=="":
            earliestReleaseYear = defaultEarliestReleaseYear
        if latestReleaseYear=="":
            latestReleaseYear = str(datetime.now().year)
        results = searchResultsByReleaseYear(keywordOrPhrase,earliestReleaseYear,latestReleaseYear)
    return results

def updateKeywordCount(listOfOclcIds):
    if len(listOfOclcIds) > 0:
        session = Session()
        currentId = listOfOclcIds[0][0]
        currentCount = 0
        for id in listOfOclcIds:
            oclcId = id[0]
            if oclcId == currentId:
                currentCount += 1
            else:
                MediaMetadata.__table__.update().\
                    where(MediaMetadata.__table__.c.oclc_id == currentId).\
                    values(keywordCount = currentCount)
                currentId = oclcId
                currentCount = 1
        MediaMetadata.__table__.update().\
            where(MediaMetadata.__table__.c.oclc_id == currentId).\
            values(keywordCount = currentCount)

# rewritten for postgresql and sqlalchemy
def searchResults(keywordOrPhrase):
    """
    This returns the search results for a keyword or phrase, and includes the oclc id, movie title, line number of
    the occurrence, time stamps, and the matched text.
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase))
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByGenre(keywordOrPhrase,genre):
    """
    This returns the search results for a keyword or phrase, and includes the oclc id, movie title, line number of
    the occurrence, time stamps, and the matched text.
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase))
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByGenreAndReleaseYear(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear):
    """
    This returns the search results for a keyword or phrase, and includes the oclc id, movie title, line number of
    the occurrence, time stamps, and the matched text.
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase))
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
        filter(MediaMetadata.original_release_year >= earliestReleaseYear and MediaMetadata.original_release_year <= latestReleaseYear).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByReleaseYear(keywordOrPhrase,earliestReleaseYear,latestReleaseYear):
    """
    This returns the search results for a keyword or phrase, and includes the oclc id, movie title, line number of
    the occurrence, time stamps, and the matched text.
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase))
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaMetadata.original_release_year >= earliestReleaseYear and MediaMetadata.original_release_year <= latestReleaseYear).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def totalMovies():
    """ Returns total number of movies in the database. """
    session = Session()
    query = session.query(func.count(MediaMetadata.oclc_id)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    return query.all()[0][0]

# rewritten for postgresql and sqlalchemy
def getContextLines(oclcId,lineNumber,numLines):
    """
    :param oclcId: unique id for the media
    :param lineNumber: line to get context of
    :return: 25 lines before and after the given line
    """
    session = Session()
    query = session.query(MediaText.line_number, MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text).\
        filter(MediaText.oclc_id == oclcId).\
        filter(MediaText.line_number >= (lineNumber - numLines) and MediaText.line_number <= (lineNumber + numLines)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaText.line_number.asc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def getMovieInfo(oclcId):
    session = Session()
    query = session.query(MediaMetadata.movie_title, MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaMetadata.oclc_id == oclcId).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    return query.all()

# rewritten for postgresql and sqlalchemy
def cumulativeOccurrencesByReleaseYear(keywordOrPhrase):
    session = Session()
    query = session.query(MediaMetadata.original_release_year, MediaText.count()).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.original_release_year.asc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def occurrencesByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear):
    """ Same as above but counts each movie only once. Useful for returning
    percentage of movies containing keyword in certain year. """
    session = Session()
    if genre != "All":
        query = session.query(MediaMetadata.original_release_year, func.count(distinct(MediaText.oclc_id))).\
            filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
            filter(MediaMetadata.original_release_year.between(earliestReleaseYear, latestReleaseYear)).\
            filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
            filter(MediaText.search_vector.match(keywordOrPhrase)).\
            filter(MediaMetadata.movie_or_tv_show == "Movie").\
            order_by(MediaMetadata.original_release_year.asc())
    else:
        query = session.query(MediaMetadata.original_release_year, func.count(distinct(MediaText.oclc_id))).\
            filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
            filter(MediaMetadata.original_release_year.between(earliestReleaseYear, latestReleaseYear)).\
            filter(MediaText.search_vector.match(keywordOrPhrase)).\
            filter(MediaMetadata.movie_or_tv_show == "Movie").\
            order_by(MediaMetadata.original_release_year.asc())
    return query.all()

# rewritten for postgresql and sqlalchemy
def totalMoviesOfSpecifiedYear(year):
    """ Helper function for percentageOfOccurrenceByReleaseYear. """
    session = Session()
    query = session.query(func.count(distinct(MediaMetadata.oclc_id))).\
        filter(MediaMetadata.original_release_year == year).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    return query.all()

# rewritten for postgresql and sqlalchemy
def percentageOfOccurrenceByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear):
    """ Returns the percentages of movies containing the keyword/phrase for each
    movie release year that occurs in the database. """
    counts = occurrencesByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear)
    listOfPercentages = []
    for count in counts:
        listOfPercentages += [(count[0], 100 * count[1] / totalMoviesOfSpecifiedYear(count[0]))]
    return listOfPercentages