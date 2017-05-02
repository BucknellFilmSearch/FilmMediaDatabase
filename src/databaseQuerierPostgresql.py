#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

__author__ = "Justin Eyster"
__date__ = "$May 29, 2015 9:26:40 AM$"

from sqlalchemy import create_engine, distinct, func, update, text, or_
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker
from postgresSettings import DATABASE
from datetime import datetime
from MediaText import MediaText
from MediaMetadata import MediaMetadata
from config import DEBUG_MODE

# create connection to database
engine = create_engine(URL(**DATABASE))
Session = sessionmaker(bind=engine)

def updateKeywordCount(listOfOclcIdsAndCounts):
    """
    Update the keyword_count column of the media_metadata table, so that we can use it to sort results by density.
    :param listOfOclcIdsAndCounts: A list of lists. Each list has an oclc id, and then the count for that media item.
    """
    if len(listOfOclcIdsAndCounts) > 0:
        session = Session()
        for id in listOfOclcIdsAndCounts:
            oclcId = id[0]
            count = id[1]
            updateStatement = update(MediaMetadata.__table__).\
                where(MediaMetadata.oclc_id == oclcId).\
                values(keyword_count = count)
            session.execute(updateStatement)
            session.commit()
            currentId = oclcId
            currentCount = 1
        session.close()

def search():
    """
    Removed. This is not longer relevant when making generic API calls using
    searchResults().
    """
    return None

# rewritten for postgresql and sqlalchemy
def searchResults(keywordOrPhrase):
    session = Session()
    query = session.query(MediaText.oclc_id, func.count(distinct(MediaText.line_number))).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        group_by(MediaText.oclc_id)
    updateKeywordCount(query.all())

    count = session.query(MediaText.oclc_id, func.max(MediaText.line_number).label('totalNumberOfLines')).group_by(MediaText.oclc_id).subquery()

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year,
                          MediaMetadata.runtime_in_minutes, count.c.totalNumberOfLines,
                          MediaMetadata.genre1, MediaMetadata.genre2, MediaMetadata.genre3).\
        join(count, count.c.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc()).\
        order_by(MediaMetadata.movie_title).\
        order_by(MediaText.line_number)

    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByGenre(keywordOrPhrase,genre):
    """
    This returns the search results for a keyword or phrase with genre specified. Each result includes the oclc id,
    movie title, line number of the occurrence, time stamps, the matched text, original release year, and dvd release
    year.
    :param genre:
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id, func.count(distinct(MediaText.line_number))).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        group_by(MediaText.oclc_id)
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc()).\
        order_by(MediaMetadata.movie_title).\
        order_by(MediaText.line_number)
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByGenreAndReleaseYear(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear):
    """
    This returns the search results for a keyword or phrase. Each result includes
    the oclc id, movie title, line number of the occurrence, time stamps, the matched text, original release year,
    and dvd release year.
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    # query = session.query(MediaText.oclc_id, func.count(distinct(MediaText.line_number))).\
    #     filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
    #     group_by(MediaText.oclc_id)
    # updateKeywordCount(query.all())

    count = session.query(MediaText.oclc_id, func.max(MediaText.line_number).label('totalNumberOfLines')).group_by(MediaText.oclc_id).subquery()

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
        filter(MediaMetadata.original_release_year >= earliestReleaseYear).\
        filter(MediaMetadata.original_release_year <= latestReleaseYear).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc()).\
        order_by(MediaMetadata.movie_title).\
        order_by(MediaText.line_number)
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def searchResultsByReleaseYear(keywordOrPhrase,earliestReleaseYear,latestReleaseYear):
    """
    This returns the search results for a keyword or phrase, with release year params specified. Each result includes
    the oclc id, movie title, line number of the occurrence, time stamps, the matched text, original release year,
    and dvd release year.
    :param earliestReleaseYear:
    :param latestReleaseYear:
    :param keywordOrPhrase: the keyword or phrase to search.
    :return: the occurrences of the keyword or phrase, information about the line where they occur, info about movie
    """
    session = Session()
    query = session.query(MediaText.oclc_id, func.count(distinct(MediaText.line_number))).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        group_by(MediaText.oclc_id)
    updateKeywordCount(query.all())

    query = session.query(MediaMetadata.oclc_id, MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year,
                          MediaMetadata.runtime_in_minutes, count.c.totalNumberOfLines,
                          MediaMetadata.genre1, MediaMetadata.genre2, MediaMetadata.genre3).\
        join(count, count.c.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.keyword_count.desc()).\
        order_by(MediaMetadata.movie_title).\
        order_by(MediaText.line_number)

    session.close()

    return query.all()

