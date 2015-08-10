#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
from wsgiref.handlers import CGIHandler
from main import appInstance
cgitb.enable()

CGIHandler().run(appInstance)

__author__ = 'justi_000'
