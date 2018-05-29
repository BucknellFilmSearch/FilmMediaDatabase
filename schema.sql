--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: media_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE media_metadata (
    oclc_id integer NOT NULL,
    movie_or_tv_show character varying,
    movie_title character varying,
    show_title character varying,
    episode_title character varying,
    season_number integer,
    episode_number integer,
    director character varying,
    original_release_year integer,
    dvd_release_year integer,
    country_1 character varying,
    country_2 character varying,
    country_3 character varying,
    genre1 character varying,
    genre2 character varying,
    genre3 character varying,
    content_rating character varying,
    runtime_in_minutes integer,
    cc_or_sub character varying,
    keyword_count integer
);


--
-- Name: media_metadata_oclc_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE media_metadata_oclc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_metadata_oclc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE media_metadata_oclc_id_seq OWNED BY media_metadata.oclc_id;


--
-- Name: media_recognized_objects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE media_recognized_objects (
    id integer NOT NULL,
    db_line_id integer,
    text_label character varying,
    confidence real,
    bounding_left integer,
    bounding_right integer,
    bounding_top integer,
    bounding_bottom integer
);


--
-- Name: media_recognized_objects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE media_recognized_objects_id_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_recognized_objects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE media_recognized_objects_id_seq OWNED BY media_recognized_objects.id;


--
-- Name: media_text; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE media_text (
    db_line_id integer NOT NULL,
    oclc_id integer,
    line_number integer,
    start_time_stamp character varying,
    end_time_stamp character varying,
    line_text character varying,
    search_vector tsvector
);


--
-- Name: media_text_db_line_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE media_text_db_line_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_text_db_line_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE media_text_db_line_id_seq OWNED BY media_text.db_line_id;


--
-- Name: media_metadata oclc_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_metadata ALTER COLUMN oclc_id SET DEFAULT nextval('media_metadata_oclc_id_seq'::regclass);


--
-- Name: media_recognized_objects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_recognized_objects ALTER COLUMN id SET DEFAULT nextval('media_recognized_objects_id_seq'::regclass);


--
-- Name: media_text db_line_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_text ALTER COLUMN db_line_id SET DEFAULT nextval('media_text_db_line_id_seq'::regclass);


--
-- Name: media_metadata media_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_metadata
    ADD CONSTRAINT media_metadata_pkey PRIMARY KEY (oclc_id);


--
-- Name: media_recognized_objects media_recognized_objects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_recognized_objects
    ADD CONSTRAINT media_recognized_objects_pkey PRIMARY KEY (id);


--
-- Name: media_text media_text_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_text
    ADD CONSTRAINT media_text_pkey PRIMARY KEY (db_line_id);


--
-- Name: label_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX label_index ON media_recognized_objects USING btree (text_label);


--
-- Name: textsearch_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX textsearch_index ON media_text USING gin (search_vector);


--
-- Name: media_text media_text_search_vector_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER media_text_search_vector_update BEFORE INSERT OR UPDATE ON media_text FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('search_vector', 'pg_catalog.english', 'line_text');


--
-- Name: media_recognized_objects media_recognized_objects_db_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_recognized_objects
    ADD CONSTRAINT media_recognized_objects_db_line_id_fkey FOREIGN KEY (db_line_id) REFERENCES media_text(db_line_id);


--
-- Name: media_text media_text_oclc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY media_text
    ADD CONSTRAINT media_text_oclc_id_fkey FOREIGN KEY (oclc_id) REFERENCES media_metadata(oclc_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

