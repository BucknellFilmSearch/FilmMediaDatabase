__author__ = "Dale Hartman"
__date__ = "July 21, 2016 3:38:40 PM$"

# Many implementation details for the color search process were learned from
# the PyImageSearch blog at https://www.pyimagesearch.com/

from rgbDescriptor import RGBDescriptor
from histogramDescriptor import HistogramDescriptor
import pickle
import glob
import cv2
import os
import gc
import colorInit
import numpy as np

def main_menu():
    """
    main function of the Indexer process.  Gets the
    OCLC ID number from the user
    """
    jobType = input("Enter 0 to index a single film, or 1 to index the"
                    " entire directory: ")
    if jobType == "0":
        oclcID = input("Input the OCLC number of the movie whose screenshots"
                 " you would like to index: ")
        indexer(oclcID)
    elif jobType == "1":
        fullIndexer()
    else:
        print("Invalid option")

def indexer(oclcID):
    """
    Indexes the histogram of all screenshots of a single film,
    then writes the index to file.
    Also generates the reverse index that optimizes the search process
    """

    path = colorInit.pathToScreenshots

    # Initialize the dictionary that will store our histogram data
    index = {}

    # initialize the image decriptor.
    desc = HistogramDescriptor(colorInit.hsvBins)

    # Generate the reverse index
    revIndex = [[] for x in range(0, colorInit.hsvTotal)]


    # we use the glob package to loop over the screenshots in our directory
    for imagePath in glob.glob(colorInit.pathToScreenshots + str(oclcID) + "/*.png"):
        # extract the unique ID to be used in the index
        # here, we use the oclcID and the image filename aka the screenshot number
        key = imagePath[imagePath.rfind("/") + 1:]

        # FOR TESTING PURPOSES print out the key so we know
        # what exactly is getting put into the index
        print(key)

        # load the image using openCV and put it through
        # the descriptor.  Then put the results into the index
        image = cv2.imread(imagePath)
        features = desc.describe(image)
        index[key] = features

        # Now, figure out what the most frequent colors in this image are,
        # And mark this key down under those colors in the reverse index

        # -2 sets many top colors we keep track of in each image
        # set closer to 0 to make the search more strict, fewer results, faster, less accurate
        # set further from zero to make the search take longer, but better match a full search
        # If you change this, also change the similar lines in databaseColorSearch.py, and the
        # optimalList line in colorSearcher.py
        topIndex = np.argsort(features)[-2:]
        for i in topIndex:
            revIndex[i] += [key]

    # All the images in the movie's directory have been indexed.
    # Now we write the index to disc
    f = open(path + str(oclcID) + "/index.pickle", "wb")
    pickle.dump(index, f)
    f.close()

    # Save the reverse index to disc as well
    f = open(path + str(oclcID) + "/revindex.pickle", "wb")
    pickle.dump(revIndex, f)
    f.close()

    # Print a final status update to ensure we indexed all images
    print("done, indexed", len(index), "images")
    print(str(gc.collect()))
    return

def fullIndexer():
    """
    Creates an index for every film in the screenshots directory
    """
    # Set up the path to our screenshots folder
    path = colorInit.pathToScreenshots

    # Go to each folder in the screenshots directory, then index them
    for filmID in os.listdir(path):
        indexer(filmID)
        print(str(gc.collect()))
    return

# main_menu()

