# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Justin Eyster"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from datetime import datetime
from bottle import route, run, install, template, request, get, post, static_file, redirect
from bottle_sqlite import SQLitePlugin
from dbDataAnalysis import search, totalMovies
from processHTML import fillSearchResultsHTMLFile, fileToStr, fillNavigationBarHTMLFile, fillAdditionalLinesHTMLFile
from processHTML import fillGraphHTMLFile

install(SQLitePlugin(dbfile='cpcp.db'))

class App():

    def __init__(self):
        """
        Provides location to store results so that all functions can access it after retrieving once.
        Also the master location for resultsPerPage. This is the only place where you should have to adjust this.
        Also stores the current keyword/phrase being searched.
        Also stores default earliest release year. Right now we're only including movies released after 2000.
        """
        self.results = []
        self.keywordOrPhraseSearched = ""
        self.resultsPerPage = 25
        self.defaultEarliestReleaseYear = 2000

    def getUserSearchFromLandingPage(self):
        """
        Displays and gets the user's search through use of an html form in the inputPageTemplate.
        :return: the HTML code string for the landing page, with a search box.
        """
        currentYear = str(datetime.now().year)
        numMovies = totalMovies()
        defaultEarliestReleaseYear = self.defaultEarliestReleaseYear
        pageContent = fileToStr('templates/inputPageTemplate.html').format(**locals())
        homeActive = "class='active'"
        homeLink = "#"
        navBar = ""
        graph = ""
        return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())

    def searchFromLandingPage(self):
        """
        Takes the users search from landing page, searches, then jumps to function that generates results,
        generateResultsPages.
        :return: the generated results pages, using the function generateResultsPages.
        """
        # get search phrase
        keywordOrPhrase = request.forms.get('keywordOrPhrase')
        if len(keywordOrPhrase) == 0:
            return "Please specify a keyword or phrase before clicking 'search.'"
        # get genre params
        genre = request.forms.get('genre')
        # get release year params
        earliestReleaseYear = request.forms.get('earliestReleaseYear')
        latestReleaseYear = request.forms.get('latestReleaseYear')
        if earliestReleaseYear == "":
            earliestReleaseYear = self.defaultEarliestReleaseYear
        if latestReleaseYear == "":
            latestReleaseYear = datetime.now().year
        # forward the user to the results page
        redirectUrl = '/moviesearch/'+keywordOrPhrase+'/'+genre+'/'+str(earliestReleaseYear)+'/'+str(latestReleaseYear)+'/'+'1'
        redirect(redirectUrl)

    def generateResultsPage(self,keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear,pageNumber):
        """
        If the search hasn't been done yet, perform search with keyword. Either way, generate the specified page of
        results.
        :param keywordOrPhrase: the keyword or phrase to search.
        :param pageNumber: the page of results to generate.
        :return: the HTML code for the entire page of results.
        """

        # convert underscores to spaces
        # (underscores are sometimes used in the URL in place of spaces, need to convert back)
        for i in range(len(keywordOrPhrase)):
            if keywordOrPhrase[i] == "_":
                keywordOrPhrase = keywordOrPhrase[0:i] + " " + keywordOrPhrase[i+1:]

        # perform search
        results = search(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear,self.defaultEarliestReleaseYear)
        # store results, if not none
        if not (results is None):
            self.results = results
        # store keyword that was searched
        self.keywordOrPhraseSearched = keywordOrPhrase

        # initialize resultsPage variable
        resultsPage = ""
        # Later, place the following HTML code at the end of the results. (then put the nav bar after this.)
        resultsCap = "</a></div></body></html>"
        # variable to track oclc id of previous movie, to know if we need to start a new result or add to previous
        prevMovieOclcId = ""
        # iterate through results, use fillSearchResultsHTMLFile to generate HTML code for the results page
        for i in range((pageNumber-1)*self.resultsPerPage, pageNumber*self.resultsPerPage):
            # if there are enough results for one more on the page...
            if len(self.results) > i:
                movieOclcId = self.results[i][0]
                movieTitle = self.results[i][1]
                movieLineNumber = self.results[i][2]
                movieStartTimeStamp = self.results[i][3]
                movieEndTimeStamp = self.results[i][4]
                movieLineText = self.results[i][5]
                # if line is from a new movie...
                if prevMovieOclcId != movieOclcId:
                    # cap the previous movie, use function below to generate HTML code for next movie's results
                    resultsPage += resultsCap + fillSearchResultsHTMLFile(movieOclcId,movieTitle,movieLineNumber,movieStartTimeStamp,movieEndTimeStamp,movieLineText)
                # if line is from same movie as previous, add the additional line to the movie's results
                elif prevMovieOclcId == movieOclcId:
                    resultsPage += fillAdditionalLinesHTMLFile(movieLineNumber,movieStartTimeStamp,movieEndTimeStamp,movieLineText)
                prevMovieOclcId = movieOclcId
        # as long as there are results...
        if len(self.results)>0:
            # message at top of page
            numResultsMessage = "<p class=message-text><a href='/moviesearch'>Back to search page.</a></p>" + \
                                "<p class=message-text>Showing " + str(len(results)) + " results, " + str(self.resultsPerPage) + " per page.</p>" + \
                                "<p class=message-text>Click on a result to open the work's full script.</p>"

            # put together all the pieces into one final string of HTML code, with the results for the page and the
            # nav bar
            finalResult = numResultsMessage + resultsPage + resultsCap
            pageContent = finalResult
            homeActive = ""
            homeLink = "/moviesearch"
            # generate HTML code for the nav bar using the function below
            navBar = fillNavigationBarHTMLFile(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear,
                                               pageNumber, len(self.results), self.resultsPerPage)
            graph = fillGraphHTMLFile(keywordOrPhrase, "percentageByReleaseYear")
            return fileToStr('templates/bootstrapThemeTemplate.html').format(**locals())
        # if there are no results, say so
        else:
            return "Your Keyword/Phrase does not occur in the database (with specified parameters)."

    def static(self, path):
        """
        Provides route to static files, such as text files.
        :param path: the path to the static file.
        :return: the static file.
        """
        return static_file(path, root='static')

appInstance = App()
# route the proper URL's to the proper methods in the class
get('/moviesearch')(appInstance.getUserSearchFromLandingPage)
post('/moviesearch')(appInstance.searchFromLandingPage)
route('/moviesearch/<keywordOrPhrase>/<genre>/<earliestReleaseYear:int>/<latestReleaseYear:int>/<pageNumber:int>')\
    (appInstance.generateResultsPage)
route('/static/:path#.+#', name='static')(appInstance.static)
# run the server
run(host='localhost', port=8080, debug=True)(appInstance)