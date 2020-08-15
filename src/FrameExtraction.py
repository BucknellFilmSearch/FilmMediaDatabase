__author__ = "Shane Staret"
__date__ = "August 12, 2020"

import os
from os import path
import cv2
from tkinter import *
from tkinter import filedialog
from functools import partial


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
    name_of_file_start_index = file_path.name.rindex('/')
    name_of_file_end_index = file_path.name.rindex('.')
    name_of_file = file_path.name[name_of_file_start_index + 1:name_of_file_end_index]

    path_parent = os.path.dirname(os.getcwd())
    movie_dir_path = '/movies'

    if not os.path.exists(path_parent + movie_dir_path):
        os.mkdir(path_parent + movie_dir_path)

    os.chdir(path_parent + movie_dir_path)

    if not os.path.exists(name_of_file):
        root.destroy()
        os.mkdir(name_of_file)

        path_parent = os.getcwd()
        os.chdir(path_parent + '/' + name_of_file)
        frame_folder_name = 'frames'
        os.mkdir(frame_folder_name)

        path_parent = os.getcwd()
        os.chdir(path_parent + '/' + frame_folder_name)

        frame_path = os.getcwd()
        extractFrames(file_path.name, frame_path)

    else:
        # Create the GUI
        root = Tk()
        root.title('Movie Exists')

        # Create the text above the button
        text = Label(root, text='Movie with same name already exists!', )
        text.config(font=('Courier', 14))
        text.grid(row=0, column=0, padx=30, pady=(30, 0))

        # Create the button to upload a movie
        button = Button(root, text='OK', command=root.destroy)
        button.config(font=('Courier', 14))
        button.grid(row=1, column=0, padx=30, pady=(0, 30))

        # Put the window in front, make the window not resizeable, and then run the GUI
        root.attributes("-topmost", True)
        root.resizable(False, False)
        root.update_idletasks()

        # Center the GUI
        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        size = tuple(int(_) for _ in root.geometry().split('+')[0].split('x'))
        x = screen_width / 2 - size[0] / 2
        y = screen_height / 2 - size[1] / 2
        root.geometry('+%d+%d' % (x, y))

        root.mainloop()


# function to extract each frame of a video
def extractFrames(movie_file_path, frames_file_path):
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

    while success:
        vidcap.set(cv2.CAP_PROP_FPS, fps)  # added this line
        success, image = vidcap.read()

        if success:
            cv2.imwrite(str(frames_file_path) + "/frame%d.jpg" % count, image)  # save frame as JPEG file

        count = count + 1

    # Create the completion GUI
    root = Tk()
    root.title('Frame Extraction Complete')

    # Create the text above the progress bar
    above_text = Label(root, text='All frames have been extracted from ' + movie_file_path)
    above_text.config(font=('Courier', 14))
    above_text.grid(row=0, column=0, padx=30, pady=(30, 0))

    # Create the button to close window
    button = Button(root, text='OK', command=root.destroy)
    button.config(font=('Courier', 14))
    button.grid(row=1, column=0, padx=30, pady=(0, 30))

    # Put the window in front, make the window not resizeable, and then run the GUI
    root.attributes("-topmost", True)
    root.resizable(False, False)
    root.update_idletasks()

    # Center the GUI
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    size = tuple(int(_) for _ in root.geometry().split('+')[0].split('x'))
    x = screen_width / 2 - size[0] / 2
    y = screen_height / 2 - size[1] / 2
    root.geometry('+%d+%d' % (x, y))

    root.mainloop()


menuGui()