__author__ = "Dale Hartman"
__date__ = "July 21, 2016 3:38:40 PM$"

from histogramDescriptor import HistogramDescriptor
import pickle
import glob
import cv2

def main_menu():
    """
    main function of the Indexer process.  Gets the
    OCLC ID number from the user
    """
    oclcID = input("Input the OCLC number of the movie whose screenshots"
                 "you would like to index: ")
    indexer(oclcID)

def indexer(oclcID):
    """
    Indexes the histogram of all screenshots of a single film,
    then writes the index to file.
    """

    # Initialize the dictionary that will store our histogram data
    index = {}

    # initialize the image decriptor.  The bin counts listed here are
    # guesses at an optimal value and can be improved through testing
    desc = HistogramDescriptor([8, 12, 3])

    # we use the glob package to loop over the screenshots in our directory
    for imagePath in glob.glob("E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/"
                                       + str(oclcID) + "/*.png"):
        # extract the unique ID to be used in the index
        # here, we use the image filename aka the screenshot number
        key = imagePath[imagePath.rfind("\\") + 1:]

        # FOR TESTING PURPOSES print out the key so we know
        # what exactly is getting put into the index
        print(key)

        # load the image using openCV and put it through
        # the descriptor.  Then put the results into the index
        image = cv2.imread(imagePath)
        features = desc.describe(image)
        index[key] = features

    # All the images in the movie's directory have been indexed.
    # Now we write the index to disc
    f = open("E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/"
             + str(oclcID) + "/index.pickle", "wb")
    pickle.dump(index, f)
    f.close()

    # Print a final status update to ensure we indexed all images
    print("done, indexed", len(index), "images")

main_menu()

