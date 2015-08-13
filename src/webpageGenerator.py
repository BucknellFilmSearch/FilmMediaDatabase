#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging in web server environment
import cgitb
cgitb.enable()

import os
from databaseQuerierPostgresql import cumulativeOccurrencesByReleaseYear, percentageOfOccurrenceByReleaseYear, totalMovies, search, \
    getContextLines, getMovieInfo
from datetime import datetime
from os import path
from math import ceil

__author__ = "Justin Eyster"
__date__ = "$Jun 5, 2015 9:35:43 AM$"


def fileToStr(fileName): 
    """
    Used to convert html files into strings.
    :param fileName: the name of the html file to convert to a string (or location).
    """
    file = open(fileName); 
    contents = file.read();  
    file.close() 
    return contents

def generateSearchPage(defaultEarliestReleaseYear):
    """Generates the search page using inputPageTemplate and bootstrapThemeTemplate (html templates).
    :param defaultEarliestReleaseYear: the earliest release year represented in the database
    :returns: a string of html code representing the search page."""
    # define variables for the input page template
    numMovies = totalMovies()
    currentYear = str(datetime.now().year)
    # prepare page content, fill in the number of movies, and earliest and latest possible release years from above
    pageContent = fileToStr('templates/inputPageTemplate.html').format(**locals())

    # define other variables for the bootstrap template (this theme makes everything look pretty)
    # html code to activate the 'home' link, since we're on the home page
    homeActive = "class='active'"
    # the link of the home button is #, which is just a jump to the top of the current page (since already on home)
    homeLink = "#"
    # no nav bar, because we're on the search page, not the results page
    navBar = ""
    # ditto for graph
    graph = ""
    # fill in the bootstrap template with the pageContent, and the variables above
    return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())

def generateContextPage(oclcId,lineNumber,keywordOrPhraseSearched,genreSearched,earliestReleaseYearSearched,
                        latestReleaseYearSearched,currentPageNumber,pathToMediaFiles):
    """
    Generates a page of context. Remembers previous page of results to go back to.
    :param oclcId: oclc of movie to get context of
    :param lineNumber: line number of result clicked
    :param keywordOrPhraseSearched: keyword/phrase just searched
    :param genreSearched: genre param just searched
    :param earliestReleaseYearSearched: earliest release year param just searched
    :param latestReleaseYearSearched: latest release year param just searched
    :param currentPageNumber: page number of results that context was accessed on
    :param pathToMediaFiles: the path to the image files needed to make screenshots
    :return: the html code for the page of context
    """
    contextLines = getContextLines(oclcId,lineNumber,20)
    movieInfo = getMovieInfo(oclcId)
    movieTitle = movieInfo[0][0]
    movieReleaseYear = movieInfo[0][1]
    dvdReleaseYear = movieInfo[0][2]
    # initialize resultsPage variable
    resultsPage = ""
    # Later, place the following HTML code at the end of the results. (then put the nav bar after this.)
    resultsCap = "</a></div></body></html>"
    # iterate through results, use fillSearchResultsHTMLFile to generate HTML code for the results page
    firstRun = True
    for line in contextLines:
        movieLineNumber = line[0]
        movieStartTimeStamp = line[1]
        movieEndTimeStamp = line[2]
        movieLineText = removeBadCharacters(line[3])
        if firstRun:
            firstRun = False
            # use function below to generate the top piece of context results (with movie title and thumbnail)
            resultsPage += fillSearchResultsHTMLFile(oclcId,movieTitle,movieLineNumber,movieStartTimeStamp,
                                                     movieEndTimeStamp,movieLineText,movieReleaseYear,dvdReleaseYear,
                                                     pathToMediaFiles,keywordOrPhraseSearched,genreSearched,
                                                     earliestReleaseYearSearched,latestReleaseYearSearched,
                                                     currentPageNumber)
        else:
            # this function adds additional context items to the top piece that has movie title and thumbnail
            resultsPage += fillAdditionalLinesHTMLFile(oclcId,movieLineNumber,movieStartTimeStamp,movieEndTimeStamp,
                                                       movieLineText,pathToMediaFiles,keywordOrPhraseSearched,
                                                       genreSearched,earliestReleaseYearSearched,
                                                       latestReleaseYearSearched,currentPageNumber)

    # convert spaces to %20 in keyword/phrase (hyperlinks skip spaces, %20 means space)
    for i in range(len(keywordOrPhraseSearched)):
        if keywordOrPhraseSearched[i] == " ":
            keywordOrPhraseSearched = keywordOrPhraseSearched[0:i] + "%20" + keywordOrPhraseSearched[i+1:]
    # message at top of page
    numResultsMessage = "<h4 class=message-text>Context</h4>" + "<p class=message-text>Showing 20 lines before and after the clicked result.</p>" + \
                        "<p class=message-text><a href=/moviesearch/" + keywordOrPhraseSearched + "/" + genreSearched + "/" + \
                        str(earliestReleaseYearSearched) + "/" + str(latestReleaseYearSearched) + "/" + str(currentPageNumber) + \
                        " >Back to Search Results</a></p>"

    # put together all the pieces into one final string of HTML code, with the results for the page and the
    # nav bar
    finalResult = numResultsMessage + resultsPage + resultsCap
    pageContent = finalResult
    homeActive = ""
    homeLink = "/moviesearch"
    navBar = ""
    graph = ""
    # create page using the bootstrap template and the variables above
    return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())

