import * as React from "react";

import {DEBUG_MODE} from "../../app";


export class FilmMetadata extends React.Component<any, {}> {
    render() {
        return (
            <a href="/moviesearch/context/168630200/624/phone/All/1996/2016/2" className="list-group-item">
                <img className="thumbnail" style={{margin: "auto"}} src={DEBUG_MODE? "/static/imageFiles/140x197.jpg" : "http://www.filmtvsearch.net/static/imageFiles/" + this.props.metadata.movieOclcId + ".gif"} width="140" height="197" />
                <h4 className="list-group-item-heading">{ this.props.metadata.movieTitle }</h4>
                <p className ="list-group-item-text">OCLC ID: { this.props.metadata.movieOclcId }</p>
                <p className ="list-group-item-text"> { this.props.metadata.dvdReleaseYear } version of { this.props.metadata.movieReleaseYear } release</p>
            </a>
        )
    }
}