__author__ = "Justin Eyster"
__date__ = "$May 12, 2015 9:47:20 AM$"

from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
import sys
from flask import Flask
import flask_admin as admin
from postgresSettings import DATABASE

choice = input("Reset database? Enter 9 to continue, anything else to cancel: ")
if choice != "9":
    sys.exit()

engine = create_engine(URL(**DATABASE))
base = declarative_base()

class Media(base):
    """Sqlalchemy media model"""
    __tablename__ = "media"

    oclc_id = Column(Integer, primary_key=True)
    movie_or_show = Column('movie_or_show', String)
    movie_title = Column('movie_title', String, nullable=True)
    show_title = Column('show_title', String, nullable=True)
    episode_title = Column('episode_title', String, nullable=True)
    season_number = Column('season_number', Integer, nullable=True)
    episode_number = Column('episode_number', Integer, nullable=True)
    director = Column('director', String)
    original_release_year = Column('original_release_year', String)
    dvd_release_year = Column('dvd_release_year', String)
    country1 = Column('country_1', String)
    country2 = Column('country_2', String, nullable=True)
    country3 = Column('country_3', String, nullable=True)
    genre1 = Column('genre1', String)
    genre2 = Column('genre2', String, nullable=True)
    genre3 = Column('genre3', String, nullable=True)
    mpaa_rating = Column('mpaa_rating', String, nullable=True)
    tv_rating = Column('tv_rating', String, nullable=True)
    runtime_in_minutes = Column('runtime_in_minutes', Integer)
    cc_or_sub = Column('cc_or_sub', String)

class AllText(base):
    """Sqlalchemy all text model"""
    __tablename__ = "all_text"

    oclc_id = Column('oclc_id', Integer, ForeignKey('media.oclc_id', ondelete='CASCADE'))
    line_number = Column(Integer, primary_key=True)
    start_time_stamp = Column('start_time_stamp', String)
    end_time_stamp = Column('end_time_stamp', String)
    line_text = Column('line_text', String)

base.metadata.create_all(engine)