def removeBadCharacters(text):
    """
    Removes utf-8 escaped characters that were showing up in results on the webpage.
    :param text: text to remove the newline symbol from, and other utf-8 bullshit
    :return: text that has been cleaned of garbage utf-8 characters
    """
    for i in range(len(text)):
        if len(text) > i and text[i] == "\\":
            if len(text) > i+1 and (text[i+1] == "0" or text[i+1] == "3" or text[i+1] == "2"):
                if len(text) > i+2 and (text[i+2] == "1" or text[i+2] == "0" or text[i+2] == "6"):
                    if len(text) > i+3 and (text[i+3] == "2"or text[i+3] == "2" or text[i+3] == "6"):
                        text = text[0:i] + " " + text[i+4:]
    return str(text)

def generateComparisonPage(defaultEarliestReleaseYear):
    """
    Generates the comparison page using comparisonPageTemplate and bootstrapThemeTemplate (html templates).
    :param defaultEarliestReleaseYear: the earliest release year represented in the database
    :returns: a string of html code representing the comparison page.
    """
    # define variables for the input page template
    numMovies = totalMovies()
    currentYear = str(datetime.now().year)
    # prepare page content, fill in the number of movies, and earliest and latest possible release years from above
    pageContent = fileToStr('templates/comparisonPageTemplate.html').format(**locals())

    # define other variables for the bootstrap template (this theme makes everything look pretty)
    # the home button is not active
    homeActive = ""
    # the link of the home button is /moviesearch, which returns to the input page (main landing page)
    homeLink = "/moviesearch"
    # no nav bar, because we're on a search page, not a results page
    navBar = ""
    # ditto for graph
    graph = ""
    # fill in the bootstrap template with the pageContent, and the variables above
    return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())

def generateGraphOfTwoKeywords(keywordOrPhrase1, keywordOrPhrase2, genre, earliestReleaseYear, latestReleaseYear):
    """
    Generates the page which has a graph showing the comparison of two different keywords/phrases.
    :param keywordOrPhrase1: first keyword/phrase to graph
    :param keywordOrPhrase2: second keyword/phrase to graph
    :param genre: genre param (or All)
    :param earliestReleaseYear: earliest release year param
    :param latestReleaseYear: latest release year param
    :return: page with graph comparing two different keywords/phrases
    """
    # no page content other than graph
    pageContent = ""
    # home button not active because not on home page
    homeActive = ""
    # link to home
    homeLink = "/moviesearch"
    # no nav bar because not on results page
    navBar = ""

    # make the graph
    graph = fillGraphHTMLFile([keywordOrPhrase1,keywordOrPhrase2], genre, earliestReleaseYear, latestReleaseYear,
                              "percentageByReleaseYear")

    return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())


