#!/usr/bin/env python

from __future__ import print_function
from multiprocessing import Pool
from glob import glob

import boto3
import argparse
import os
import re

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('bucket', type=str, help='The name of the S3 bucket')
parser.add_argument('rootpath', type=str, help='The root directory of the image files')
parser.add_argument('--ext', '-e', type=str, default='*.png', help='Optional file extensions to look for')
parser.add_argument('--dir', '-d', type=str, help='Optional directory to place the files into')
args = parser.parse_args()

s3 = boto3.resource('s3')
bucket = s3.Bucket(args.bucket)
print('Connected to S3 Bucket ({})'.format(args.bucket))
all_files = [y for x in os.walk(args.rootpath) for y in glob(os.path.join(x[0], args.ext))]
print('Uploading {} files'.format(len(all_files)))

def worker(filename):
  data = open(filename, 'rb')
  match = re.match(r'^.+\/((.+)\/(.+))$', filename)
  bucket.put_object(Key=match.group(1), Body=data)
  print('  Uploaded:', filename)

#set up threading
pool = Pool(16)
results = pool.map(worker, all_files)
pool.close()
pool.join()

print('Done')
