/**
 * This file generates a grid of screenshots for an individual film. This is used in the AllFilms component, which
 * iterates through search results for multiple films.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from 'react';
import ScreenshotWithCaption from './ScreenshotWithCaption.jsx';
import {GridList} from 'material-ui/GridList';


/**
 * Creates a grid of screenshots for an individual film using the GridList
 * component from Material-UI.
 */
export default class IndividualFilmResults extends React.Component {

    /**
     * Iterate through screenshots and generate a screenshot component for each relevant
     * line of dialog.
     * @returns {JSX} A JSX object of a single screenshot with a caption
     */
  getScreenshotsWithCaption() {
    return this.props.individualFilm.results.map(object => (
      <ScreenshotWithCaption
        key={`screenshot${this.props.individualFilm.movieTitle}linenumber${object.movieLineNumber}`}
        screenshotDetails={object} movieOclcId={this.props.individualFilm.movieOclcId}
      />
      )
    );
  }

    /**
     * Render the screenshots along with a header containing the film name.
     * @returns {JSX} A JSX object representing this class
     */
  render() {
    return (
      <div className="screenshotsGridList" name={this.props.individualFilm.movieOclcId}>
        <div className="screenshotsMovieTitle">
          {this.props.individualFilm.movieTitle} ({this.props.individualFilm.movieReleaseYear})
        </div>
        <GridList cellHeight={180} cols={4}>
          { this.getScreenshotsWithCaption() }
        </GridList>
      </div>
    );
  }
}
