__author__ = "Dale Hartman"
__date__ = "July 21, 2016 3:38:40 PM$"

import numpy as np
import cv2

class HistogramDescriptor:
    def __init__(self, bins):
        # store the number of bins the histogram will use
        # this descriptor uses the HSV colorspace
        # in OpenCV, Hue values range from 0-179, wile
        # Sat and Value range from 0-255
        self.bins = bins

    def describe(self, image):
        """
        Computes and normalizes the 3D histogram of an
        image in the HSV colorspace
        """

        # First, we need to convert the image from RGB standard
        # to HSV
        image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        # Also, initialize our descriptor list
        features = []


        hist = cv2.calcHist([image], [0,1,2], None, self.bins,
                            [0, 180, 0, 256, 0, 256])
        hist = cv2.normalize(hist, None)
        features = hist.flatten()

        # return our flattened histogram
        return features