#!/usr/bin/env python

from __future__ import print_function

import argparse
import json
import os

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Read a key from the specified file')

    parser.add_argument('file', metavar='f', type=str, help='The directory to look in')
    parser.add_argument('key', metavar='k', type=str, help='The key to read')
    args = parser.parse_args()

    # Load JSON
    with open(args.file) as f:
        cfg = json.loads(f.read())

    # Print value and exit
    print(cfg[args.key])
