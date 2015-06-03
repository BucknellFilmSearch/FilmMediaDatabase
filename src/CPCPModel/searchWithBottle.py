# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from bottle import route, run, install, template, request, get, post
from bottle_sqlite import SQLitePlugin
from dbDataAnalysis import searchResults, totalMovies

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
    finalResults = "<p>"
    for result in results:
        for section in result:
            finalResults += " -- " + section
        finalResults += "</p><p>"
    if results:
        return template(finalResults)
    else:
        return "Your Keyword/Phrase does not occur in the database."
#    c = db.execute('SELECT MOVIES.Title FROM MOVIES WHERE MOVIES.OCLC_ID = ?', (OCLC_ID,))
#    row = c.fetchone()
#    return template('Movie Title: {{Title}}', Title = row[0])

run(host='localhost', port=8080, debug=True)