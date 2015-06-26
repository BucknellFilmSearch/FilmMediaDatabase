__author__ = "Justin Eyster"
__date__ = "$May 12, 2015 9:47:20 AM$"

from sqlalchemy import create_engine, event, DDL, Index
from sqlalchemy.engine.url import URL
from src.CPCPModel.postgresSettings import DATABASE
from src.CPCPModel.MediaText import *
from src.CPCPModel.MediaMetadata import *
from src.CPCPModel.base import BASE

engine = create_engine(URL(**DATABASE))
base = declarative_base()

BASE.metadata.create_all(engine, checkfirst=True)

# create trigger to update the search_vector when data is inserted or changed
trigger_ddl = DDL("""
    CREATE TRIGGER media_text_search_vector_update BEFORE INSERT OR UPDATE
    ON media_text
    FOR EACH ROW EXECUTE PROCEDURE
    tsvector_update_trigger(search_vector,'pg_catalog.english',line_text);
""")
table = MediaText.__table__
event.listen(table, 'after_create', trigger_ddl.execute(bind=engine))

# create index using the search vector to speed up searches
Index('textsearch_index', MediaText.search_vector, postgresql_using='gin').create(bind=engine)