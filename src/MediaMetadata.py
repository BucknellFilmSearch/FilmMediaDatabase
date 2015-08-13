#!/usr/bin/python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()
from sqlalchemy import Column, String, Integer
from base import BASE

__author__ = 'justi_000'

# configuration for media_metadata table on the postgresql database

class MediaMetadata(BASE):
    """Sqlalchemy media model"""
    __tablename__ = "media_metadata"

    oclc_id = Column('oclc_id', Integer, primary_key=True)
    movie_or_tv_show = Column('movie_or_tv_show', String)
    movie_title = Column('movie_title', String, nullable=True)
    show_title = Column('show_title', String, nullable=True)
    episode_title = Column('episode_title', String, nullable=True)
    season_number = Column('season_number', Integer, nullable=True)
    episode_number = Column('episode_number', Integer, nullable=True)
    director = Column('director', String, nullable=True)
    original_release_year = Column('original_release_year', Integer)
    dvd_release_year = Column('dvd_release_year', Integer)
    country1 = Column('country_1', String)
    country2 = Column('country_2', String, nullable=True)
    country3 = Column('country_3', String, nullable=True)
    genre1 = Column('genre1', String)
    genre2 = Column('genre2', String, nullable=True)
    genre3 = Column('genre3', String, nullable=True)
    content_rating = Column('content_rating', String, nullable=True)
    runtime_in_minutes = Column('runtime_in_minutes', Integer)
    cc_or_sub = Column('cc_or_sub', String)
    keyword_count = Column('keyword_count', Integer)