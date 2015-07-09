__author__ = 'justi_000'

import numpy as np
import cv2

def createScreenshot(startTimeStamp, endTimeStamp, oclcId, lineNumber):
    """ Saves screenshot from specified time in film.
    :param startTimeStamp: a timestamp, representing the length into the movie from which to get the screenshot.
    Format (HH:MM:SS,mil)
    :param endTimeStamp: a timestamp, representing the length into the movie from which to get the screenshot.
    Format (HH:MM:SS,mil)
    :param oclcId: the unique id number of the film that the shot is to come from.
    :param lineNumber: the line number of the line of the movie where we're grabbing the screenshot.
    :return: the screenshot, a bmp file.
    """
    # start with the 0th vob file
    vob_file = 1
    video_capture = cv2.VideoCapture('static/videoFiles/' + str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
    # get the frames per second value from the video
    frames_per_second = video_capture.get(cv2.CAP_PROP_FPS)
    # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
    secondsStart = int(startTimeStamp[0:2]) * 3600 + int(startTimeStamp[3:5]) * 60 + int(startTimeStamp[6:8]) + \
        float("0." + startTimeStamp[9:11])
    secondsEnd = int(endTimeStamp[0:2]) * 3600 + int(endTimeStamp[3:5]) * 60 + int(endTimeStamp[6:8]) + \
        float("0." + endTimeStamp[9:11])
    seconds = secondsStart + ((secondsEnd-secondsStart)/2)
    # get the frame number to grab
    frame_to_read = seconds * frames_per_second
    # get the number of frames in the clip
    frames_in_clip = video_capture.get(cv2.CAP_PROP_FRAME_COUNT)
    while frame_to_read > frames_in_clip:
        vob_file += 1
        video_capture = cv2.VideoCapture('static/videoFiles/' + str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
        frame_to_read -= frames_in_clip
        frames_in_clip = video_capture.get(cv2.CAP_PROP_FRAME_COUNT)
    # set the position to capture to the frame number to grab, frame_to_read
    video_capture.set(cv2.CAP_PROP_POS_FRAMES, frame_to_read)
    # try to grab the frame
    ret, frame = video_capture.read()
    # if frame is none, then the frame we need is not in the vobs...which would be bad
    if frame is not None:
        # everything done, release the capture
        video_capture.release()
        # write to a .bmp image
        cv2.imwrite('static/imageFiles/' + str(oclcId) + '-' + str(lineNumber) + '.bmp', frame)