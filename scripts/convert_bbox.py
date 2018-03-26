'''
Things to do:
Add class name
configure paths
Change parsing to one file for input coordinates from 
'''


# -*- coding: utf-8 -*-
"""
Created on Wed Dec  9 14:55:43 2015
This script is to convert the txt annotation files to appropriate format needed by YOLO 
@author: Guanghan Ning
Email: gnxr9@mail.missouri.edu
"""

import os
from os import walk, getcwd, listdir
from PIL import Image
import glob


def convert(size, box):
    dw = 1./size[0]
    dh = 1./size[1]
    x = (box[0] + box[1])/2.0
    y = (box[2] + box[3])/2.0
    w = box[1] - box[0]
    h = box[3] - box[2]
    x = x*dw
    w = w*dw
    y = y*dh
    h = h*dh
    return (x,y,w,h)
    
    
"""-------------------------------------------------------------------""" 
mypath = "bboxIn/"
bboxExt = "filelist_LBP.txt"
classes = listdir(mypath)
for i in range(len(classes) -1) :
    if classes[i].startswith(".") :
        classes.pop(i)
wd = getcwd()
out_file = open('%s/filelist_LBP_YOLO.txt'%(wd), 'w')

""" Get input text file list """
txt_name_list = []
for (dirpath, dirnames, filenames) in walk(mypath):
    txt_name_list.extend(filenames)
    break
print(txt_name_list)

""" Process """
for classifier in classes:
    # txt_file =  open("Labels/stop_sign/001.txt", "r")
    
    """ Open input text files """
    txt_path = mypath + classifier + '/' + bboxExt
    print("Input:" + txt_path)
    txt_file = open(txt_path, "r")
    lines = txt_file.read().split('\r\n')   #for ubuntu, use "\r\n" instead of "\n"

    """ Convert the data to YOLO format """
    ct = 0
    for line in lines:
        #print('lenth of line is: ')
        #print(len(line))
        #print('\n')
        if(len(line) >= 2):
            ct = ct + 1
            print(line + "\n")
            elems = line.split('\t')
            print(elems)
            img_path = wd + "/" + mypath + classifier + '/' + elems[0]
            #possible rearrange
            xmin = elems[1]
            xmax = elems[3]
            ymin = elems[2]
            ymax = elems[4]

            im= Image.open(img_path)
            w= int(im.size[0])
            h= int(im.size[1])
            #w = int(xmax) - int(xmin)
            #h = int(ymax) - int(ymin)
            # print(xmin)
            print(w, h)
            b = (float(xmin), float(xmax), float(ymin), float(ymax))
            bb = convert((w,h), b)
            print(bb)
            out_file.write(str(classes.index(classifier)) + " " + " ".join([str(a) for a in bb]) + '\n')
out_file.close() 

# Prepare test and train files

# Current directory
imageDir = os.path.dirname(os.path.abspath(__file__)) + "/" + mypath

# Directory where the data will reside, relative to 'darknet.exe'
path_data = 'bboxOut/'

# Percentage of images to be used for the test set
percentage_test = 10

# Create and/or truncate train.txt and test.txt
file_train = open('train.txt', 'w')  
file_test = open('test.txt', 'w')

# Populate train.txt and test.txt
counter = 1  
index_test = round(100 / percentage_test)
for classifier in classes :
    print(os.path.join(imageDir + classifier + "/" , "*.jpg"))
    for pathAndFilename in glob.iglob(os.path.join(imageDir + classifier + "/" , "*.jpg")) :  
        title, ext = os.path.splitext(os.path.basename(pathAndFilename))

        if counter == index_test:
            counter = 1
            file_test.write(path_data + title + '.jpg' + "\n")
            #print("Adding " + pathAndFilename + " to tester")
        else:
            file_train.write(path_data + title + '.jpg' + "\n")
            counter = counter + 1
            #print("Adding " + pathAndFilename + " to trainer")
