__author__ = "Dale Hartman"
__date__ = "March 1, 2017 4:27:00 PM$"

# This file contains settings for the color search process
# Make sure to update pathToScreenshots whenever you move from local dev machine to server and vice versa


# hsvBins is the size of the array used to describe the color makeup of the image
# Higher values give more fine-grain detail when comparing images, but take more time and storage space
# hsvTotal is the total number of values calculated for each image
hsvBins = [8, 6, 3]
hsvTotal = hsvBins[0] * hsvBins[1] * hsvBins[2]


# This should be uncommented when working on your local machine
# Comment it out for the server
# Be sure to adjust the mapped drive name if neccessary
pathToScreenshots = "E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/"

# TODO: This should be uncommented on the server
# Comment it out when working on your local machine
# pathToScreenshots = "/home1/filmtvse/public_html/static/imageFiles/screenshots/"


