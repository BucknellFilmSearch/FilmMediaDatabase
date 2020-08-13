__author__ = "Shane Staret"
__date__ = "August 12, 2020"

import os
import threading

import cv2
from tkinter import *
from tkinter import filedialog
from tkinter import ttk
from functools import partial
from moviepy.editor import VideoFileClip
from threading import Thread


# menuGui to allow user to upload a video
def menuGui():
    # Create the GUI
    root = Tk()
    root.title('Movie Upload')
    root.update_idletasks()

    # Center the GUI
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    size = tuple(int(_) for _ in root.geometry().split('+')[0].split('x'))
    x = screen_width/2 - size[0]/2
    y = screen_height/2 - size[1]/2
    root.geometry('+%d+%d' % (x, y))

    # Create the text above the button
    text = Label(root, text='Upload a movie', )
    text.config(font=('Courier', 14))
    text.grid(row=0, column=0, padx=30, pady=(30, 0))

    # Create the button to upload a movie
    button = Button(root, text='Browse...', command=partial(buttonClicked, root))
    button.config(font=('Courier', 14))
    button.grid(row=1, column=0, padx=30, pady=(0, 30))

    # Put the window in front, make the window not resizeable, and then run the GUI
    root.attributes("-topmost", True)
    root.resizable(False, False)
    root.mainloop()


# function that runs once the button to upload a movie is clicked
def buttonClicked(root):
    file_path = filedialog.askopenfile(filetypes=[("Movie files", ".mov .qt .mp4 .avi .mpeg .webm .3pg")])
    root.destroy()
    name_of_file_start_index = file_path.name.rindex('/')
    name_of_file_end_index = file_path.name.rindex('.')
    name_of_file = file_path.name[name_of_file_start_index + 1:name_of_file_end_index]

    path_parent = os.path.dirname(os.getcwd())
    os.chdir(path_parent + '/movies')
    os.mkdir(name_of_file)

    path_parent = os.getcwd()
    os.chdir(path_parent + '/' + name_of_file)
    frame_folder_name = 'frames'
    os.mkdir(frame_folder_name)

    path_parent = os.getcwd()
    os.chdir(path_parent + '/' + frame_folder_name)

    frame_path = os.getcwd()
    extractFrames(file_path.name, frame_path)


# function to extract each frame of a video
def extractFrames(movie_file_path, frames_file_path):

    # Create the progress GUI
    root = Tk()
    root.title('Frame Extraction')
    root.update_idletasks()

    thread1 = threading.Thread(target=frames, args=(movie_file_path, frames_file_path))
    thread2 = threading.Thread(target=progress, args=(root))  # Create threads and pass arguments to function
    thread1.start()
    thread2.start()  # Start threads

    thread1.join()  # Wait until thread1 has finished execution
    thread2.terminate()  # Wait until thread2 has finished execution
    root.destroy()


def frames(movie_file_path, frames_file_path):
    count = 1
    vidcap = cv2.VideoCapture(movie_file_path)
    vidcap.read()
    success = True

    # find OpenCV version
    (major_ver, minor_ver, subminor_ver) = cv2.__version__.split('.')

    if int(major_ver) < 3:
        fps = vidcap.get(cv2.cv.CV_CAP_PROP_FPS)

    else:
        fps = vidcap.get(cv2.CAP_PROP_FPS)

    clip = VideoFileClip(movie_file_path)

    estimated_total_frames = int(clip.duration * fps)

    while success:
        vidcap.set(cv2.CAP_PROP_FPS, fps)    # added this line
        success, image = vidcap.read()

        if success:
            cv2.imwrite(str(frames_file_path) + "/frame%d.jpg" % count, image)     # save frame as JPEG file

        count = count + 1


def progress(root):
    # Center the GUI
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    size = tuple(int(_) for _ in root.geometry().split('+')[0].split('x'))
    x = screen_width / 2 - size[0] / 2
    y = screen_height / 2 - size[1] / 2
    root.geometry('+%d+%d' % (x, y))

    # Create the text above the progress bar
    above_text = Label(root, text='Frame Extraction in Progress...', )
    above_text.config(font=('Courier', 14))
    above_text.grid(row=0, column=0, padx=30, pady=(30, 0))

    # Create the progress bar
    progress_bar = ttk.Progressbar(root, orient=HORIZONTAL, length=300, mode='indeterminate')
    progress_bar.grid(row=1, column=0, padx=30)

    # Create the button to start frame extraction
    button = Button(root, text='Start', command=partial(progress, progress_bar))
    button.config(font=('Courier', 14))
    button.grid(row=1, column=0, padx=30, pady=(0, 30))

    # Put the window in front, make the window not resizeable, and then run the GUI
    root.attributes("-topmost", True)
    root.resizable(False, False)
    progress_bar.start(10)
    root.mainloop()


menuGui()
