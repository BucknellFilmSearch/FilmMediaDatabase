# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.

__author__ = "Justin Eyster"
__date__ = "$May 21, 2015 11:47:11 AM$"

from sys import exit

from sqlalchemy import create_engine, func
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker
from MediaMetadata import MediaMetadata
from MediaText import MediaText
from postgresSettings import DATABASE
from screenshotCreator import createAllScreenshots

# create connection to database
engine = create_engine(URL(**DATABASE))
Session = sessionmaker(bind=engine)
session = Session()

def main_menu():
    """
    Main menu for data entry processes.
    """
    while True:
        choice = input("Enter 0 to enter a movie into the database, 1 for a TV show, or 2 to exit: ")
        if choice == "0":
            enter_movie()
        elif choice == "1":
            enter_tv_show()
        elif choice == "2":
            exit()
        else:
            print("Invalid entry. Try again.")

def enter_movie():
    """
    Assists user in entering a movie into the postgres database.
    """
    oclc_id = int(input("Enter the DVD's unique OCLC number (from Bucknell's WorldCat catalog): "))
    movie_or_tv_show = "Movie"
    movie_title = input("Movie title: ")
    director = input("Director: ")
    original_release_year = int(input("Movie's original release year: "))
    dvd_release_year = int(input("DVD release year: "))
    while True:
        country1 = input("Country 1 (3 digit UN code): ")
        country2 = input("Country 2 (if applicable): ")
        country3 = input("Country 3 (if applicable): ")
        if len(country1) == 3 and (len(country2) == 3 or len(country2) == 0) \
                and (len(country3) == 3 or len(country3) == 0):
            break
        else:
            print("Your 'Country' entries were not 3 digits each. Please \
                use the United Nation's official 3 digit country \
                codes when specifying countries.")
    genre1 = input("Genre 1 (from imdb): ")
    genre2 = input("Genre 2 (if applicable): ")
    genre3 = input("Genre 3 (if applicable): ")
    content_rating = input("MPAA rating (or enter 'Unrated'): ")
    runtime_in_minutes = int(input("Run time (in whole minutes): "))
    cc_or_sub = input("'CC' or 'Sub': ")

    print("\nCarefully verify that the following movie information is correct: ")
    print("OCLC number: " + str(oclc_id))
    print("Movie title: " + movie_title)
    print("Movie director: " + director)
    print("Movie release year: " + str(original_release_year))
    print("DVD release year: " + str(dvd_release_year))
    print("Country 1: " + country1)
    print("Country 2: " + country2)
    print("Country 3: " + country3)
    print("Genre 1: " + genre1)
    print("Genre 2: " + genre2)
    print("Genre 3: " + genre3)
    print("MPAA Rating: " + content_rating)
    print("Run time in minutes: " + str(runtime_in_minutes))
    print("'CC' file or 'Sub' file: " + cc_or_sub)

    while True:
        verification = input("Enter 1 if all the information above is correct, or 0 to reenter data: ")

        if verification == "1":

            # create Media object for the new movie, add it to the session, commit it to the database
            new_movie = MediaMetadata(oclc_id=oclc_id, movie_or_tv_show=movie_or_tv_show, movie_title=movie_title,
                                      director=director, original_release_year=original_release_year,
                                      dvd_release_year=dvd_release_year, country1=country1, country2=country2,
                                      country3=country3, genre1=genre1, genre2=genre2, genre3=genre3,
                                      content_rating=content_rating, runtime_in_minutes=runtime_in_minutes,
                                      cc_or_sub=cc_or_sub)
            session.add(new_movie)
            session.commit()

            # fill the all text table from file
            fillMediaTextTable(oclc_id)
            # create screenshots (stored on ext HDD)
            print("Processing screenshots...")
            createAllScreenshots(oclc_id)
            break

        elif verification == "0":
            enter_movie()
            break
        else:
            print("Invalid entry. Try again.")

