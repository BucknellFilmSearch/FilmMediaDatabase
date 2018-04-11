/**
 * This file adds a footer to the homepage.
 *
 * Author: Team EndFrame
 * Organization: Bucknell University
 * Spring 2017
 */

import * as React from 'react';
import {
  Dialog,
  FlatButton,
  RaisedButton,
  Snackbar,
  TextField,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardText
} from 'material-ui';
import ActionHelp from 'material-ui/svg-icons/action/help';

const styles = {
  button: {
    margin: 6,
    padding: 0
  },
  feedback: {
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      width: '100%'
    }
  },
  helpDialog: {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0
    },
    content: {
      position: 'relative',
      width: '80vw',
      transform: ''
    },
    body: {
      paddingBottom: 0
    }
  },
  card: {
    marginTop: 8,
    title: {
      fontSize: '1.5em'
    },
    media: {
      padding: 10,
      img: {
        border: '1px solid #ddd'
      }
    }
  }
};

/**
 * The footer contains four buttons that link to additional information
 * and an option to provide feedback.
 */
export default class Footer extends React.Component {

    /**
     * Binds event handlers to the class and initializes state to keep track of open dialogs.
     */
  constructor() {
    super();
    this.state = {
      selectedIndex: -1,
      snackbar: {
        open: false,
        msg: ''
      },
      modals: {
        about: false,
        help: false,
        contact: false
      },
      contact: {
        email: '',
        msg: '',
        err: ''
      }
    };

    // Bind modal actions
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.setModal = this.setModal.bind(this);

    // Bind snackbar actions
    this.showSnackbar = this.showSnackbar.bind(this);
    this.hideSnackbar = this.hideSnackbar.bind(this);
    this.handleContactSend = this.handleContactSend.bind(this);
  }

  showSnackbar(msg, cb = () => {}) {
    this.setState({
      snackbar: {
        open: true,
        msg
      }
    }, cb);
  }

  hideSnackbar() {
    this.setState({
      snackbar: {
        open: false,
        msg: ''
      }
    });
  }

  handleCloseHelp() {
    this.setState({
      openHelp: false
    });
  }

  openModal(name, cb = () => {}) {
    this.setModal(name, true, cb);
  }

  closeModal(name, cb = () => {}) {
    this.setModal(name, false, cb);
  }

  setModal(name, open, cb = () => {}) {
    const newState = { ...this.state.modals };
    newState[name] = open;
    this.setState({
      modals: newState
    }, cb);
  }

