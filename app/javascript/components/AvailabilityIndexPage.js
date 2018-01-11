import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { FormattedMessage } from 'react-intl';

import Header from './Header';
import AvailabilitiesTable from './AvailabilitiesTable';

import './AvailabilityIndexPage.css';

class AvailabilityIndexPage extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <Header currentUser={ currentUser } />
        <Paper zDepth={ 1 } className='paperOverride' rounded={ false }>
          <div className='availabilityIndexContainer'>
            <FormattedMessage
              id='AvailabilityIndexPage.Help'
              defaultMessage='I can help with:'
            />
            <ul className='availabilityIndexProgramsContainer'>
              { _.map(this.props.programs, ({ name }) => <Chip className='availabilityListItem' key={ name }>{ name }</Chip>) }
            </ul>

            { this.renderAvailabilities() }
          </div>
        </Paper>
      </div>
    );
  }

  renderAvailabilities() {
    const { availabilities, currentUser: { timezone } } = this.props;

    if ( _.size(availabilities) > 0 ) {
      return (
        <ul className='availabilityIndexListContainer'>
          <AvailabilitiesTable
            availabilities={ availabilities }
            timezone={ timezone }
            deletable
          />
        </ul>
      );
    } else {
      return (
        <a href='/availabilities/new' >
          <RaisedButton primary className='conversationButton' >
            <FormattedMessage
              id='availabilityCreateNew'
              defaultMessage='Create new availabilities'
            />
          </RaisedButton>
        </a>
      );
    }
  }
}

AvailabilityIndexPage.propTypes = {
  availabilities: PropTypes.array,
  programs: PropTypes.array,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    email: PropTypes.string,
    timezone: PropTypes.string
  })
};

AvailabilityIndexPage.defaultProps = {
  availabilities: [],
  programs: [],
  currentUser: {
    first_name: '',
    email: '',
    timezone: ''
  }
};

export default AvailabilityIndexPage;
