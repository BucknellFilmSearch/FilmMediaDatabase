# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from bottle import route, run, install, template, request, get, post, static_file
from bottle_sqlite import SQLitePlugin
from dbDataAnalysis import searchResults, totalMovies
from processHTML import fillSearchResultsHTMLFile, fileToStr, fillPaginationHTMLFile

install(SQLitePlugin(dbfile='cpcp.db'))

class App():

    def __init__(self):
        self.results = []

    def getUserSearch(self):
        numMovies = totalMovies()
        return fileToStr('templates/inputPageTemplate.html').format(**locals())

    def search(self):
        keywordOrPhrase = request.forms.get('keywordOrPhrase')
        self.results = searchResults(keywordOrPhrase)
        return self.searchKeyword(keywordOrPhrase, 1)

    def searchKeyword(self, keywordOrPhrase, pageNumber):

        if len(self.results) > 0:
            results = self.results
        else:
            results = searchResults(keywordOrPhrase)

        # convert underscores to spaces
        for i in range(len(keywordOrPhrase)):
            if keywordOrPhrase[i] == "_":
                keywordOrPhrase = keywordOrPhrase[0:i] + " " + keywordOrPhrase[i+1:]

        resultsPage = ""
        resultsPerPage = 20
        navigation = fillPaginationHTMLFile(keywordOrPhrase, pageNumber, len(results), resultsPerPage)
        for i in range((pageNumber-1)*resultsPerPage, pageNumber*resultsPerPage):
            if len(results) > i:
                resultsPage += fillSearchResultsHTMLFile(results[i][0],results[i][1],results[i][2],results[i][3],results[i][4],results[i][5])
        if results:
            numResultsMessage = "<p>Showing " + str(len(results)) + " results, " + str(resultsPerPage) + " per page.</p>" + \
                                "<p>Click on a result to open the work's full script.</p>"
            finalResult = navigation + numResultsMessage + resultsPage + navigation
            return template(finalResult)
        else:
            return "Your Keyword/Phrase does not occur in the database."

    def static(self, path):
        return static_file(path, root='static')

appInstance = App()
get('/moviesearch')(appInstance.getUserSearch)
post('/moviesearch')(appInstance.search)
route('/moviesearch/<keywordOrPhrase>/<pageNumber:int>')(appInstance.searchKeyword)
route('/static/:path#.+#', name='static')(appInstance.static)
run(host='localhost', port=8080, debug=True)(appInstance)