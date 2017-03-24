import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../stylesheets/views/components/player-select.sass';

class PlayerSelect extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="app-player-select">
        <select name={this.props.name} onChange={this.props.handleInputChange}>
          <option>Select player</option>
          {
            this.props.players.map((player) => {
              return <option key={player.id} value={player.id}>{player.user.firstName}</option>
            })
          }
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(PlayerSelect);
