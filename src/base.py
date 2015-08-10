#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

from sqlalchemy.ext.declarative import declarative_base

BASE = declarative_base()