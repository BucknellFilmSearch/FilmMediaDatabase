# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Justin Eyster"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from datetime import datetime
from bottle import route, run, install, template, request, get, post, static_file, redirect
from bottle_sqlite import SQLitePlugin
from dbDataAnalysisSqlite import search, totalMovies
from processHTML import fillGraphHTMLFile, generateSearchPage, generateResultsPage

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
        Displays search page through use of an html form in the inputPageTemplate.
        :return: the HTML code string for the landing page, with a search box.
        """
        return generateSearchPage(self.defaultEarliestReleaseYear)

    def searchFromLandingPage(self):
        """
        Takes the user's search term/metadata parameters from landing page, then redirects to the proper URL to generate
        the results page.
        """
        # get search phrase from the form on the search page
        keywordOrPhrase = request.forms.get('keywordOrPhrase')
        if len(keywordOrPhrase) == 0:
            return "Please specify a keyword or phrase before clicking 'search.'"
        # get genre params from the form on the search page
        genre = request.forms.get('genre')
        # get release year params from the form on the search page
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
route('/static/:path#.+#', name='static')(appInstance.static)
# run the server
run(host='localhost', port=8080, debug=True)(appInstance)