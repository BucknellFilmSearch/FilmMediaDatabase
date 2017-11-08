__author__ = "Justin Eyster"
__date__ = "$May 12, 2015 9:47:20 AM$"

from sqlalchemy import create_engine, event, DDL, Index
from sqlalchemy.engine.url import URL

#from postgresSettings import DATABASE
from MediaMetadata import MediaMetadata
from MediaText import MediaText
from base import BASE
import json

with open("dbConfig.json", 'r') as json_file:
    json_data = json.load(json_file)

# this script initializes the remote postgres database using the specifications of MediaText.py and MediaMetadata.py
# connects to the database using settings specified in postgresSettings.py
engine = create_engine(URL(**json_data))
base = BASE

# create trigger to update the search_vector when data is inserted or changed
trigger_ddl = DDL("CREATE TRIGGER media_text_search_vector_update BEFORE INSERT OR UPDATE " + \
                  "ON media_text " + \
                  "FOR EACH ROW EXECUTE PROCEDURE " + \
                  "tsvector_update_trigger(search_vector,'pg_catalog.english',line_text);")
event.listen(MediaText.__table__, 'after_create', trigger_ddl)

BASE.metadata.create_all(engine, checkfirst=True)
