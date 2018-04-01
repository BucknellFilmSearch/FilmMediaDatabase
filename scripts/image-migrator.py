#!/usr/bin/env python

from __future__ import print_function
import httplib2
import requests
from bs4 import BeautifulSoup, SoupStrainer
import boto3
from PIL import Image
import requests
from io import BytesIO
from multiprocessing import Pool
import signal
import sys

import os
from glob import glob

BUCKET_NAME = "bucknell-filmtvse"
URL = 'http://www.filmtvsearch.net/static/imageFiles/screenshots/'

http = httplib2.Http()
status, response = http.request(URL)
s3 = boto3.resource('s3')
bucket = s3.Bucket(BUCKET_NAME)

oclc_id_array = []

path = '/media/eric/media'

all_files = [y for x in os.walk(path) for y in glob(os.path.join(x[0], '*.png'))]

# print(all_files[0])
# sys.exit(0)

# for link in BeautifulSoup(response, "html.parser", parse_only=SoupStrainer('a')):
#     if link.has_attr('href'):
#       oclc_id = link['href'][:-1]
#       oclc_id_array += [oclc_id]

def worker(filename):
  # print('Starting on:', oclc_id)
  # r = requests.get(URL + oclc_id + '/')
  # data = r.text
  # soup = BeautifulSoup(data, "html.parser")
  # for link in soup.find_all('a'):
  #   image_name = link.get('href')
  #   if '.png' in image_name:
  # print(filename)
  # response = requests.get(URL + oclc_id + '/' + image_name)
  data = open(filename, 'rb')
  bucket.put_object(Key=filename[18:], Body=data)
  print('Finished:', filename)

#set up threading
pool = Pool(16)
results = pool.map(worker, all_files)
pool.close()
pool.join()

