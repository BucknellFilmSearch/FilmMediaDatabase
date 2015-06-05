# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from bottle import route, run, install, template, request, get, post, static_file
from bottle_sqlite import SQLitePlugin
from dbDataAnalysis import searchResults
from processHTML import fillSearchResultsHTMLFile, clusterizeSearchResultsHTMLFile

install(SQLitePlugin(dbfile='cpcp.db'))

@get('/moviesearch')
def getUserSearch():
    return '''
        <form action="/moviesearch" method="post">
            Keyword/Phrase: <input name="keywordOrPhrase" type="text" />
            <input value="Search" type="submit" />
        </form>
    '''

@post('/moviesearch')
def searchForMovie():
    keywordOrPhrase = request.forms.get('keywordOrPhrase')
    results = searchResults(keywordOrPhrase)
    finalResults = ""
    for result in results:
        finalResults += fillSearchResultsHTMLFile(result[0],result[1],result[2],result[3])
    if results:
        return template(finalResults)
    else:
        return "Your Keyword/Phrase does not occur in the database."

@route('/static/:path#.+#', name='static')
def static(path):
    return static_file(path, root='static')

run(host='localhost', port=8080, debug=True)