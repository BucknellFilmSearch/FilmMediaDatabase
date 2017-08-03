__author__ = 'Sarah Xu'

# import numpy as np
# import cv2
# from sqlalchemy import create_engine, distinct, func, update, text
# from sqlalchemy.engine.url import URL
# from sqlalchemy.orm import sessionmaker
# from MediaText import MediaText
# from postgresSettings import DATABASE
# from os import makedirs, path
# from sys import exit

from sys import path
import os
import subprocess
import shutil
import pandas as pd

from Tkinter import *
import tkFileDialog
import numpy as np
import glob

path.append('C:\Python34\Lib\site-packages')

def fixFileNameInDrive(cvspath, filepath):
    """
    This function finds the exact matches between the csv file
    and the movie names in the hard drive. If there is an exact match,
    change the fileName to the format "oclc_movieName" for better processing
    e.g. "ALL_THAT_HEAVEN_ALLOWS" => "47213663_ALL_THAT_HEAVEN_ALLOWS"
    :param cvspath: 
    :param filepath: 
    :return: 
    """
    filmdf = parseCSV(cvspath)
    movieDict = filmdf['oclc'].to_dict()
    #movieDict = {str(k).upper().replace(' ', '_'):v for k,v in movieDict.iteritems()}
    totalfile = 0
    count = 0
    for i in os.listdir(filepath):
        totalfile += 1
        if (i == '$RECYCLE.BIN' or i == 'System Volume Information' or i == '.Trash-1000'):
            continue

        if not hasOclc(i):
            # upi = i.upper().replace(' ', '_')
            m = findMovie(i, movieDict)
            if (m != None):
                count += 1
                oclc = movieDict[m]
                if (oclc != 'NaN'):
                    oclc = str(int(oclc))
                    newName = oclc +'_'+ m.upper().replace(' ', '_')
                    shutil.move(filepath + '/' + i, filepath + '/' + newName)
            else:
                enterMovieInfo(i, movieDict, filmdf)
                filmdf.to_csv(cvspath) # save the csv file each time we enter a new movie
                print("========= Metadata spreadsheet updated ===========================")
                print("========= Converting VOB to MP4 ==================================")
                input = filepath + '/' + i + '/VIDEO_TS/VTS_0.vob'
                output = filepath + '/' + i + '/VIDEO_TS/test.mp4'
                #subprocess.call(['ffmpeg', '-i', input, '-c:v', 'libx264', '-crf', '23', '-c:a', 'aac', '-ac', '2', '-ab', '192k', output])
                subprocess.call(['ffmpeg', '-i', input, output])

    print("total: " + str(totalfile))
    print("fixed: " + str(count))





def enterMovieInfo(movieName, movieDict, filmdf):
    print("The movie name in hard drive is: " + movieName)
    print("The possible matches in metasheet are: ")
    movieList = findPossibleMatch(movieName, movieDict)
    numMatches = len(movieList)
    print("Number of potential matches found: " + str(numMatches))
    if (numMatches >= 1):
        for i in movieList:
            print("Movie Name is: " + i)
            print(filmdf.loc[i, ['oclc', 'Movie Release Year', 'DVD Release Year', 'Country of Origin',\
                                 'IMDB Genre', 'Genre 2', 'Genre 3', 'Director', 'MPAA Rating', 'Run Time (minutes)']])
            select = raw_input("Is the right infomation? (Y/N) ")
            if (select == 'Y' or select == 'y'):
                return i
    print("No matches found, please enter the movie info into the metasheet")
    print("================================================================")
    _enterDataToDf(filmdf)


