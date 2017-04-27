Film Search Engine
==================

Original Project:
-----------------
* Professor Dr. John Hunter, Comparative Humanities
* Justin Eyster '17, Summer Research Student
* Dale Hartman '18, Presidential Fellow


Modern Interface Design for Film Search Engine
==============================================


A team of four senior Computer Science and Engineering students worked to create an intuitive user interface for the Film Search Engine. The information for that project is listed below.


Team Endframe:  
--------------
* Nadeem Nasimi '17  
* Elliot Radsliff /17  
* Anmol Singh '17  
* Devon Wasson '17  



Senior Design, CSCI 475/6, Bucknell University  
-------------------------------------------
* Semesters: Fall 2016/Spring 2017  
* Advisor: <a href="http://www.eg.bucknell.edu/~brk009/">Professor Dr. Brian King</a>, Computer Science  
* Client: Professor Dr. John Hunter, Comparative Humanities  

Abstract:
---------
The Film Search Engine started as a database of lines of dialogue from films with a corresponding screenshot. Each screenshot was taken from the film during the time the line of dialogue was being spoken. This relational database allows users to search for text and be returned images, which is invaluable in film and media research. However, an idea is only as good as its ability to be reached by its users. The database needed a website which would not only allow users to conduct their research, but allow them to do so quickly and intuitively. 

Our project aimed to make a well designed web interface to aid in the research being conducted by our users. By employing good design practices, we were able to narrow down exactly what users need to be successful and make them want to return to our website in the future. We selected React.js for building our website and followed Google’s Material-UI style guide, both of which are decisions that will make it easier for people to continue development in the future. Our work resulted in an intuitive application, granting users the ability to easily conduct their research and view their results in a well formatted environment. 

Installation:
-------------

File Structure:
---------------
For the website for this project, most of the files used can be found in the static folder. 

Static/css contains the css files for the website. front.css contains the style for the front page of the website. cover.css contains the style for the results and context page of the website. 

Static/imageFiles contains the images used throughout the website. 140x197.jpg and 720x480.jpg can be used as placeholder images if you cannot connect to the database. logo.jpg, photoIcon.jpg, and textIcon.jpg can all be viewed on the front page. photoUploadIcon.jpg can be seen in the color search modal.

&nbsp;&nbsp;Static/js contains all of the javascript files relevant to the website. Static/js/components contains three folders, /graphs, /results, and /search.
* /graphs contains the .jsx files relevant to data visualizations. This is currently not included in the website but is compatible with our design.  
* /results contains the .jsx files for the results and context pages. AllFilms.jsx is the main file, which includes references to the other files in the folder.
* /search contains the .jsx files for the home page. SearchContainer.jsx is the main file, which includes references to the other files.



Historical README Information:
==============================

The Cell Phone Cinema Project

Project by Dr. John Hunter, Justin Eyster, Dale Hartman at Bucknell University,
Lewisburg, Pennsylvania, USA.

Project undertaken in the Summer of 2015.

All source code written by Justin Eyster, to eventually be monitored by Dale Hartman as well.

This website provides functionality to search keywords or phrases within a database of movie/tv
closed captions and subtitles. This program will return movie lines containing instances
of the specified keyword/phrase, with a screenshot, along with metadata information about
the movies containing the keyword/phrase.

For academic, educational, & personal use.
