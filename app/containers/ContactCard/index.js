import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles.css';
import avatar from './default-avatar.png';
import { List, Map } from 'immutable';
import { Panel, Button, Glyphicon } from 'react-bootstrap';
import { requestUpdateContact, requestContactDeletion, cancelContactEditingAppState } from './actions';
import EditContact from './EditContact';
import moment from 'moment';

function groupStoriesByTopic(stories) {
  return stories
    .sortBy((story) => story.get('topic'))
    .reduce((groupsOfTopics, story) => {
      const topic = story.get('topic');
      const lastGroup = groupsOfTopics.last(); // should be a Map, or undefined if this is the first story
      // defined and not used? ---> const needToCreateNewGrouping = (lastGroup === undefined) || (lastGroup.get('topic') !== topic);

      // If we need to create a new topic grouping for this current story:
      if ((lastGroup === undefined) || (lastGroup.get('topic') !== story.get('topic'))) {
        // Create a new grouping of topics
        const newGroup = Map({ // eslint-disable-line new-cap
          topic,
          stories: List([story]), // eslint-disable-line new-cap
        });

        // Add the new topic grouping to the list of topics
        return groupsOfTopics.push(newGroup);
      }
      // Otherwise, we'll add this story to the existing final grouping of topics
      const lastGroupStories = lastGroup.get('stories');
      const updatedGroup = lastGroup.set('stories', lastGroupStories.push(story));
      return groupsOfTopics.set(-1, updatedGroup);
    }, List()); // eslint-disable-line new-cap
}

function createOptionGroups(storiesGroupedByTopic) {
  return storiesGroupedByTopic
    .map((topicGroup, i) => (
      <optgroup key={i} label={topicGroup.get('topic')}>
        {
          topicGroup.get('stories')
            .map((story, i) => ( // eslint-disable-line
              <option key={i} value={story.get('id')}>{story.get('title')}</option>
            ))
            .toArray()
        }
      </optgroup>
    ));
}

export class ContactCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editing: false,
    };
  }

  onClickContactNowToggleBar(e) {
    e.preventDefault(); // prevent normal link behavior and event bubbling
    this.setState({ expanded: !this.state.expanded });
  }

  onClickEdit() {
    this.setState({ editing: true });

    // This cancels any notes about, for example, a previous failed attempt to update the contact
    this.props.cancelContactEditingAppState(this.props.contact.get('id'));
  }

  onClickCancelEdit() {
    this.setState({ editing: false });

    // This cancels any notes about, for example, a previous failed attempt to update the contact
    this.props.cancelContactEditingAppState(this.props.contact.get('id'));
  }

  handleEditSubmit(values) {
    this.props.requestUpdateContact(this.props.contact.get('id'), values, () => this.setState({ editing: false }));
  }

  renderComposePane() {
    const { contact } = this.props;
    const storiesGroupedByTopic = groupStoriesByTopic(this.props.stories);

    return (
      <div className={styles.notesAndCompose}>
        <div className={styles.notes}>
          <h4>Notes about {contact.get('name')}</h4>
          <textarea name="contact--notes--edit" rows="10" defaultValue={contact.get('notes')} />
        </div>
        <div className={styles.compose}>
          <h4>Compose a message</h4>
          <select>
            <option value="">-- share a story --</option>
            {createOptionGroups(storiesGroupedByTopic)}
          </select><br />
          <textarea
            rows="10"
            ref={(c) => (c && c.focus())}
          />
        </div>
      </div>
    );
  }

  renderContactDetails() {
    const { contact } = this.props;
    const contactFrequency = +contact.get('contactFrequency');
    const numberOfDaysLabel = contactFrequency === 1 ?
      'day' :
      `${contactFrequency} days`;
    const lastContactedLabel = contact.get('lastContacted').format('MMM D, YYYY');
    const lastContactedDescription = lastContactedLabel === 'Invalid date' ?
      'Never contacted' :
      `Last contacted ${lastContactedLabel}`;
    const contactDetails = [contact.get('email'), contact.get('phone')].filter((detail) => detail);

    return (
      <div className={`${styles.contactInfo} col-sm-10`}>
        {this.renderOptionButtons()}
        <h3>{contact.get('name')}</h3>
        <p className={styles.stats}>
          { lastContactedDescription }<br />
          Contact every { numberOfDaysLabel }<br />
          <Button className={styles.justContacted} bsSize="small">
            <Glyphicon glyph="ok" /> Just contacted!
          </Button>
        </p>
        <p>
          <span>{contactDetails.join(' | ')}</span>
        </p>
      </div>
    );
  }

  renderOptionButtons() {
    const { contact } = this.props;
    return (
      <div className={`${styles.buttonGroup} pull-right`}>
        <Button className={styles.btnEdit} onClick={() => this.onClickEdit()}>
          <Glyphicon glyph="pencil" /> Edit
        </Button>
        <Button
          className={styles.btnDelete}
          onClick={() => this.props.requestContactDeletion(contact.get('id'))}
        >
          <Glyphicon glyph="trash" /> Delete
        </Button>
      </div>
    );
  }

  render() {
    const { contact } = this.props;
    const initialValues = {
      name: contact.get('name'),
      email: contact.get('email'),
      phone: contact.get('phone'),
      lastContacted: moment(contact.get('lastContacted')).format('YYYY-MM-DD'),
      contactFrequency: contact.get('contactFrequency'),
    };

    return (
      <Panel className={styles.contactCard}>
        <div className="container-fluid">
          <div className="row">
            <div className={`${styles.avatarColumn} col-sm-2`}>
              <img className={`${styles.avatar}`} src={avatar} alt="user avatar" />
            </div>
            {
              this.state.editing ?
                <EditContact
                  onCancelClick={() => this.onClickCancelEdit()}
                  onSubmit={(values) => this.handleEditSubmit(values)}
                  form={`EditContactForm_${contact.get('id')}`}
                  initialValues={initialValues}
                  appStatus={this.props.appStatus}
                  contact={contact}
                /> :
                this.renderContactDetails()
            }
          </div>
        </div>

        <div className={this.state.expanded ? styles.contactNowToggleBarExpanded : styles.contactNowToggleBar}>
          <Button
            onClick={(e) => this.onClickContactNowToggleBar(e)}
            className={styles.contactNowToggleButton}
            bsSize="small"
          >
            {this.state.expanded ? 'Hide ' : 'Contact Now '}
            {this.state.expanded ? <Glyphicon glyph="chevron-up" /> : <Glyphicon glyph="chevron-down" />}
          </Button>
        </div>

        {this.state.expanded && this.renderComposePane()}

      </Panel>
    );
  }
}

ContactCard.propTypes = {
  contact: React.PropTypes.object,
  stories: React.PropTypes.object,
  requestUpdateContact: React.PropTypes.func,
  requestContactDeletion: React.PropTypes.func,
  cancelContactEditingAppState: React.PropTypes.func,
  appStatus: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  const stories = state.get('stories');
  const appStatus = state.get('appStatus');
  return { stories, appStatus };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestContactDeletion, requestUpdateContact, cancelContactEditingAppState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