def generateResultsPage(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear, results, resultsPerPage,
                        pageNumber, pathToMediaFiles):
    """
    Generates a page of general search results, with screenshots.
    :param keywordOrPhrase: keyword/phrase searched
    :param genre: genre param searched
    :param earliestReleaseYear: earliest release year param searched
    :param latestReleaseYear: latest release year param searched
    :param results: results of search
    :param resultsPerPage: number of results to show on each page
    :param pageNumber: page number of results to load
    :param pathToMediaFiles: path to static files (to access screenshot files and thumbnails)
    :return: the page of search results, with some movie information and a screenshot for each match
    """
    # initialize resultsPage variable
    resultsPage = ""
    # Later, place the following HTML code at the end of the results. (then put the nav bar after this.)
    resultsCap = "</div></body></html>"
    # variable to track oclc id of previous movie, to know if we need to start a new result or add to previous
    prevMovieOclcId = ""
    # iterate through results, use fillSearchResultsHTMLFile to generate HTML code for the results page
    for i in range((pageNumber-1)*resultsPerPage, pageNumber*resultsPerPage):
        # if there are enough results for one more on the page...
        if len(results) > i:
            movieOclcId = results[i][0]
            movieTitle = results[i][1]
            movieLineNumber = results[i][2]
            movieStartTimeStamp = results[i][3]
            movieEndTimeStamp = results[i][4]
            movieLineText = removeBadCharacters(results[i][5])
            movieReleaseYear = results[i][6]
            dvdReleaseYear = results[i][7]
            # if line is from a new movie...
            if prevMovieOclcId != movieOclcId:
                # cap the previous movie, use function below to generate HTML code for next movie's results
                resultsPage += resultsCap + fillSearchResultsHTMLFile(movieOclcId,movieTitle,movieLineNumber,movieStartTimeStamp,
                                                     movieEndTimeStamp,movieLineText,movieReleaseYear,dvdReleaseYear,
                                                     pathToMediaFiles,keywordOrPhrase,genre,
                                                     earliestReleaseYear,latestReleaseYear,
                                                     pageNumber)
            # if line is from same movie as previous, add the additional line to the movie's results
            elif prevMovieOclcId == movieOclcId:
                resultsPage += fillAdditionalLinesHTMLFile(movieOclcId,movieLineNumber,movieStartTimeStamp,movieEndTimeStamp,
                                                       movieLineText,pathToMediaFiles,keywordOrPhrase,
                                                       genre,earliestReleaseYear,
                                                       latestReleaseYear,pageNumber)
            prevMovieOclcId = movieOclcId
    # as long as there are results...
    if len(results)>0:
        # message at top of page
        numResultsMessage = "<p class=message-text>Showing " + str(len(results)) + " results for '" + keywordOrPhrase + \
                            "', " + str(resultsPerPage) + " per page.</p>" + \
                            "<p class=message-text>Click on a result to view context.</p>" + \
            "<p class=message-text><a href='/moviesearch'>Back to Search Page</a></p>"

        # put together all the pieces into one final string of HTML code, with the results for the page and the
        # nav bar
        finalResult = numResultsMessage + resultsPage + resultsCap
        pageContent = finalResult
        homeActive = ""
        homeLink = "/moviesearch"
        # generate HTML code for the nav bar using the function below
        navBar = fillNavigationBarHTMLFile(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear,
                                           pageNumber, len(results), resultsPerPage)
        if pageNumber == 1:
            graph = fillGraphHTMLFile(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear,
                                      "percentageByReleaseYear")
        else:
            graph = ""
        return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())
    # if there are no results, say so
    else:
        return "<p>Your Keyword/Phrase does not occur in the database (with specified parameters).<a href = '/moviesearch'> Back.</a></p>"


def fillSearchResultsHTMLFile(oclcId, movieTitle, lineNumber, startTimeStamp, endTimeStamp, lineText, movieReleaseYear,
                              dvdReleaseYear, pathToMediaFiles, keywordOrPhraseSearched, genreSearched,
                              earliestReleaseYearSearched, latestReleaseYearSearched, pageNumSearched):
    """
    Fill the html file for a single search result (the top part, with the movie info and thumbnail).
    All of this method's parameters are required, and used to fill the html file.
    :return: the html code for the first result for a single movie
    """
    textFile = "/static/textFiles/" + str(oclcId) + ".txt"
    thumbnailSource = "/static/imageFiles/" + str(oclcId) + ".gif"
    # generate path to screen shot
    screenshotSource = pathToMediaFiles + "/imageFiles/screenshots/" + str(oclcId) + "/" + str(lineNumber) + ".png"
    abrevSource = "/static/imageFiles/screenshots/" + str(oclcId) + "/" + str(lineNumber) + ".png"
    # if it's a valid file, insert it into the results
    if os.path.isfile(screenshotSource):
        screenshotHtml = "<center><img class='thumbnail' src=" + abrevSource + " width='720' height='480'></center>"
    else:
        screenshotHtml = ""
    contextLink = "/moviesearch/context/" + str(oclcId) + "/" + str(lineNumber) + "/" + keywordOrPhraseSearched + \
        "/" + genreSearched + "/" + str(earliestReleaseYearSearched) + "/" + str(latestReleaseYearSearched) + "/" + \
        str(pageNumSearched)
    return fileToStr('templates/searchResultsTemplate.html').format(**locals())

