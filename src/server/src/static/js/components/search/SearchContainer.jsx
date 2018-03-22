/**
 * This file includes components from all other files from the search folder to render the homepage.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */


import * as React from 'react';
import { Panel as SearchInput } from './input';
import Footer from './Footer.jsx';

const styles = {
  input: {
    width: '80%',
    maxWidth: '800px',
    margin: ' 50px auto',
    border: '1px solid #ddd'
  },
  logoContainer: {
    'marginTop': '30px',
    'height': '150px'
  },
  logo: {
    fill: '#ccc',
    height: '150px',
    position: 'relative'
  }
};

/**
 * Renders the homepage for the web site. Includes TextInputModal and PhotoInputModal.
 */
export default class SearchContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      textSearchModalOpen: false
    };
  }

  openTextSearchModal() {
    this.setState({
      textSearchModalOpen: true
    });
  }

  closeTextSearchModal() {
    this.setState({
      textSearchModalOpen: false
    });
  }

  render() {
    return (
      <div id='frontPage'>
        <div id='mainHeader'>
          <div style={styles.logoContainer}>
            <img src='/static/imageFiles/logo.svg' id='logo' style={styles.logo} />
          </div>
          <h1>The Film Search Engine</h1>
          <h3>Research films like never before.</h3>
        </div>
        <div style={styles.input} >
          <SearchInput />
        </div>
        <Footer/>
      </div>
    );
  }
}
