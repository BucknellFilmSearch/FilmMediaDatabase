# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "justi_000"
__date__ = "$Jun 2, 2015 2:43:11 PM$"

from bottle import route, run, install, template, request
from bottle_sqlite import SQLitePlugin

install(SQLitePlugin(dbfile='cpcp.db'))

@route('/show/<OCLC_ID:int>')
def show(db, OCLC_ID):
    c = db.execute('SELECT MOVIES.Title FROM MOVIES WHERE MOVIES.OCLC_ID = ?', (OCLC_ID,))
    row = c.fetchone()
    return row

run(host='localhost', port=8080, debug=True)