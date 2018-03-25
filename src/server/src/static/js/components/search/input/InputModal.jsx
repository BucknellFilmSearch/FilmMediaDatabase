import * as React from 'react';
import PropTypes from 'prop-types';
import {Dialog} from 'material-ui';
import InputPanel from './InputPanel.jsx';

/**
 * Uses Material-UI input components and dropdowns to allow user input for a text based search.
 */
class InputModal extends React.Component {


  handleClose() {
    this.props.closeFcn();
  }

  render() {
    return (
      <div>
        <Dialog
          bodyStyle={{ padding: 0}}
          modal={false}
          open={this.props.open}
          autoScrollBodyContent={true}
          onRequestClose={() => this.handleClose()}
        >
          <InputPanel handleClose={() => this.handleClose()} />
        </Dialog>
      </div>
    );
  }
}

InputModal.propTypes = {
  /** Whether or not the modal is currently open */
  open: PropTypes.bool.isRequired,
  /** Fires when the modal should be closed */
  closeFcn: PropTypes.func.isRequired
};

export default InputModal;
