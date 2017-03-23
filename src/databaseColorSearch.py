__author__ = "Dale Hartman"
__date__ = "July 21, 2016 3:38:40 PM$"

# Many implementation details for the color search process were learned from
# the PyImageSearch blog at https://www.pyimagesearch.com/

from colorSearcher import ColorSearcher, OptimizedColorSearcher
from histogramDescriptor import HistogramDescriptor
import numpy as np
import pickle
import cv2
import os
import colorInit

def main_menu():
    """
    main function of the Search process.  Gets the
    OCLC ID number from the user
    """
    oclcID = input("Input the OCLC number of the source movie"
                   " of the search query: ")
    lineNumber = input("Enter the Line number of the image you would like"
                       " to use as a query: ")
    fullColorSearch(oclcID, lineNumber)
    optimizedColorSearch(oclcID, lineNumber)

def fullColorSearch(oclcID, lineNumber):
    """
    Run a visual search through every screenshot in the database
    """

    queryFile = lineNumber + ".png"
    path = colorInit.pathToScreenshots

    # load the index we have saved for this movie
    indexPath = path + str(oclcID) + "/index.pickle"
    index = pickle.load(open(indexPath, mode="rb"))

    # Debugging line to check the contents of the image index
    # print(index.keys())

    # get the features of our query image
    queryFeatures = index[str(oclcID) + "\\" + queryFile]

    # initialize a dictionary that will store our distance results
    # from all films in the database
    results = {}

    # Iterate through all movie files in the screenshots folder
    for filmID in os.listdir(path):
        # for each movie in the database
        # open the index file for this movie
        indexPath = path + str(filmID) + "/index.pickle"
        index = pickle.load(open(indexPath, mode="rb"))

        # initialize our searcher class for this film
        searcher = ColorSearcher(index, False)

        # perform the search using the query image, then add to our combined results
        print("Performing test on images from " + str(filmID))
        results.update(searcher.search(queryFeatures))

    # sort our search results to obtain the most relevant images
    results = sorted([(v, k) for (k,v) in results.items()])


    # The commented section below displays the top few search results in pop-up windows
    # Useful for testing changes to the search algorithm on your local machine
    '''

    # display the query image
    queryImage = cv2.imread(path + str(oclcID) + "/" + queryFile)
    cv2.imshow("Query", queryImage)
    print("query: " + queryFile)

    # initialize two cv2 montages to display our top 8 results
    montageA = np.zeros((480*2, 720*2, 3), dtype = "uint8")
    montageB = np.zeros((480*2, 720*2, 3), dtype = "uint8")

    # loop over the top eight results
    for j in range(0, 8):
        # grab the result and load the image
        # The index tag for each image is oclcID\lineNum.png
        (score, imageTag) = results[j]
        imPath = path + "/" + imageTag
        result = cv2.imread(imPath)
        print(str(j+1) + ". " + imageTag + ": " + str(score))

        # check which montage to place the result in
        if j < 4:
            montageA[(j // 2) * 480:((j + 2) // 2) * 480, (j % 2) * 720:((j % 2) + 1) * 720] = result

        else:
            montageB[((j - 4) // 2) * 480:(((j - 4) + 2) // 2) * 480, ((j - 4) % 2) * 720:(((j - 4) % 2) + 1) * 720] = result

    # show the results
    cv2.imshow("Results 1-4", montageA)
    cv2.imshow("Results 5-8", montageB)
    cv2.waitKey(0)

    '''

    return results


def optimizedColorSearch(imgPath):
    """
    Run a color search that uses our reverse indexing system to only compare images that are likely similar already
    :param imgPath: Path to an image in our file system to use as a query
    :return: A list of tuples in the form (1.7101471707244245, '855265148\\1341.png'), where the first element is the
    calculated similarity value and the second value is a unique key made of the OCLCID and line number/image file of
    the screenshot.  This list of tuples contains a result for every screenshot that the query was tested against.
    """

    # Load our query image
    image = cv2.imread(imgPath)

    # Set up our image descriptor and generate our color histogram for this image
    image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    desc = HistogramDescriptor(colorInit.hsvBins)
    queryFeatures = desc.describe(image)

    # Find the most frequent colors, we use this to check against our reverse index
    topColors = np.argsort(queryFeatures)[-2:]

    pathToScreenshots = colorInit.pathToScreenshots

    # initialize a dictionary that will store our distance results
    # from all films in the database
    results = {}

    # Iterate through all movie files in the screenshots folder
    for filmID in os.listdir(pathToScreenshots):
        try:
            # for each movie in the database
            # open the index file and reverse index file for this movie
            indexPath = pathToScreenshots + str(filmID) + "/index.pickle"
            index = pickle.load(open(indexPath, mode="rb"))
            revIndexPath = pathToScreenshots + str(filmID) + "/revIndex.pickle"
            revIndex = pickle.load(open(revIndexPath, mode="rb"))

            # initialize our searcher class for this film
            searcher = OptimizedColorSearcher(index, revIndex, False)

            # perform the search using the query image, then add to our combined results
            print("Performing test on images from " + str(filmID))
            results.update(searcher.search(queryFeatures, topColors))
        except:
            # if a film is missing index files, just skip that film
            pass

    # sort our search results to obtain the most relevant images
    results = sorted([(v, k) for (k,v) in results.items()])


    # The commented section below displays the top few search results in pop-up windows
    # Useful for testing changes to the search algorithm on your local machine
    '''

    # display the query image
    queryImage = cv2.imread(path + str(oclcID) + "/" + queryFile)
    cv2.imshow("Query", queryImage)
    print("query: " + queryFile)

    # initialize two cv2 montages to display our top 8 results
    montageA = np.zeros((480*2, 720*2, 3), dtype = "uint8")
    montageB = np.zeros((480*2, 720*2, 3), dtype = "uint8")

    # loop over the top eight results
    for j in range(0, 8):
        # grab the result and load the image
        # The index tag for each image is oclcID\lineNum.png
        (score, imageTag) = results[j]
        imPath = path + "/" + imageTag
        result = cv2.imread(imPath)
        print(str(j+1) + ". " + imageTag + ": " + str(score))

        # check which montage to place the result in
        if j < 4:
            montageA[(j // 2) * 480:((j + 2) // 2) * 480, (j % 2) * 720:((j % 2) + 1) * 720] = result

        else:
            montageB[((j - 4) // 2) * 480:(((j - 4) + 2) // 2) * 480, ((j - 4) % 2) * 720:(((j - 4) % 2) + 1) * 720] = result

    # show the results
    cv2.imshow("Results 1-4", montageA)
    cv2.imshow("Results 5-8", montageB)
    cv2.waitKey(0)

    '''


    return results


# TODO: The main_menu() function is only for simplicity of testing, comment out when you put this file on the webserver
# main_menu()

