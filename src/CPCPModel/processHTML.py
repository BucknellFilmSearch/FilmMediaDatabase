# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

import os
from dbDataAnalysis import cumulativeOccurrencesByReleaseYear, percentageOfOccurrenceByReleaseYear

__author__ = "Justin Eyster"
__date__ = "$Jun 5, 2015 9:35:43 AM$"

def fileToStr(fileName): 
    """Return a string containing the contents of the an html file."""
    file = open(fileName); 
    contents = file.read();  
    file.close() 
    return contents

def fillSearchResultsHTMLFile(oclcId, movieTitle, lineNumber, startTimeStamp, endTimeStamp, lineText):
    textFile = "/static/textFiles/" + str(oclcId) + ".txt"
    imageSource = "/static/imageFiles/" + str(oclcId) + ".gif"
    return fileToStr('templates/searchResultsTemplate.html').format(**locals())

def fillAdditionalLinesHTMLFile(lineNumber, startTimeStamp, endTimeStamp, lineText):
    return fileToStr('templates/additionalLinesFromSameMovieTemplate.html').format(**locals())

def fillGraphHTMLFile(keywordOrPhrase, plotType):
    if plotType == "percentageByReleaseYear":
        data = percentageOfOccurrenceByReleaseYear(keywordOrPhrase)
    twoDimensArrayOfVals = []
    for item in data:
        twoDimensArrayOfVals.append([item[0],item[1]])
    return fileToStr('templates/graphTemplate.html').format(**locals())


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
    lastPage = numResults // resultsPerPage
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