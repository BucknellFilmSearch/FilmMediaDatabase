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

def fillSearchResultsHTMLFile(movieTitle, startTimeStamp, endTimeStamp, lineText):
    return fileToStr('templates/searchResultsTemplate.html').format(**locals())

def clusterizeSearchResultsHTMLFile(movieTitle, startTimeStamp, endTimeStamp, lineText):
    return fileToStr('templates/searchResultsTemplate.html').format(**locals())