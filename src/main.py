# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Justin Eyster"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from datetime import datetime
from bottle import route, run, install, template, request, get, post, static_file, redirect
from bottle_sqlite import SQLitePlugin
from databaseQuerier import search, totalMovies
from webpageGenerator import fillGraphHTMLFile, generateSearchPage, generateResultsPage, generateComparisonPage,\
    generateGraphOfTwoKeywords

install(SQLitePlugin(dbfile='cpcp.db'))

class App():

    def __init__(self):
        """
        Provides location to store results, so that all functions can access it after retrieving results only once.
        Also the master location for resultsPerPage. This is the only place where you should have to adjust this.
        Also stores the current keyword/phrase being searched.
        Also stores default earliest release year. Right now we're only including movies released after 2000.
        """

        self.results = []
        self.resultsPerPage = 25

        # info about previous search
        self.keywordOrPhraseSearched = ""
        self.genreSearched = ""
        self.earliestReleaseYearSearched = ""
        self.latestReleaseYearSearched = ""

        # FUTURE MANAGER OF THIS SOFTWARE LOOK BELOW!
        # TODO: change value below to the year of the first movie in history when expanding to movies released pre-2000
        self.defaultEarliestReleaseYear = 2000

    def displaySearchPage(self):
        """
        Displays the search (home) page. Uses an html form (see inputPageTemplate). Uses GET protocol.
        :return: a string, the HTML code for the landing page, which includes a search box and metadata parameters.
        """
        return generateSearchPage(self.defaultEarliestReleaseYear)

    def searchFromLandingPage(self):
        """
        Takes the user's search term/metadata parameters from landing page, then redirects to the proper URL to generate
        the results page.
        """
        # get search phrase and metadata parameters from the form on the search page
        keywordOrPhrase = request.forms.get('keywordOrPhrase')
        if len(keywordOrPhrase) == 0:
            return "Please specify a keyword or phrase before clicking 'search.'"
        genre = request.forms.get('genre')
        earliestReleaseYear = request.forms.get('earliestReleaseYear')
        latestReleaseYear = request.forms.get('latestReleaseYear')
        if earliestReleaseYear == "":
            earliestReleaseYear = self.defaultEarliestReleaseYear
        if latestReleaseYear == "":
            latestReleaseYear = datetime.now().year
        # forward the user to the first page of results (the URL contains the parameters used to generate results)
        redirectUrl = '/moviesearch/'+keywordOrPhrase+'/'+genre+'/'+str(earliestReleaseYear)+'/'+str(latestReleaseYear)+'/'+'1'
        redirect(redirectUrl)

    def displayResultsPage(self,keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear,pageNumber):
        """
        If the search hasn't been done yet, perform search with keyword. Either way, generate the specified page of
        results.
        :param keywordOrPhrase: the keyword or phrase to search.
        :param genre: genre to restrict the results.
        :param earliestReleaseYear: earliest release year to include.
        :param latestReleaseYear: latest release year to include.
        :param pageNumber: the page of results to generate.
        :return: the HTML code for the entire page of results.
        """

        # convert underscores to spaces
        # (underscores are sometimes used in the URL in place of spaces, need to convert back)
        for i in range(len(keywordOrPhrase)):
            if keywordOrPhrase[i] == "_":
                keywordOrPhrase = keywordOrPhrase[0:i] + " " + keywordOrPhrase[i+1:]

        # if results aren't already for current search, perform the search
        if (keywordOrPhrase != self.keywordOrPhraseSearched or genre != self.genreSearched or
                        earliestReleaseYear != self.earliestReleaseYearSearched or
                        latestReleaseYear != self.latestReleaseYearSearched):
            results = search(keywordOrPhrase,genre,earliestReleaseYear,latestReleaseYear,
                             self.defaultEarliestReleaseYear)
            # store results, if not none
            if not (results is None):
                self.results = results
            # else if there are no results, say so
            else:
                return "Your Keyword/Phrase does not occur in the database (with specified parameters)."
            # store params that were searched
            self.keywordOrPhraseSearched = keywordOrPhrase
            self.genreSearched = genre
            self.earliestReleaseYearSearched = earliestReleaseYear
            self.latestReleaseYearSearched = latestReleaseYear
        # if params (other than page number) are identical to previous search, use previous search results (implied)
        # generate html page of results
        return generateResultsPage(keywordOrPhrase, genre, earliestReleaseYear, latestReleaseYear, self.results,
                                   self.resultsPerPage, pageNumber)

    def displayComparisonPage(self):
        return generateComparisonPage(self.defaultEarliestReleaseYear)

    def graphComparison(self):

        # get graph/search parameters from search boxes
        keywordOrPhrase1 = request.forms.get('keywordOrPhrase1')
        if len(keywordOrPhrase1) == 0:
            return "Please specify two keywords or phrases before clicking 'search.'"
        keywordOrPhrase2 = request.forms.get('keywordOrPhrase2')
        if len(keywordOrPhrase2) == 0:
            return "Please specify two keywords or phrases before clicking 'search.'"
        genre = request.forms.get('genre')
        earliestReleaseYear = request.forms.get('earliestReleaseYear')
        latestReleaseYear = request.forms.get('latestReleaseYear')
        if earliestReleaseYear == "":
            earliestReleaseYear = self.defaultEarliestReleaseYear
        if latestReleaseYear == "":
            latestReleaseYear = datetime.now().year

        # convert underscores to spaces
        # (underscores are sometimes used in the URL in place of spaces, need to convert back)
        for i in range(len(keywordOrPhrase1)):
            if keywordOrPhrase1[i] == "_":
                keywordOrPhrase1 = keywordOrPhrase1[0:i] + " " + keywordOrPhrase1[i+1:]
        for i in range(len(keywordOrPhrase2)):
            if keywordOrPhrase2[i] == "_":
                keywordOrPhrase2 = keywordOrPhrase2[0:i] + " " + keywordOrPhrase2[i+1:]

        return generateGraphOfTwoKeywords(keywordOrPhrase1, keywordOrPhrase2, genre, earliestReleaseYear,
                                          latestReleaseYear)

    def static(self, path):
        """
        Provides route to static files, such as text files.
        :param path: the path to the static file.
        :return: the static file.
        """
        return static_file(path, root='static')

# initialize App
appInstance = App()
# route the proper URL's to the proper methods in the class
get('/moviesearch')(appInstance.displaySearchPage)
post('/moviesearch')(appInstance.searchFromLandingPage)
route('/moviesearch/<keywordOrPhrase>/<genre>/<earliestReleaseYear:int>/<latestReleaseYear:int>/<pageNumber:int>')\
    (appInstance.displayResultsPage)
get('/moviesearch/compare')(appInstance.displayComparisonPage)
post('/moviesearch/compare')(appInstance.graphComparison)
route('/static/:path#.+#', name='static')(appInstance.static)
# run the server
run(host='localhost', port=8080, debug=True)(appInstance)