__author__ = 'justi_000'

import numpy as np
import cv2

seconds = float(input("How many seconds?"))

cap = cv2.VideoCapture('static/videoFiles/VTS_01_2.VOB')
fps = cap.get(cv2.CAP_PROP_FPS)
frame_to_read = seconds * fps
cap.set(cv2.CAP_PROP_POS_FRAMES, frame_to_read)
ret, frame = cap.read()
cv2.imwrite("test.jpg", frame)

# When everything done, release the capture
cap.release()