  handleContactSend() {
    if (this.state.contact.msg === '') {
      this.setState({ contact: { ...this.state.contact, err: 'Field required' } });
    } else {
      fetch(`http://${window.location.host}/api/contact`, {
        method: 'POST',
        body: JSON.stringify(this.state.contact),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json())
      .then(res => {
        if (res.success === true) {
          this.showSnackbar(
            'Message sent successfully',
            () => this.closeModal('contact', () => this.setState({ contact: { email: '', msg: '' }}))
          );
        } else {
          this.showSnackbar(`Message failed to send: ${res.message}`);
        }
      });
    }
  }

  getDefaultActions(handler = () => {}) {
    return [
      <FlatButton
        key='actionClose'
        label='Close'
        primary={true}
        onTouchTap={handler}
      />
    ];
  }

  getContactActions() {
    return [
      <FlatButton
        key='actionCancel'
        label='Cancel'
        onTouchTap={
          () => this.closeModal('contact', () => this.setState({ contact: { email: '', msg: '' }}))
        }
      />,
      <FlatButton
        key='actionSend'
        label='Send'
        primary={true}
        onTouchTap={this.handleContactSend}
      />
    ];
  }

  /**
   * Renders the buttons and dialogs to the homepage using Material-UI components.
   * @returns {object} The JSX object representing this class
   */
  render() {
    // actions for the project box modal
    return (
      <div id='footer'>
        <RaisedButton
          label='Help'
          style={ styles.button }
          onTouchTap={ () => this.openModal('help') }
        />
        <RaisedButton
          label='About'
          style={ styles.button }
          onTouchTap={ () => this.openModal('about') }
        />
        <RaisedButton
          label='GitHub'
          style={ styles.button }
          onTouchTap={ () => window.open('http://www.github.com/BucknellFilmSearch/') }
        />
        <RaisedButton
          label='Contact Us!'
          style={ styles.button }
          primary={true}
          onTouchTap={ () => this.openModal('contact') }
        />
        <Dialog
          title='About the Project'
          actions={this.getDefaultActions(() => this.closeModal('about'))}
          modal={ false }
          open={this.state.modals.about}
          onRequestClose={ () => this.closeModal('about') }
        >
          <br/>
          <p>
            This project was started by Professor John Hunter from Bucknell University. Students Dale Hartman and Justin
            Eyster began the project with the construction of the film database and the back-end logic. The senior
            design team, Team Endframe, comprised of Anmol Singh, Devon Wasson, Elliot Radsliff, and Nadeem Nasimi,
            went on the design and build the user interface.
          </p>
          <p>
            This project was started as a new way to conduct film and media studies research. By allowing users to see
            quickly what was happening when a line of dialogue was said, they can gain deeper meaning than just textual
            context. With the addition of being able to search for images which have a similar amount of color,
            users can now find scenes in films which are visually similar and more easily draw conclusions about
            similarities between the two films.
          </p>
          <p>
            The project is still a work in progress as more films are added to the database. If there is a film you
            would like to see added, if you have any new feature suggestions, or if you encounter any bugs, please feel
            free to use the feedback button on this page. We will review your request and act upon it as quickly as
            possible.
          </p>
        </Dialog>
        <Dialog
          title='Contact Us!'
          actions={this.getContactActions()}
          modal={ false }
          open={this.state.modals.contact}
          onRequestClose={ () => this.closeModal('contact', () => this.setState({ contact: { email: '', msg: '' }})) }
        >
          <div style={styles.feedback.form}>
            <TextField
              onChange={(event, text) => this.setState({ contact: { ...this.state.contact, email: text }})}
              value={this.state.contact.email}
              floatingLabelText="Email Address"
            />
            <IconButton
              tooltipPosition='bottom-center'
              tooltip='Enter email to hear back'
              iconStyle={{ width: 16, height: 16, color: '#bbb'}}
            >
              <ActionHelp />
            </IconButton>
          </div>
          <TextField
            onChange={(event, text) => this.setState({ contact: { ...this.state.contact, msg: text, err: '' }})}
            value={this.state.contact.msg}
            style={styles.feedback.message}
            floatingLabelText="Enter your message"
            errorText={this.state.contact.err}
            multiLine={true}
            rows={4}
          />
        </Dialog>
        <Dialog
          title='Help'
          modal={false}
          actions={this.getDefaultActions(() => this.closeModal('help'))}
          open={this.state.modals.help}
          autoScrollBodyContent={true}
          onRequestClose={ () => this.closeModal('help') }
          // Fix for resizing on card expand
          contentStyle={styles.helpDialog.content}
          bodyStyle={styles.helpDialog.body}
          style={styles.helpDialog.root}
          repositionOnUpdate={false}
        >
          <h3>Overview</h3>
          <p>
            The Film Search Engine is a database of screenshots and subtitles from various movies, created with the
            intent of aiding film scholars in finding connections between films that they might otherwise miss. The Film
            Search Engine allows for 3 types of searching: Object Search, Subtitle Search, and Color Search. Each type
            of search is described in more detail below.
          </p>

          <h3>Search Types:</h3>
          <Card style={styles.card} >
            <CardHeader
              title="Object Search"
              subtitle="Find objects in images"
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={styles.card.title}
            />
            <CardText expandable={true} >
              Object Search allows you to search for objects that appear in the screenshots held in the database. To
              search for an object, first select the &quot;Find Objects&quot; tab. This will display a text field and
              slider component.
            </CardText>
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/object-input.png`} />
            </CardMedia>
            <CardText expandable={true} >
              The text field allows you to enter a type of object, and the slider adjusts the threshold of confidence.
              What this means is that for a lower threshold, the minimum confidence (as given by the recognition
              algorithm) is lower for the given search.
            </CardText>
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/object-input-search.png`} />
            </CardMedia>
            <CardText expandable={true} >
              Because there are a limited number of objects recognized in the system, a dropdown will appear when
              entering search terms, allowing you see the available terms.
            </CardText>
          </Card>

          <Card style={styles.card} >
            <CardHeader
              title="Subtitle Search"
              subtitle="Find key lines in films"
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={styles.card.title}
            />
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/subtitle-input.png`} />
            </CardMedia>
            <CardText expandable={true} >
              Subtitle Search allows you to search for key lines that appear in a film&#8217;s dialogue. To search
              for a line, first select the &quot;Search Dialogue&quot; tab. This will display a text field and several
              filtering/sorting dropdowns.
            </CardText>
          </Card>

          <Card style={styles.card} >
            <CardHeader
              title="Color Search"
              subtitle="Match color palettes in images"
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={styles.card.title}
            />
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/color-input.png`} />
            </CardMedia>
            <CardText expandable={true} >
              Color Search allows you to find screenshots from films that match the color palette in an uploaded image.
              To run the color search, first select the &quot;Match Colors&quot; tab. This will display a field in which
              you can either drag and drop an image, or click to upload one from your computer. The search will then
              analyze the image&#8217;s color palette and find other images with matching/similar palettes.
            </CardText>
          </Card>

          <h3>Viewing Results:</h3>

          <Card style={styles.card} >
            <CardHeader
              title="Results Page"
              subtitle="Screenshots from all movies that matched your query"
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={styles.card.title}
            />
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/results-page.png`} />
            </CardMedia>
            <CardText expandable={true} >
              <p>
                This is the page that displays all of the results that match your query (objects or subtitles),
                organized by film. When hovering over a screenshot with the mouse, the associated subtitle and timestamp
                are displayed in the drawer on the right. This will also display the movie&#8217;s DVD cover.
              </p>
              <p>
                To change the sorting order, there is a dropdown menu in the top bar. You can also filter by genre or
                jump to a specific movie. To update your search, click the button on the top right. This will bring up
                a dialog with all of the options from the home page available. When you click an image in the Result
                Page, it will bring up the Context Page for that image.
              </p>
            </CardText>
          </Card>

          <Card style={styles.card} >
            <CardHeader
              title="Context Page"
              subtitle="Images with their preceeding/succeeding images"
              actAsExpander={true}
              showExpandableButton={true}
              titleStyle={styles.card.title}
            />
            <CardMedia expandable={true} style={styles.card.media} mediaStyle={styles.card.media.img} >
              <img src={`${process.env.IMG_SRC}help/context-page.png`} />
            </CardMedia>
            <CardText expandable={true} >
              <p>
                The Context Page is made to show the context from which a line/screenshot comes. It portrays this by
                loading the previous and next screenshots in the database, so you can see them side by side. In the
                bar across the bottom, you can also see where in the given film the current line, as well as other lines
                returned by the search occur. You can move to the next (or previous) line by either clicking on its
                screenshot, or using the arrows available.
              </p>
              <p>
                When in the Context Page, bounding boxes can be turned on or off using the given button. Furthermore,
                because the objects are recognized with a neural network, the accuracy is not always consistent. This
                means that sometimes objects are incorrectly labeled. To flag a bounding box, you can click on it and
                hit the &nbsp;Report Selected Object?&nbsp; button.
              </p>
            </CardText>
          </Card>
          <br/>
        </Dialog>
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.msg}
          autoHideDuration={3000}
          action="OK"
          onRequestClose={this.hideSnackbar}
        />
      </div>
    );
  }
}