def fillAdditionalLinesHTMLFile(oclcId, lineNumber, startTimeStamp, endTimeStamp, lineText, pathToMediaFiles,
                                keywordOrPhraseSearched, genreSearched, earliestReleaseYearSearched,
                                latestReleaseYearSearched, pageNumSearched):
    """
    Fill the html file for a single search result (additional lines for a movie that already has the top part created).
    All of this method's parameters are required, and used to fill the html file.
    :return: the html code for the additional result
    """
    # generate file path to screen shot
    screenshotSource = pathToMediaFiles + "/imageFiles/screenshots/" + str(oclcId) + "/" + str(lineNumber) + ".png"
    abrevSource = "/static/imageFiles/screenshots/" + str(oclcId) + "/" + str(lineNumber) + ".png"
    # if it's a valid file, insert it into the results
    if os.path.isfile(screenshotSource):
        screenshotHtml = "<center><img class='thumbnail' src=" + abrevSource + " width='720' height='480'></center>"
    else:
        screenshotHtml = ""
    contextLink = "/moviesearch/context/" + str(oclcId) + "/" + str(lineNumber) + "/" + keywordOrPhraseSearched + \
        "/" + genreSearched + "/" + str(earliestReleaseYearSearched) + "/" + str(latestReleaseYearSearched) + "/" + \
        str(pageNumSearched)
    return fileToStr('templates/additionalLinesFromSameMovieTemplate.html').format(**locals())

def fillGraphHTMLFile(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear, plotType):
    """
    Use parameters above to create a graph.
    :param keywordOrPhrase: keyword/phrase, or list with two keywords/phrases
    :param genre: genre param to limit graph to
    :param earliestReleaseYear: earliest release year to limit graph to
    :param latestReleaseYear: latest release year to limit graph to
    :param plotType: type of graph to create
    :return: html code for graph
    """
    # if we were passed a single search term, a string
    if type(keywordOrPhrase).__name__ == 'str':
        # only one plot type created now, more to come
        if plotType == "percentageByReleaseYear":
            # get necessary data from sql database
            data = percentageOfOccurrenceByReleaseYear(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear)
            twoDimensArrayOfVals = []
            for item in data:
                # create a two dimension array of values to insert into template to be graphed
                twoDimensArrayOfVals.append([item[0],round(item[1])])
            return fileToStr('templates/percentageAcrossReleaseYearGraphTemplate.html').format(**locals())
    # otherwise, we were passed two search terms, two strings in a list
    else:
        keywordOrPhrase1 = keywordOrPhrase[0]
        keywordOrPhrase2 = keywordOrPhrase[1]
        # only one plot type created now, more to come
        if plotType == "percentageByReleaseYear":
            # get necessary data from sql database
            data1 = percentageOfOccurrenceByReleaseYear(keywordOrPhrase1, genre, earliestReleaseYear, latestReleaseYear)
            twoDimensArrayOfVals1 = []
            for item in data1:
                # create a two dimension arrays of values to insert into template to be graphed
                twoDimensArrayOfVals1.append([item[0],round(item[1])])
            data2 = percentageOfOccurrenceByReleaseYear(keywordOrPhrase2, genre, earliestReleaseYear, latestReleaseYear)
            twoDimensArrayOfVals2 = []
            for item in data2:
                # create a two dimension arrays of values to insert into template to be graphed
                twoDimensArrayOfVals2.append([item[0],round(item[1])])
            return fileToStr('templates/percentageAcrossReleaseYearMultiGraphTemplate.html').format(**locals())


