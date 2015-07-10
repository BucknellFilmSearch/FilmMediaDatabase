__author__ = 'justi_000'

import numpy as np
import cv2
import sqlite3 as lite

def createAllScreenshots():

    oclcId = input("OCLC number for media? ")

    connection = lite.connect('cpcp.db')
    cursor = connection.cursor()

    with connection:
        command = "SELECT LineNumber, StartTimeStamp, EndTimeStamp FROM ALLTEXT WHERE OCLC_ID = ?"
        cursor.execute(command, (oclcId,))

    line_to_snapshot = cursor.fetchone()
    line_number_to_snapshot = line_to_snapshot[0]
    start_time_stamp_to_snapshot = line_to_snapshot[1]
    end_time_stamp_to_snapshot = line_to_snapshot[2]

    vob_file = 0
    video_capture = cv2.VideoCapture('D:/0_The Cell Phone Cinema Project/src/CPCPModel/static/videoFiles/' + \
                                     str(oclcId) + '/VTS_' + str(vob_file) + '.vob')

    # get the frames per second value from the video
    frames_per_second = video_capture.get(cv2.CAP_PROP_FPS)
    # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
    secondsStart = int(start_time_stamp_to_snapshot[0:2]) * 3600 + int(start_time_stamp_to_snapshot[3:5]) * 60 + int(start_time_stamp_to_snapshot[6:8]) + \
        float("0." + start_time_stamp_to_snapshot[9:11])
    secondsEnd = int(end_time_stamp_to_snapshot[0:2]) * 3600 + int(end_time_stamp_to_snapshot[3:5]) * 60 + int(end_time_stamp_to_snapshot[6:8]) + \
        float("0." + end_time_stamp_to_snapshot[9:11])
    seconds = secondsStart + ((secondsEnd-secondsStart)/2)
    # get the frame number to grab
    frame_to_read = round(seconds * frames_per_second)

    while(True):
        # set the capture position to the determined frame number to grab, THIS IS WHERE ALL THE LAG IS!
        video_capture.set(cv2.CAP_PROP_POS_FRAMES, frame_to_read)
        # grab frame
        ret, frame = video_capture.read()
        if frame is None:
            break
        # if we've found the frame we're looking for, take snapshot, load information about next line
        else:
            cv2.imwrite('static/imageFiles/screenshots/' + str(oclcId) + '-' + str(line_number_to_snapshot) + '.png', frame)

            line_to_snapshot = cursor.fetchone()
            if not line_to_snapshot:
                break
            line_number_to_snapshot = line_to_snapshot[0]
            start_time_stamp_to_snapshot = line_to_snapshot[1]
            end_time_stamp_to_snapshot = line_to_snapshot[2]

            # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
            secondsStart = int(start_time_stamp_to_snapshot[0:2]) * 3600 + int(start_time_stamp_to_snapshot[3:5]) * 60 + int(start_time_stamp_to_snapshot[6:8]) + \
                           float("0." + start_time_stamp_to_snapshot[9:11])
            secondsEnd = int(end_time_stamp_to_snapshot[0:2]) * 3600 + int(end_time_stamp_to_snapshot[3:5]) * 60 + int(end_time_stamp_to_snapshot[6:8]) + \
                         float("0." + end_time_stamp_to_snapshot[9:11])
            seconds = secondsStart + ((secondsEnd-secondsStart)/2)
            # get the frame number to grab
            frame_to_read = round(seconds * frames_per_second)

    # current_frame = 0
    # while(True):
    #     current_frame += 1
    #     ret, frame = video_capture.read()
    #     if frame is None:
    #         vob_file += 1
    #         video_capture = cv2.VideoCapture('D:/0_The Cell Phone Cinema Project/src/CPCPModel/static/videoFiles/' + \
    #                                  str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
    #         # get the frames per second value from the video
    #         frames_per_second = video_capture.get(cv2.CAP_PROP_FPS) / 2
    #         # retry the frame grab
    #         ret, frame = video_capture.read()
    #         if frame is None:
    #             break
    #     # if we've found the frame we're looking for, take snapshot, load information about next line
    #     if current_frame == frame_to_read:
    #         cv2.imwrite('static/imageFiles/screenshots/' + str(oclcId) + '-' + str(line_number_to_snapshot) + '.png', frame)
    #
    #         line_to_snapshot = cursor.fetchone()
    #         if not line_to_snapshot:
    #             break
    #         line_number_to_snapshot = line_to_snapshot[0]
    #         start_time_stamp_to_snapshot = line_to_snapshot[1]
    #         end_time_stamp_to_snapshot = line_to_snapshot[2]
    #
    #         # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
    #         secondsStart = int(start_time_stamp_to_snapshot[0:2]) * 3600 + int(start_time_stamp_to_snapshot[3:5]) * 60 + int(start_time_stamp_to_snapshot[6:8]) + \
    #                float("0." + start_time_stamp_to_snapshot[9:11])
    #         secondsEnd = int(end_time_stamp_to_snapshot[0:2]) * 3600 + int(end_time_stamp_to_snapshot[3:5]) * 60 + int(end_time_stamp_to_snapshot[6:8]) + \
    #              float("0." + end_time_stamp_to_snapshot[9:11])
    #         seconds = secondsStart + ((secondsEnd-secondsStart)/2)
    #         # get the frame number to grab
    #         frame_to_read = round(seconds * frames_per_second)


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
    # video_capture = cv2.VideoCapture('static/videoFiles/' + str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
    video_capture = cv2.VideoCapture('D:/0_The Cell Phone Cinema Project/src/CPCPModel/static/videoFiles/' + \
                                     str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
    # get the frames per second value from the video
    frames_per_second = video_capture.get(cv2.CAP_PROP_FPS)
    # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
    secondsStart = int(startTimeStamp[0:2]) * 3600 + int(startTimeStamp[3:5]) * 60 + int(startTimeStamp[6:8]) + \
        float("0." + startTimeStamp[9:11])
    secondsEnd = int(endTimeStamp[0:2]) * 3600 + int(endTimeStamp[3:5]) * 60 + int(endTimeStamp[6:8]) + \
        float("0." + endTimeStamp[9:11])
    seconds = secondsStart + ((secondsEnd-secondsStart)/2)
    # get the frame number to grab
    frame_to_read = round(seconds * frames_per_second)
    # get the number of frames in the clip
    frames_in_clip = video_capture.get(cv2.CAP_PROP_FRAME_COUNT)
    while frame_to_read > frames_in_clip:
        vob_file += 1
        video_capture = cv2.VideoCapture('D:/0_The Cell Phone Cinema Project/src/CPCPModel/static/videoFiles/' + \
                                         str(oclcId) + '/VTS_' + str(vob_file) + '.vob')
        frame_to_read = frame_to_read - frames_in_clip
        frames_in_clip = video_capture.get(cv2.CAP_PROP_FRAME_COUNT)
    # set the capture position to the determined frame number to grab, THIS IS WHERE ALL THE LAG IS!
    video_capture.set(cv2.CAP_PROP_POS_FRAMES, frame_to_read)
    # try to grab the frame
    ret, frame = video_capture.read()
    # if frame is none, then the frame we need is not in the vobs...which would be bad
    if frame is not None:
        # everything done, release the capture
        video_capture.release()
        # write to a .bmp image
        cv2.imwrite('static/imageFiles/screenshots/' + str(oclcId) + '-' + str(lineNumber) + '.png', frame)

createAllScreenshots()