def enter_tv_show():
    """
    Assists user in entering a tv show into the postgres database.
    """
    oclc_id = int(input("Enter the DVD's unique OCLC number (from Bucknell's WorldCat catalog): "))
    movie_or_tv_show = "TV Show"
    show_title = input("Show title: ")
    episode_title = input("Episode title: ")
    season_number = int(input("Season number: "))
    episode_number = int(input("Episode number: "))
    director = input("Director: ")
    original_release_year = int(input("Episode's original release year: "))
    dvd_release_year = int(input("DVD release year: "))
    while True:
        country1 = input("Country 1 (3 digit UN code): ")
        country2 = input("Country 2 (if applicable): ")
        country3 = input("Country 3 (if applicable): ")
        if len(country1) == 3 and (len(country2) == 3 or len(country2) == 0) \
                and (len(country3) == 3 or len(country3) == 0):
            break
        else:
            print("Your 'Country' entries were not 3 digits each. Please \
                use the United Nation's official 3 digit country \
                codes when specifying countries.")
    genre1 = input("Genre 1: ")
    genre2 = input("Genre 2 (if applicable): ")
    genre3 = input("Genre 3 (if applicable): ")
    content_rating = input("TV rating: ")
    runtime_in_minutes = int(input("Run time (in minutes): "))
    cc_or_sub = input("CC or Sub: ")

    print("\nCarefully verify that the following tv show information is correct: ")
    print("OCLC number: " + int(oclc_id))
    print("Show title: " + show_title)
    print("Episode title: " + episode_title)
    print("Season number: " + int(season_number))
    print("Episode number: " + int(episode_number))
    print("Show/episode director: " + director)
    print("Episode release year: " + int(original_release_year))
    print("DVD release year: " + int(dvd_release_year))
    print("Country 1: " + country1)
    print("Country 2: " + country2)
    print("Country 3: " + country3)
    print("Genre 1: " + genre1)
    print("Genre 2: " + genre2)
    print("Genre 3: " + genre3)
    print("TV Rating: " + content_rating)
    print("Run time in minutes: " + int(runtime_in_minutes))
    print("'CC' file or 'Sub' file: " + cc_or_sub)

    while True:
        verification = input("Enter 1 if all the information above is correct, or 0 to reenter data: ")

        if verification == "1":

            # create Media object for the new tv show, add it to the session, commit it to the database
            new_tv_show = MediaMetadata(oclc_id=oclc_id, movie_or_tv_show=movie_or_tv_show, show_title=show_title,
                                        episode_title=episode_title, season_number=season_number,
                                        episode_number=episode_number, director=director,
                                        original_release_year=original_release_year, dvd_release_year=dvd_release_year,
                                        country1=country1, country2=country2, country3=country3, genre1=genre1,
                                        genre2=genre2, genre3=genre3, content_rating=content_rating,
                                        runtime_in_minutes=runtime_in_minutes, cc_or_sub=cc_or_sub)
            session.add(new_tv_show)
            session.commit()

            # fill the text table from file
            fillMediaTextTable(oclc_id)
            # create screenshots (stored on ext HDD)
            print("Processing screenshots...")
            createAllScreenshots(oclc_id)
            break

        elif verification == "0":
            enter_tv_show()
            break
        else:
            print("Invalid entry. Try again.")

def fillMediaTextTable(oclc_id):
    """
    Method to fill a movie/tv show into the text table from the text file.
    Text files should be named OCLC_ID_NUMBER.txt, and be in the file location specified in first line of method.
    :param oclc_id:
    """

    with open("E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/textFiles/" + str(oclc_id) + ".txt", 'r') as file:
        currentLineNumber = "1"
        nextLineNumber = "1"
        startTimeStamp = ""
        endTimeStamp = ""
        lineText = ""
        firstRun = True
        max_db_line_id = session.query(func.max(MediaText.db_line_id)).all()[0][0]
        print(max_db_line_id)

        for line in file:

            # if the next line number has been found in the file...
            if line[0:len(nextLineNumber)] == nextLineNumber:
                max_db_line_id += 1
                print("Found line #" + nextLineNumber)
                # and it's not the very first line that we've found...
                if firstRun == False:
                    # add the data from the previous line to the database
                    new_line = MediaText(db_line_id=max_db_line_id, oclc_id=oclc_id, line_number=currentLineNumber,
                                         start_time_stamp=startTimeStamp, end_time_stamp=endTimeStamp,
                                         line_text=lineText.encode('utf-8'))
                    session.add(new_line)
                    session.commit()
                # start looking for the next line, clear the line text
                currentLineNumber = nextLineNumber
                nextLineNumber = str(int(nextLineNumber) + 1)
                lineText = ""
                firstRun = False
            # if a timestamp has been found...
            elif len(line) >= 9 and line[2] == ":" and line[5] == ":" and line[8] == ",":
                # if extra precision is needed: and line[19] == ":" and line[22] == ":" and line[25] == ",":
                print("Found timestamp line #" + currentLineNumber)
                timeStampLine = line
                # parse out the beginning and ending time stamp, separately
                startTimeStamp = timeStampLine[0:12]
                endTimeStamp = timeStampLine[17:29]
            # else, we know that what we've found must be the line text...
            else:
                print(line.encode('utf-8'))
                # add the line to the line text
                lineText += line
        # enter very last line
        max_db_line_id += 1
        new_line = MediaText(db_line_id=max_db_line_id, oclc_id=oclc_id, line_number=currentLineNumber,
                                         start_time_stamp=startTimeStamp, end_time_stamp=endTimeStamp,
                                         line_text=lineText.encode('utf-8'))
        session.add(new_line)
        session.commit()


# after methods are defined, go to main menu
main_menu()