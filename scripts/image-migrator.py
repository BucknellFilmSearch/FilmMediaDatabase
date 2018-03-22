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

BUCKET_NAME = "bucknell-filmtvse"
URL = 'http://www.filmtvsearch.net/static/imageFiles/screenshots/'

http = httplib2.Http()
status, response = http.request(URL)
s3 = boto3.resource('s3')
bucket = s3.Bucket(BUCKET_NAME)

oclc_id_array = []

for link in BeautifulSoup(response, "html.parser", parse_only=SoupStrainer('a')):
    if link.has_attr('href'):
      oclc_id = link['href'][:-1]
      oclc_id_array += [oclc_id]

def worker(oclc_id):
  print('Starting on:', oclc_id)
  r = requests.get(URL + oclc_id + '/')
  data = r.text
  soup = BeautifulSoup(data, "html.parser")
  for link in soup.find_all('a'):
    image_name = link.get('href')
    if '.png' in image_name:
      print(oclc_id + '/' + image_name)
      response = requests.get(URL + oclc_id + '/' + image_name)
      data = BytesIO(response.content)
      file_name = oclc_id + "/" + image_name
      bucket.put_object(Key=file_name, Body=data)
  print('Finished:', oclc_id)

#set up threading
pool = Pool(16)
results = pool.map(worker, oclc_id_array)
pool.close()
pool.join()

