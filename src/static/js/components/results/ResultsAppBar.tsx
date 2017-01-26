import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from "react-router";
import FlatButton from 'material-ui/FlatButton';


const ResultsAppBar = () => (
    <AppBar
        title={<span>Search Results</span>}
        iconElementRight={<FlatButton label="Filter" />}
        iconElementLeft={<Link to={"/"}><FlatButton label="Home" /></Link>}
        className="resultsAppBar"
    />
);

export default ResultsAppBar;