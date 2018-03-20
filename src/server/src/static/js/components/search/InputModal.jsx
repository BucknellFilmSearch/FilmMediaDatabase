/**
 * This file provides inputs for the user to do a text search.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {Dialog} from 'material-ui';
import SearchInput from './SearchInput.jsx';

/**
 * Uses Material-UI input components and dropdowns to allow user input for a text based search.
 */
export default class InputModal extends React.Component {


  handleClose() {
    this.setState({ errorText: '' });
    this.props.closeFcn();
  }

  render() {
    return (
      <div id='textIconImage' className='hoverHighlight' >
        <Dialog
          bodyStyle={{padding: 0}}
          modal={false}
          open={this.props.open}
          autoScrollBodyContent={true}
          onRequestClose={() => this.handleClose()}
        >
          <SearchInput />
        </Dialog>
      </div>
    );
  }
}