def fillNavigationBarHTMLFile(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear, currentPageNum,
                              numResults, resultsPerPage):
    """
    Creates the HTML code for the pagination nav bar.
    :param keywordOrPhrase: the keyword/phrase searched by user
    :param currentPageNum: current page of results
    :param numResults: total number of results
    :param resultsPerPage: number of results to be displayed on each page
    :return: an HTML string for the pagination nav bar
    """
    # syntax to specify a page of results: '/moviesearch/<keywordOrPhrase>/<pageNumber:int>'

    # convert spaces to underscores in keyword/phrase (hyperlinks skip spaces)
    for i in range(len(keywordOrPhrase)):
        if keywordOrPhrase[i] == " ":
            keywordOrPhrase = keywordOrPhrase[0:i] + "_" + keywordOrPhrase[i+1:]

    # if we're on the first page of results
    if currentPageNum == 1:
        # don't include the jump to first button
        linkFirst = "#"
        # highlight the 1 on the nav bar
        active1 = "class='active'"
        # don't highlight the 2
        activeOther = ""
        # the first page shown on the nav bar will be 1
        pageNum1 = 1
        # decide if there's enough results to show 2, 3, 4, 5...else show 'N/A'
        if numResults > resultsPerPage:
            pageNum2 = 2
        else:
            pageNum2 = 'N/A'
        if numResults > resultsPerPage * 2:
            pageNum3 = 3
        else:
            pageNum3 = 'N/A'
        if numResults > resultsPerPage * 3:
            pageNum4 = 4
        else:
            pageNum4 = 'N/A'
        if numResults > resultsPerPage * 4:
            pageNum5 = 5
        else:
            pageNum5 = 'N/A'
    # if we're not on the first page of results
    else:
        # include the jump to first button
        linkFirst = "/moviesearch/" + keywordOrPhrase + "/" + genre + "/" + str(earliestReleaseYear) \
                      + "/" + str(latestReleaseYear) + "/" + "1"
        # don't highlight the first number on nav bar (it is for previous page)
        active1 = ""
        # highlight the second number on the nav bar (current page)
        activeOther = "class='active'"
        # first number on nav bar is for the previous page
        pageNum1 = currentPageNum - 1
        # second number on the nav bar is for the current page
        pageNum2 = currentPageNum
        # decide if there's enough results to show a next page, another page after that, and so on...
        # if not show 'N/A' in place of a page number
        if numResults > currentPageNum * resultsPerPage:
            pageNum3 = currentPageNum + 1
        else:
            pageNum3 = 'N/A'
        if numResults > (currentPageNum + 1) * resultsPerPage:
            pageNum4 = currentPageNum + 2
        else:
            pageNum4 = 'N/A'
        if numResults > (currentPageNum + 2) * resultsPerPage:
            pageNum5 = currentPageNum + 3
        else:
            pageNum5 = 'N/A'

    # set up 'Last Page' button
    lastPage = int(ceil(numResults / resultsPerPage))
    if lastPage == 0:
        lastPage = 1
    if currentPageNum == lastPage:
        linkLast = "#"
        activeLast = "class='active'"
    else:
        linkLast = "/moviesearch/" + keywordOrPhrase + "/" + genre + "/" + str(earliestReleaseYear) \
                      + "/" + str(latestReleaseYear) + "/" + str(lastPage)
        activeLast = ""

    beginningOfNavUrls = '/moviesearch/'+keywordOrPhrase+'/'+genre+'/'+str(earliestReleaseYear)+'/'+str(latestReleaseYear)+'/'
    # when you click on the first number on the nav bar, it will go to either page 1 of results or the prev page
    link1 = beginningOfNavUrls + str(pageNum1)
    # for the second number on the nav bar, and third, and so on, decide if there are enough results to link
    # it to anything. If not, use '#' which jumps to top of current page.
    if pageNum2 != 'N/A':
        link2 = beginningOfNavUrls + str(pageNum2)
        button2 = "<li "+activeOther+"><a href='"+link2+"'>"+str(pageNum2)+"</a></li>"
    else:
        button2 = ""
    if pageNum3 != 'N/A':
        link3 = beginningOfNavUrls + str(pageNum3)
        button3 = "<li><a href='"+link3+"'>"+str(pageNum3)+"</a></li>"
    else:
        button3 = ""
    if pageNum4 != 'N/A':
        link4 = beginningOfNavUrls + str(pageNum4)
        button4 = "<li><a href='"+link4+"'>"+str(pageNum4)+"</a></li>"
    else:
        button4 = ""
    if pageNum5 != 'N/A':
        link5 = beginningOfNavUrls + str(pageNum5)
        button5 = "<li><a href='"+link5+"'>"+str(pageNum5)+"</a></li>"
    else:
        button5 = ""

    # if there are enough results to have a next page, link the next button to the next page, else use '#'
    # which jumpts to top of current page
    if numResults > currentPageNum * resultsPerPage:
        linkNext = beginningOfNavUrls + str(currentPageNum + 1)
    else:
        linkNext = '#'
    # if not on first page, the previous button should link to the previous page. If not use '#' which jumps to top
    # of current page
    if currentPageNum > 1:
        linkPrev = beginningOfNavUrls + str(currentPageNum - 1)
    else:
        linkPrev = '#'

    # return the string of HTML code for the nav bar
    return fileToStr('templates/navigationBarTemplate.html').format(**locals())