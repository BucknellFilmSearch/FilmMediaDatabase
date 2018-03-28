# Film Search Engine
[![Build Status](https://travis-ci.org/BucknellFilmSearch/FilmMediaDatabase.svg?branch=master)](https://travis-ci.org/BucknellFilmSearch/FilmMediaDatabase)

## Abstract:
The Film Search Engine started as a database of lines of dialogue from films with a corresponding screenshot. Each screenshot was taken from the film during the time the line of dialogue was being spoken. This relational database allows users to search for text and be returned images, which is invaluable in film and media research. However, an idea is only as good as its ability to be reached by its users. The database needed a website which would not only allow users to conduct their research, but allow them to do so quickly and intuitively. 

Our project aimed to make a well designed web interface to aid in the research being conducted by our users. By employing good design practices, we were able to narrow down exactly what users need to be successful and make them want to return to our website in the future. We selected React.js for building our website and followed Google’s Material-UI style guide, both of which are decisions that will make it easier for people to continue development in the future. Our work resulted in an intuitive application, granting users the ability to easily conduct their research and view their results in a well formatted environment. 

## Installation:

The following instructions are intended to be used with a BASH shell. Note that if run on a machine that does not support BASH, most, if not all of the scripts will not work. If running from Windows, we recommend using the [Ubuntu Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) for this

### Required Dependencies
- [`Python`](https://www.python.org/"): A language that is used in many of the scripts in this project
- [`Pip`](https://pip.pypa.io/en/stable/): a python package manager. This is used to install all the backend dependencies.
- [`Node JS`](https://nodejs.org/en/download/): A lightweight JavaScript runtime. Bundled with Node is [`NPM`](https://www.npmjs.com/)(node package manager), which is used to install and manage the project's JavaScript dependencies.
- [`PostgresQL`](https://www.postgresql.org/download/): A SQL database that conforms to the ANSI-SQL:2008 standard.

### Optional (but recommended) Dependencies
- [`Yarn`](https://yarnpkg.com/en/docs/install): A JavaScript package manager maintained by Facebook that is interchangeable with NPM, but uses a local cache for already installed libraries and is often faster than NPM


### Setup

These steps only need to be followed once to set up the development environment. 

```bash
# 1. Install all required dependencies listed above
# 2. Ensure you have files set up in the 'credentials' directory as specified

# 3. Clone the repository:
$ git clone https://github.com/BucknellFilmSearch/FilmMediaDatabase.git

# 4. Run the setup script:
$ ./scripts/local/setup.sh
```

### Development

This project is set up to run in a development mode that will watch for changes to source files and reload the server/frontend when they change.

To run the development server:

```bash
# Run the dev-server script
$ ./scripts/local/start.sh
```

### Deployment

Deploying the project involves compiling all ES6 code into ES5 (supported by more browsers & node), inserting necessary configuration files, and packaging the frontend code into a browser-friendly JavaScript file. This enables faster execution for the server at runtime.

There are two ways to build/deploy the project, as shown below:

__Method 1:__ Automated build and relocation (recommended)

This method will build the project and then use the credentials specified in `/credentials/ec2` to deploy the project to the specified Amazon EC2 instance.

```bash
# Run deployment script
$ ./scripts/local/deploy.sh
```

__Method 2:__ Automated build with manual relocation

This method will only build the project, allowing the resulting directory to be moved to a location as desired

```bash
# Run build script
$ ./scripts/local/build.sh

# Move to desired location
$ mv ./build <location>
```

### Web Development Tips

- Use Google Chrome and its debugging tools
- Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for React debugging
- Install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) for Redux debugging
- If JavaScript files aren’t updating in the browser after modifying the code locally:
  - Make sure that Chrome isn’t caching the old JavaScript file (disable cache is checked in the network tab of the developer tools)
  - Use `⌃+⇧+R` (Windows/Linux) or `⌘+⇧+R` (Mac) to refresh the page cache


### Adding Dependencies

#### Python



#### JavaScript



## File Structure:
For the website for this project, most of the files used can be found in the static folder. 

Static/css contains the css files for the website. front.css contains the style for the front page of the website. cover.css contains the style for the results and context page of the website. 

Static/imageFiles contains the images used throughout the website. 140x197.jpg and 720x480.jpg can be used as placeholder images if you cannot connect to the database. logo.jpg, photoIcon.jpg, and textIcon.jpg can all be viewed on the front page. photoUploadIcon.jpg can be seen in the color search modal.

Static/js contains all of the javascript files relevant to the website. Static/js/components contains three folders, /graphs, /results, and /search.
- `/graphs` contains the .jsx files relevant to data visualizations. This is currently not included in the website but is compatible with our design.  
- `/results` contains the .jsx files for the results and context pages. AllFilms.jsx is the main file, which includes references to the other files in the folder.
- `/search` contains the .jsx files for the home page. SearchContainer.jsx is the main file, which includes references to the other files.
- In the root folder, `/docs` contains the documentation for the project as done by Team Endframe. The docs folder contains the user document, design document, poster for our final presentation, and a pdf of our slides for our final presentation. 


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


## Contributors

### Original Project:
- Professor Dr. John Hunter, Comparative Humanities
- Justin Eyster '17, Summer Research Student
- Dale Hartman '18, Presidential Fellow

### Modern Interface Design for Film Search Engine
- Nadeem Nasimi '17  
- Elliot Radsliff '17  
- Anmol Singh '17  
- Devon Wasson '17

### Object Search and Backend Rewrite
- Andrew Capuano '18
- Stefano Cobelli '18
- Eric Marshall '18
- Cole Whitley '18