# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

import os

__author__ = "justi_000"
__date__ = "$Jun 5, 2015 9:35:43 AM$"

def fileToStr(fileName): 
    """Return a string containing the contents of the an html file."""
    file = open(fileName); 
    contents = file.read();  
    file.close() 
    return contents

def fillSearchResultsHTMLFile(oclcId, lineNumber, movieTitle, startTimeStamp, endTimeStamp, lineText):
    textFile = "/static/textFiles/" + oclcId + ".txt"
    imageSource = "/static/imageFiles/" + oclcId + ".gif"
    return fileToStr('templates/searchResultsTemplate.html').format(**locals())

def fillPaginationHTMLFile(keywordOrPhrase, currentPageNum, numResults, resultsPerPage):
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

    # when you click on the first number on the nav bar, it will go to either page 1 of results or the prev page
    link1 = '/moviesearch/' + keywordOrPhrase + '/' + str(pageNum1)
    # for the second number on the nav bar, and third, and so on, decide if there are enough results to link
    # it to anything. If not, use '#' which jumps to top of current page.
    if currentPageNum == 1 and numResults > resultsPerPage:
        link2 = '/moviesearch/' + keywordOrPhrase + '/' + str(pageNum2)
    else:
        link2 = '#'
    if (currentPageNum == 1 and numResults > (resultsPerPage * 2)) or (currentPageNum != 1 and numResults > currentPageNum * resultsPerPage):
        link3 = '/moviesearch/' + keywordOrPhrase + '/' + str(pageNum3)
    else:
        link3 = '#'
    if (currentPageNum == 1 and numResults > (resultsPerPage * 3)) or (currentPageNum != 1 and numResults > (currentPageNum + 1) * resultsPerPage):
        link4 = '/moviesearch/' + keywordOrPhrase + '/' + str(pageNum4)
    else:
        link4 = '#'
    if (currentPageNum == 1 and numResults > (resultsPerPage * 4)) or (currentPageNum != 1 and numResults > (currentPageNum + 2) * resultsPerPage):
        link5 = '/moviesearch/' + keywordOrPhrase + '/' + str(pageNum5)
    else:
        link5 = '#'

    # if there are enough results to have a next page, link the next button to the next page, else use '#'
    # which jumpts to top of current page
    if numResults > currentPageNum * resultsPerPage:
        linkNext = '/moviesearch/' + keywordOrPhrase + '/' + str(currentPageNum + 1)
    else:
        linkNext = '#'
    # if not on first page, the previous button should link to the previous page. If not use '#' which jumps to top
    # of current page
    if currentPageNum > 1:
        linkPrev = '/moviesearch/' + keywordOrPhrase + '/' + str(currentPageNum - 1)
    else:
        linkPrev = '#'

    # return the string of HTML code for the nav bar
    return fileToStr('templates/paginationTemplate.html').format(**locals())