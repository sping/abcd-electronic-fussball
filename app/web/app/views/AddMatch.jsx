import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios';
import '../stylesheets/views/add-match.sass';

class AddMatch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSaving: false,
      hasSaved: false
    }

    this.save = this.save.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    this.setInititalFormState();

    axios.get('/players').then((response) => {
      this.setState({availablePlayers: response.data})
    })
  }

  save () {
    this.setState({isSaving: true})

    var payload = {
      homeScore: this.state.homeScore,
      awayScore: this.state.awayScore,
      playedAt: this.state.playedAt,
      kind: 'SINGLE',
      matchPlayers: [
        {
          homeTeam: true,
          playerId: this.state.homePlayerOne
        },
        {
          homeTeam: true,
          playerId: this.state.homePlayerTwo
        },
        {
          homeTeam: false,
          playerId: this.state.awayPlayerOne
        },
        {
          homeTeam: false,
          playerId: this.state.awayPlayerTwo
        }
      ]
    }

    axios.post('/matches', payload).then((response) => {
      this.setState({isSaving: false, hasSaved: true});

      setTimeout(() => {
        this.setState({hasSaved: false});
        this.setInititalFormState();
      }, 3000)
    }).catch((error) => {
      alert(JSON.stringify(error));
      this.setState({isSaving: false});
    })
  }

  setInititalFormState () {
    this.setState({
      homeScore: 0,
      awayScore: 0,
      playedAt: new Date().toISOString().substring(0, 10),
      homePlayerOne: null,
      homePlayerTwo: null,
      awayPlayer1: null,
      awayPlayer2: null
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state.availablePlayers) {
      return (
        <div></div>
      )
    }

    return (
      <div id="account" className="app-account">
        <div className="app-account-form">
          <input className="app-add-match-date-picker" name="playedAt" type="datetime-local" defaultValue={new Date().toISOString().substring(0, 10)} onChange={this.handleInputChange} />

          <div className="app-add-match-select-players">
            <div className="app-add-match-select-players-col">
              <h6>Home</h6>
              <input name="homeScore" type="number" min="0" min="10" defaultValue="0" onChange={this.handleInputChange} />
              <select name="homePlayerOne" onChange={this.handleInputChange}>
                <option>Select player</option>
                {
                  this.state.availablePlayers.map((player) => {
                    return <option key={player.id} value={player.id}>{player.user.firstName}</option>
                  })
                }
              </select>
              <select name="homePlayerTwo" onChange={this.handleInputChange}>
                <option>Select player</option>
                {
                  this.state.availablePlayers.map((player) => {
                    return <option key={player.id} value={player.id}>{player.user.firstName}</option>
                  })
                }
              </select>
            </div>

            <div className="app-add-match-select-players-col">
              <h6>Away</h6>
              <input name="awayScore" type="number" min="0" min="10" defaultValue="0" onChange={this.handleInputChange} />
              <select name="awayPlayerOne" onChange={this.handleInputChange}>
                <option>Select player</option>
                {
                  this.state.availablePlayers.map((player) => {
                    return <option key={player.id} value={player.id}>{player.user.firstName}</option>
                  })
                }
              </select>

              <select name="awayPlayerTwo" onChange={this.handleInputChange}>
                <option>Select player</option>
                {
                  this.state.availablePlayers.map((player) => {
                    return <option key={player.id} value={player.id}>{player.user.firstName}</option>
                  })
                }
              </select>
            </div>
          </div>
          
          <div className="app-account-form-button-bar">
            <a className="button" onClick={this.save} href="#" disabled={this.state.isSaving || this.state.hasSaved}>{this.state.hasSaved ? 'Saved!' : 'Save'}</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(AddMatch);
