__author__ = "Dale Hartman"
__date__ = "July 21, 2016 3:38:40 PM$"

from colorSearcher import ColorSearcher
import numpy as np
import pickle
import cv2

def main_menu():
    """
    main function of the Search process.  Gets the
    OCLC ID number from the user
    """
    oclcID = input("Input the OCLC number of the movie whose screenshots"
                   " you would like to search through: ")
    lineNumber = input("Enter the Line number of the image you would like"
                       " to use as a query: ")
    singleMovieSearch(oclcID, lineNumber)

def singleMovieSearch(oclcID, lineNumber):
    """
    Run a simple search for similar images in the same movie
    """

    queryFile = lineNumber + ".png"
    path = "E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/" \
           + str(oclcID)

    # load the index we have saved for this movie
    indexPath = path + "/index.pickle"
    index = pickle.load(open(indexPath, mode="rb"))

    # print(index.keys())

    # initialize our searcher class
    searcher = ColorSearcher(index)

    # perform the search using the query image
    queryFeatures = index[queryFile]
    results = searcher.search(queryFeatures)

    # display the query image
    queryImage = cv2.imread(path + "/" + queryFile)
    cv2.imshow("Query", queryImage)
    print("query: " + queryFile)

    # initialize two cv2 montages to display our top 8 results
    montageA = np.zeros((480*2, 720*2, 3), dtype = "uint8")
    montageB = np.zeros((480*2, 720*2, 3), dtype = "uint8")

    # loop over the top ten results
    for j in range(0, 8):
        # grab the result and load the image
        (score, imageName) = results[j]
        imPath = path + "/" + imageName
        result = cv2.imread(imPath)
        print(str(j+1) + ". " + imageName + ": " + str(score))

        # check which montage to place the result in
        if j < 4:
            montageA[(j // 2) * 480:((j + 2) // 2) * 480, (j % 2) * 720:((j % 2) + 1) * 720] = result

        else:
            montageB[((j - 4) // 2) * 480:(((j - 4) + 2) // 2) * 480, ((j - 4) % 2) * 720:(((j - 4) % 2) + 1) * 720] = result

    # show the results
    cv2.imshow("Results 1-4", montageA)
    cv2.imshow("Results 5-8", montageB)
    cv2.waitKey(0)


main_menu()