# rewritten for postgresql and sqlalchemy
def totalMovies():
    """
    :returns: the total number of movies in the database, as an integer.
    """
    session = Session()
    query = session.query(func.count(MediaMetadata.oclc_id)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    session.close()
    return query.all()[0][0]

# rewritten for postgresql and sqlalchemy
def getContextLines(oclcId,lineNumber,numLines):
    """
    Get the lines of context. For each result, get line number, time stamps, and text.
    :param oclcId: unique id for the media
    :param lineNumber: line to get context of
    :return: 20 lines before and after the given line (list of lists)
    """
    session = Session()
    query = session.query(distinct(MediaText.oclc_id), MediaMetadata.movie_title, MediaText.line_number,
                          MediaText.start_time_stamp, MediaText.end_time_stamp, MediaText.line_text,
                          MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        join(MediaMetadata, MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.oclc_id == oclcId).\
        filter(MediaText.line_number.between((lineNumber - numLines), (lineNumber + numLines))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaText.line_number)
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def getMovieInfo(oclcId):
    """
    Get title, original release year, dvd release year for a media item.
    :param oclcId: oclcId of media item to get info about
    :return: list of results (list of lists)
    """
    session = Session()
    query = session.query(MediaMetadata.movie_title, MediaMetadata.original_release_year, MediaMetadata.dvd_release_year).\
        filter(MediaMetadata.oclc_id == oclcId).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def cumulativeOccurrencesByReleaseYear(keywordOrPhrase):
    """
    Number of times a keyword occurs in a given release year, cumulatively.
    :param keywordOrPhrase: keyword/phrase to count occurrences of
    :return: An integer count of the cumulative occurrences of the keyword/phrase
    """
    session = Session()
    query = session.query(MediaMetadata.original_release_year, MediaText.count()).\
        filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
        filter(MediaText.search_vector.match(keywordOrPhrase)).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        order_by(MediaMetadata.original_release_year.asc())
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def occurrencesByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear):
    """
    Same as above but counts each movie only once. Useful for returning
    percentage of movies containing keyword in certain year.
    :param keywordOrPhrase: keyword/phrase to count occurrences of
    :param genre:
    :param earliestReleaseYear:
    :param latestReleaseYear:
    """
    session = Session()
    if genre != "All":
        query = session.query(MediaMetadata.original_release_year, func.count(distinct(MediaText.oclc_id))).\
            filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
            filter(MediaMetadata.original_release_year.between(earliestReleaseYear, latestReleaseYear)).\
            filter(MediaMetadata.genre1 == genre or MediaMetadata.genre2 == genre or MediaMetadata.genre3 == genre).\
            filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
            filter(MediaMetadata.movie_or_tv_show == "Movie").\
            group_by(MediaMetadata.original_release_year)
    else:
        query = session.query(MediaMetadata.original_release_year, func.count(distinct(MediaText.oclc_id))).\
            filter(MediaText.oclc_id == MediaMetadata.oclc_id).\
            filter(MediaMetadata.original_release_year.between(earliestReleaseYear, latestReleaseYear)).\
            filter(or_(text("media_text.search_vector @@ to_tsquery('english','"+keywordOrPhrase+"')"), text("media_text.search_vector @@ to_tsquery('english','012"+keywordOrPhrase+"')"))).\
            filter(MediaMetadata.movie_or_tv_show == "Movie").\
            group_by(MediaMetadata.original_release_year)
    session.close()
    return query.all()

# rewritten for postgresql and sqlalchemy
def totalMoviesOfSpecifiedYear(year):
    """
    Helper function for percentageOfOccurrenceByReleaseYear. Counts total num of movies from a specified year.
    :param year: year to count movies in.
    """
    session = Session()
    query = session.query(func.count(distinct(MediaMetadata.oclc_id))).\
        filter(MediaMetadata.original_release_year == year).\
        filter(MediaMetadata.movie_or_tv_show == "Movie")
    session.close()
    return query.all()[0][0]

# rewritten for postgresql and sqlalchemy
def totalMoviesByYear():
    """
    Helper function. Counts total number of movies for each year.
    :param year: year to count movies in.
    """
    session = Session()
    query = session.query(MediaMetadata.original_release_year, func.count(distinct(MediaMetadata.oclc_id))).\
        filter(MediaMetadata.movie_or_tv_show == "Movie").\
        group_by(MediaMetadata.original_release_year).\
        order_by(MediaMetadata.original_release_year.asc())

    return query.all()

# rewritten for postgresql and sqlalchemy
def percentageOfOccurrenceByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear):
    """
    Returns the percentages of movies containing the keyword/phrase for each
    release year that occurs in the database.
    :param keywordOrPhrase:
    :param genre:
    :param earliestReleaseYear:
    :param latestReleaseYear:
    :returns: list of lists - each item has the release year as first item, then the percentage of movies in that year
    that contain the search term
    """

    # get count of search term by year
    counts = occurrencesByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear)
    i = 0
    currYear = earliestReleaseYear
    while currYear <= latestReleaseYear:
        if i >= len(counts):
            counts.append((currYear, 0))
        elif counts[i][0] != currYear:
            counts.insert(i, (currYear, 0))
        i+=1
        currYear+=1
    listOfPercentages = []

    # get number of films for each year
    movieCountsByYear = dict(totalMoviesByYear())

    # generate list of occurences of search terms each year relative to number of films that year
    for count in counts:
        currentYear = count[0]
        searchTermCount = count[1]
        if currentYear in movieCountsByYear:
            listOfPercentages += [(currentYear, 100 * searchTermCount / movieCountsByYear[currentYear])]
        else:
            listOfPercentages += [(currentYear, 0.0)]

    return listOfPercentages
