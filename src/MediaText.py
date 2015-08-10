#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()
from sqlalchemy import Column, Integer, ForeignKey, String, Index
from sqlalchemy.dialects.postgresql import TSVECTOR
from base import BASE

__author__ = 'justi_000'

class MediaText(BASE):
    """Sqlalchemy all text model"""
    __tablename__ = "media_text"

    db_line_id = Column('db_line_id', Integer, primary_key=True, autoincrement=True)
    oclc_id = Column('oclc_id', Integer, ForeignKey('media_metadata.oclc_id', ondelete='CASCADE'))
    line_number = Column('line_number', Integer)
    start_time_stamp = Column('start_time_stamp', String)
    end_time_stamp = Column('end_time_stamp', String)
    line_text = Column('line_text', String)
    search_vector = Column('search_vector', TSVECTOR)

    # create index using the search vector to speed up searches
    Index('textsearch_index', search_vector, postgresql_using='gin')