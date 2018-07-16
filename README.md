# Film Search Engine
[![Build Status](https://travis-ci.org/BucknellFilmSearch/FilmMediaDatabase.svg?branch=master)](https://travis-ci.org/BucknellFilmSearch/FilmMediaDatabase)



## Table of Contents

1. [Installation](#installation)
2. [Execution](#execution)
3. [Adding Dependencies](#adding-dependencies)
4. [File Structure](#file-structure)
5. [Contributors](#contributors)



## Installation:

The following instructions are intended to be used with a BASH shell.
Note that if run on a machine that does not support BASH, most, if not all of the scripts will not work.
If running from Windows, we recommend using the
[Ubuntu Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) for this

### Required Dependencies
- [`Python`](https://www.python.org/"): A language that is used in many of the scripts in this project

- [`Pip`](https://pip.pypa.io/en/stable/): a python package manager. This is used to install all the backend
    dependencies.

- [`Node JS`](https://nodejs.org/en/download/): A lightweight JavaScript runtime. Bundled with Node is
    [`NPM`](https://www.npmjs.com/)(node package manager), which is used to install and manage the project's JavaScript
    dependencies.

- [`PostgresQL`](https://www.postgresql.org/download/): A SQL database that conforms to the ANSI-SQL:2008 standard. The
    database maintenance scripts provided assume that the default user on the development machine has all superuser
    permissions.

### Optional (but recommended) Dependencies
- [`Yarn`](https://yarnpkg.com/en/docs/install): A JavaScript package manager maintained by Facebook that is
    interchangeable with NPM, but uses a local cache for already installed libraries and is often faster than NPM

- [`virtualenv`](https://virtualenv.pypa.io/en/stable/)/
    [`virtualenvwrapper`](https://virtualenvwrapper.readthedocs.io/en/latest/): A Python virtual environment manager to
    prevent installation of packages in one's system files. This also circumvents the bugs due to
    [Mac OSX's SIP](https://support.apple.com/en-us/HT204899)


### Setup

These steps only need to be followed once to set up the development environment. 

```bash
# 1.  Install all required dependencies listed above
# 1.b If using virtualenv/virtualenvwrapper, create a virtual environment and activate it
# 2.  Ensure you have files set up in the 'credentials' directory as specified

# 3.  Clone the repository:
$ git clone https://github.com/BucknellFilmSearch/FilmMediaDatabase.git
$ cd FilmMediaDatabase

# 4.  Copy your configuration files into the 'configuration' directory
$ rm -rf configuration && cp -R /path/to/config/directory configuration

# 5.  Run the setup script:
$ ./scripts/local/setup.sh

# 6.  Create a Postgres database for the project
$ psql postgres

  # IN PSQL
  # -------------------------------
  # CREATE DATABASE filmtvse;
  # \q
  # -------------------------------

# 7.  (OPTION 1) Run the database creator if starting with no data
$ ./scripts/utils/createDb.sh
#     (OPTION 2) Run the database duplicator if you want to get data
#                from an existing database (duplicates the production)
$ ./scripts/utils/duplicateDb.sh

# 8.  Gain User Access: Go to your ./configuration/postgres/config.json file and change the “development” user to match the “production” user. 

# 9.  Create a Postgres User
$ psql postgres

  # IN PSQL
  # -------------------------------
  # CREATE USER <development user>;
  # GRANT ALL PRIVILEGES ON DATABASE filmtvse TO <development user>;
  # \q
  # -------------------------------

# 10.  Ensure all access rights 
$ psql filmtvse

  # IN PSQL
  # -------------------------------
  # GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <development user>;
  # \q
  # -------------------------------
```

## Execution

### Development

This project is set up to run in a development mode that will watch for changes to source files and reload the
server/frontend when they change.

To run the development server:

```bash
# Run the dev-server script
$ ./scripts/local/start.sh
```

### Deployment

Deploying the project involves compiling all ES6 code into ES5 (supported by more browsers & node), inserting necessary
configuration files, and packaging the frontend code into a browser-friendly JavaScript file. This enables faster
execution for the server at runtime.

There are two ways to build/deploy the project, as shown below:

__Method 1:__ Automated build and relocation (recommended)

This method will build the project and then use the credentials specified in `/credentials/ec2` to deploy the project to
the specified ssh host.

```bash
# Run deployment script
$ ./scripts/remote/deploy.sh
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
- Install the [React Developer Tools](https://github.com/facebook/react-devtools)
    for React debugging
- Install [Redux DevTools](https://github.com/gaearon/redux-devtools#browser-extension) for Redux debugging
- If JavaScript files aren’t updating in the browser after modifying the code locally:
  - Make sure that Chrome isn’t caching the old JavaScript file (disable cache is checked in the network tab of the
      developer tools)
  - Use `⌃+⇧+R` (Windows/Linux) or `⌘+⇧+R` (Mac) to refresh the page cache


## Adding Dependencies

#### Python

```bash
# Use pip to install new dependency
$ pip install <new_dependency>

# Save new requirements.txt file
$ pip freeze > /src/requirements.txt
```

#### JavaScript

```bash
# Must be in /src/server or one of its child directories

# Using npm
$ npm install --save <new_dependency>

# Using yarn
$ yarn add <new_dependency>
```



## File Structure:

__NOTE:__ Each subdirectory has its own README.txt with a more in-depth description of its contents and own subdirectories

- [`src`](src) - All source code files in the project
    - [`server`](src/server) - All code related to the server/frontend
- [`scripts`](scripts)
    - [`local`](scripts/local) - Scripts that are used for local maintenance/builds
    - [`remote`](scripts/remote) - Scripts that are used for deployment/remote management
    - [`utils`](scripts/utils) - Utility scripts for use in other scripts/migration
- [`configuration`](configuration) - All config files that should NOT be included in the repository for security reasons
    - [`api`](configuration/api) - AWS credentials
    - [`contact`](configuration/contact) - SMTP Credentials
    - [`ec2`](configuration/ec2) - EC2 Credentials
    - [`postgres`](configuration/postgres) - Postgres credentials

For the website for this project, most of the files used can be found in the static folder. 

[`/src/server/src/static/css`](src/server/src/static/css) contains the css files for the website.
front.css contains the style for the front page of the website.
cover.css contains the style for the results and context page of the website. 

[`/src/server/src/static/imageFiles`](src/server/src/static/imageFiles) contains the images used throughout the website.
140x197.jpg and 720x480.jpg can be used as placeholder images if you cannot connect to the database. logo.jpg,
photoIcon.jpg, and textIcon.jpg can all be viewed on the front page. photoUploadIcon.jpg can be seen in the color
search modal.

[`/src/server/src/static`](src/server/src/static) contains all of the javascript files for the frontend.
[`/src/server/src/static/js/components`](src/server/src/static/js/components) contains two folders `results`, and
`search`.
- `/results` contains the .jsx files for the results and context pages. AllFilms.jsx is the main file, which includes
references to the other files in the folder.
- `/search` contains the .jsx files for the home page. SearchContainer.jsx is the main file, which includes references
to the other files.
- In the root folder, `/docs` contains the documentation for the project as done by Team Endframe. The docs folder
contains the user document, design document, poster for our final presentation, and a pdf of our slides for our final
presentation. 



## Contributors

### Original Project:
- Professor Dr. John Hunter, Comparative Humanities
- Justin Eyster '17
- Dale Hartman '18

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

### Color Search and Backend Connection
- Sarah Eckermann '20
