#!/usr/bin/env python

from __future__ import print_function
from multiprocessing import Pool
from glob import glob

import boto3
import argparse
import os

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('bucket', type=str, help='The name of the S3 bucket')
parser.add_argument('rootpath', type=str, help='The root directory of the image files')
args = parser.parse_args()

s3 = boto3.resource('s3')
bucket = s3.Bucket(args.bucket)
print('Connected to S3 Bucket ({})'.format(args.bucket))
all_files = [y for x in os.walk(args.rootpath) for y in glob(os.path.join(x[0], '*.png'))]
print('Uploading {} files'.format(len(all_files)))

def worker(filename):
  data = open(filename, 'rb')
  bucket.put_object(Key=filename[18:], Body=data)
  print('  Uploaded:', filename)

#set up threading
pool = Pool(16)
results = pool.map(worker, all_files)
pool.close()
pool.join()

print('Done')
