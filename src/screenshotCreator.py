__author__ = 'justi_000'

from sys import path

path.append('C:\Python34\Lib\site-packages')

import numpy as np
import cv2
from sqlalchemy import create_engine, distinct, func, update, text
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker
from MediaText import MediaText
from postgresSettings import DATABASE
from os import makedirs, path
from sys import exit


def createAllScreenshots(oclcId):
    """
    Create all screenshots for specified media item.
    :param oclcId: oclcId for media item to create screenshots for.
    """
    # create connection to database
    engine = create_engine(URL(**DATABASE))
    Session = sessionmaker(bind=engine)
    session = Session()
    # construct query
    query = session.query(MediaText.line_number, MediaText.start_time_stamp, MediaText.end_time_stamp).\
        filter(MediaText.oclc_id == oclcId)

    # get info about first line to snapshot
    query_line_count = query.count()
    print(query_line_count)
    all_query_lines = query.all()
    current_line = 0
    line_to_snapshot = all_query_lines[current_line]
    line_number_to_snapshot = line_to_snapshot[0]
    start_time_stamp_to_snapshot = line_to_snapshot[1]
    end_time_stamp_to_snapshot = line_to_snapshot[2]
    current_line += 1

    vob_file = 0
    # create video capture object
    video_capture = cv2.VideoCapture('E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/videoFiles/Finished Movies/' + \
                                     str(oclcId) + '/VTS_' + str(vob_file) + '.mp4')

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

    while current_line < query_line_count:
        # set the capture position to the determined frame number to grab, THIS IS WHERE ALL THE LAG IS!
        video_capture.set(cv2.CAP_PROP_POS_FRAMES, frame_to_read)
        # grab frame
        ret, frame = video_capture.read()
        if frame is None:
            break
        # if we've found the frame we're looking for, take snapshot, load information about next line
        else:
            if not path.exists('E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/' + str(oclcId)):
                makedirs('E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/' + str(oclcId))
            # write screenshot to external hard drive
            cv2.imwrite('E:/0_The Cell Phone Cinema Project/src/CPCPModel/static/imageFiles/screenshots/' + str(oclcId) + '/' + str(line_number_to_snapshot) + '.png', frame)

            # ger info about consecutive line to snapshot
            line_to_snapshot = all_query_lines[current_line]
            line_number_to_snapshot = line_to_snapshot[0]
            start_time_stamp_to_snapshot = line_to_snapshot[1]
            end_time_stamp_to_snapshot = line_to_snapshot[2]
            current_line += 1

            # get the total number of seconds from which to grab the screenshot (from right in between the two timestamps)
            secondsStart = int(start_time_stamp_to_snapshot[0:2]) * 3600 + int(start_time_stamp_to_snapshot[3:5]) * 60 + int(start_time_stamp_to_snapshot[6:8]) + \
                float("0." + start_time_stamp_to_snapshot[9:11])
            secondsEnd = int(end_time_stamp_to_snapshot[0:2]) * 3600 + int(end_time_stamp_to_snapshot[3:5]) * 60 + int(end_time_stamp_to_snapshot[6:8]) + \
                float("0." + end_time_stamp_to_snapshot[9:11])
            seconds = secondsStart + ((secondsEnd-secondsStart)/2)
            # get the frame number to grab
            frame_to_read = round(seconds * frames_per_second)

# comment out the lines below to use dbDataEntry, uncomment them out to create screenshots alone
oclcId = input("OCLC number for media? ")
createAllScreenshots(oclcId)