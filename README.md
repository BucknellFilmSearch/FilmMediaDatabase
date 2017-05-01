# Film Search Engine

## Original Project:
* Professor Dr. John Hunter, Comparative Humanities
* Justin Eyster '17, Summer Research Student
* Dale Hartman '18, Presidential Fellow


# Modern Interface Design for Film Search Engine


A team of four senior Computer Science and Engineering students worked to create an intuitive user interface for the Film Search Engine. The information for that project is listed below.


## Team Endframe:  
* Nadeem Nasimi '17  
* Elliot Radsliff /17  
* Anmol Singh '17  
* Devon Wasson '17  



## Senior Design, CSCI 475/6, Bucknell University  
* Semesters: Fall 2016/Spring 2017  
* Advisor: <a href="http://www.eg.bucknell.edu/~brk009/">Professor Dr. Brian King</a>, Computer Science  
* Client: Professor Dr. John Hunter, Comparative Humanities  

## Abstract:
The Film Search Engine started as a database of lines of dialogue from films with a corresponding screenshot. Each screenshot was taken from the film during the time the line of dialogue was being spoken. This relational database allows users to search for text and be returned images, which is invaluable in film and media research. However, an idea is only as good as its ability to be reached by its users. The database needed a website which would not only allow users to conduct their research, but allow them to do so quickly and intuitively. 

Our project aimed to make a well designed web interface to aid in the research being conducted by our users. By employing good design practices, we were able to narrow down exactly what users need to be successful and make them want to return to our website in the future. We selected React.js for building our website and followed Google’s Material-UI style guide, both of which are decisions that will make it easier for people to continue development in the future. Our work resulted in an intuitive application, granting users the ability to easily conduct their research and view their results in a well formatted environment. 

## Installation:

These instructions are written for UNIX machines (ie MacOS and Linux). These instructions can still be followed for Windows, but some commands may differ.

### System Requirements

* Python: the language most of the backend code is written in. It can be installed from <a href="https://www.python.org/">here</a>.
* Pip: a python package manager. This is used to install all the backend dependencies. It is typically comes bundled with Python, or can be installed from <a href="https://pip.pypa.io/en/stable/">here</a>.
* Node: a JavaScript runtime. Bundled with Node is npm (node package manager), which is used to install the JavaScript dependencies. It can be installed from <a href="https://nodejs.org/en/download/">here</a>.


### Installation Instructions

These steps only need to be followed once to set up the development environment. 

* Install all required software listed above by following their respective installation guides.
* Clone the repository from GitLab: `git clone git@gitlab.bucknell.edu:jde012/cell-phone-cinema-project.git`
* Enter the source folder and install the python requirements: `cd src && pip install -r requirements.txt`
* Enter the JavaScript folder and install the node requirements: `cd static/js && npm install`


### Run Instructions

These steps need to be followed before each development session. 

* Open a terminal window and enter the src/ directory
* Run python main.py
* Open a second terminal window and enter the src/static/js directory
* Run `npm start` and wait for the JavaScript file to generate
* Go to localhost:8080 in your web browser


### Web Development Tips

* Use Google Chrome and its debugging tools
* Install <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi">React Developer Tools</a> to debug issues with React
* Install <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en">Redux DevTools</a> to debug issues with Redux
* If JavaScript files aren’t updating in the browser after modifying the code locally:
* Make sure that Chrome isn’t caching the old JavaScript file (disable cache is checked in the network tab of the developer tools)
* Make sure npm start is running (steps 3-4 in Run instructions) 


### Adding Dependencies

Any time a new Python dependency is installed using Pip, it should also be added to requirements.txt. Similarly, any time a new JavaScript dependency installed using npm, it should also be added to package.json. 

## File Structure:
For the website for this project, most of the files used can be found in the static folder. 

Static/css contains the css files for the website. front.css contains the style for the front page of the website. cover.css contains the style for the results and context page of the website. 

Static/imageFiles contains the images used throughout the website. 140x197.jpg and 720x480.jpg can be used as placeholder images if you cannot connect to the database. logo.jpg, photoIcon.jpg, and textIcon.jpg can all be viewed on the front page. photoUploadIcon.jpg can be seen in the color search modal.

Static/js contains all of the javascript files relevant to the website. Static/js/components contains three folders, /graphs, /results, and /search.
* /graphs contains the .jsx files relevant to data visualizations. This is currently not included in the website but is compatible with our design.  
* /results contains the .jsx files for the results and context pages. AllFilms.jsx is the main file, which includes references to the other files in the folder.
* /search contains the .jsx files for the home page. SearchContainer.jsx is the main file, which includes references to the other files.
* In the root folder, `/docs` contains the documentation for the project as done by Team Endframe. The docs folder contains the user document, design document, poster for our final presentation, and a pdf of our slides for our final presentation. 


# Historical README Information:

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