def _enterDataToDf(filmdf):
    # print(filmdf[filmdf.index.duplicated()])
    # print(filmdf[filmdf.columns.duplicated()])

    movie_title = raw_input("Movie title: ")
    oclc_id = int(raw_input("Enter the DVD's unique OCLC number (from Bucknell's WorldCat catalog): "))
    original_release_year = int(raw_input("Movie's original release year: "))
    dvd_release_year = int(raw_input("DVD release year: "))
    while True:
        country1 = raw_input("Country 1 (3 digit UN code): ")
        country2 = raw_input("Country 2 (if applicable): ")
        country3 = raw_input("Country 3 (if applicable): ")
        if len(country1) == 3 and (len(country2) == 3 or len(country2) == 0) \
                and (len(country3) == 3 or len(country3) == 0):
            break
        else:
            print("Your 'Country' entries were not 3 digits each. Please \
                   use the United Nation's official 3 digit country \
                   codes when specifying countries.")
    genre1 = raw_input("Genre 1 (from imdb): ")
    genre2 = raw_input("Genre 2 (if applicable): ")
    genre3 = raw_input("Genre 3 (if applicable): ")
    director = raw_input("Director: ")
    content_rating = raw_input("MPAA rating (or enter 'Unrated'): ")
    runtime_in_minutes = int(raw_input("Run time (in whole minutes): "))

    print("\nCarefully verify that the following movie information is correct: ")
    print("Movie title: " + movie_title)
    print("OCLC number: " + str(oclc_id))
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


    columnNames = ['oclc', 'Movie Release Year', 'DVD Release Year', 'Country of Origin', 'Country 2', 'Country 3',\
                         'IMDB Genre', 'Genre 2', 'Genre 3', 'Director', 'MPAA Rating', 'Run Time (minutes)']
    contentList = [oclc_id, original_release_year, dvd_release_year, country1, country2, country3, genre1, genre2,\
                   genre3, director, content_rating, runtime_in_minutes]
    filmdf.loc[movie_title] = np.NaN
    filmdf.loc[movie_title, columnNames] = contentList
    filmdf.sort_index(ascending=True, inplace=True)

    print("=========== Dataframe updated ==================")


def hasOclc(filename):
    return filename[0:7].isdigit()


"""
Parse through the hard drive. 
If the movie data is not yet entered in the database, 
automatically launch SubRip to run on the VOB files.
:param cvspath: the TV Database Metadata spreadsheet for reference
:param filepath: the hard drive directory we will parse
"""
def parseDrive(cvspath, filepath):
    filmdf = parseCSV(cvspath)
    movielist = filmdf['movieName'].tolist()
    movielist = [x.upper() for x in movielist]
    movielist = [x.replace(' ', '_') for x in movielist]
    oclclist = filmdf.index.tolist()
    print(movielist)

    # for root, dirs, filenames in os.walk(indir):
    #      for d in dirs:
    #          if(d == "ALL_THAT_HEAVEN_ALLOWS"):
    #             print d
    cur = "1"
    n = 0
    for i in os.listdir(filepath):
        print(i)
        print(findMovie(i, movielist))

        # if (i == "ALL_THAT_HEAVEN_ALLOWS"):
        #     print i
        #     for root, dirs, filenames in os.walk(indir + "/" + i):
        #         for f in filenames:
        #             # Find the VOB file with largest number n
        #             # Assume filename are uniformly name as "VTS_0x_n"
        #             if f.startswith("VTS_0") and f.endswith(".VOB"):
        #                 print f
        #                 if (int(f[7]) > n):
        #                     cur = f[5]
        #                     n = int(f[7])
        #                 print(n)
        #                 print(cur)


def parseCSV(csvpath):
    """
    Read in a csv file containing the film's metadate and 
    return a corresponding pandas dataframe for processing 

    :param csvpath the location of the csv file
    """
    df = pd.read_csv(csvpath, index_col='movieName')
    df.head()
    df.sort_index(ascending=True, inplace=True)

    # #print(df)
    # print(df['movieName'].tolist())
    # # print(df.index.tolist())
    return df



def findPossibleMatch(movieName, movieDict):
    upf = str(movieName).upper().replace(' ', '_')
    movieList = []
    for m, v in movieDict.iteritems():
        upm = str(m).upper().replace(' ', '_')
        if upm in upf or upf in upm:
            movieList.append(m)
    return movieList

def findMovie(movieName, movieDict):

    upf = str(movieName).upper().replace(' ', '_')
    # Spacial case 1: "0_THE_CELL_PHONE_CINEMA_PROJECT"
    if (upf == "0_THE_CELL_PHONE_CINEMA_PROJECT"):
        return None

    # # # Case 1: BLACK_SUNDAY vs. black sunday
    # if (hasNumbers(movieName)):
    #     print(movieName)
    #     return None #TODO: return None for now, fix this later

    for m, v in movieDict.iteritems():
        upm = str(m).upper().replace(' ', '_')
        if upm == upf:
            return m
        elif (upm == "THE_"+upf): # handles the case when 'the' is missing
            return m
        elif (upm.replace('_','') == upf): # handles the case when no white space in name
            return m
        elif (upm == "THE_"+upf): # handles the case when 'the' is missing
            return m
        elif (upm.replace('_','') == "THE"+upf): # handles the case when above two happens
            return m

    return None


#csvpath = '/home/sarah/hunter/film_tv_db_metadata.csv'
# fixFileNameInDrive(csvpath, indir)
