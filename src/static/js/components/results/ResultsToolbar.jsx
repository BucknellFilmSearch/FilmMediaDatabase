import * as React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from "react-router";
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const ResultsToolbar = () => (
    <Toolbar className="resultsToolbar">
        <ToolbarGroup firstChild={true}>
            <Link to={"/"}><FlatButton label="Home" /></Link>
        </ToolbarGroup>
        <ToolbarGroup>
            <ToolbarTitle text="Search Results" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton label="Sort" primary={true} />
            <RaisedButton label="Filter" primary={true} />
        </ToolbarGroup>
    </Toolbar>
);

export default ResultsToolbar;