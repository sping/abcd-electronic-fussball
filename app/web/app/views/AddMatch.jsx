import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios';
import '../stylesheets/views/add-match.sass';
import PlayerSelect from './components/playerSelect';


class AddMatch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSaving: false,
      hasSaved: false
    }

    this.save = this.save.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    axios.get('/players').then((response) => {
      this.setState({availablePlayers: response.data})
    })
  }

  resetForm () {
    this.refs.form.reset();
  }

  save () {
    if (!this.state.homePlayerOne || !this.state.awayPlayerOne) {
      alert("Please select a home and away player.")
      return
    }

    this.setState({isSaving: true})
    var payload = {
      homeScore: this.refs.homeScore.value,
      awayScore: this.refs.awayScore.value,
      playedAt: this.refs.playedAt.value,
      kind: 'SINGLE',
      match_players: [
        {
          homeTeam: true,
          playerId: this.state.homePlayerOne
        },
        {
          homeTeam: false,
          playerId: this.state.awayPlayerOne
        }
      ]
    }

    if (this.state.homePlayerTwo) {
      payload.match_players.push(
        {
          homeTeam: true,
          playerId: this.state.homePlayerTwo
        }
      )
    }

    if (this.state.awayPlayerTwo) {
      payload.match_players.push(
        {
          homeTeam: false,
          playerId: this.state.awayPlayerTwo
        }
      )
    }

    axios.post('/matches', payload).then((response) => {
      this.setState({isSaving: false, hasSaved: true});
      this.resetForm();

      setTimeout(() => {
        this.setState({hasSaved: false});
      }, 3000)
    }).catch((error) => {
      this.setState({isSaving: false});
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
      <div id="account" className="app-account main-container">
        <form ref="form" onSubmit={this.submit} className="app-account-form">
          <input className="app-add-match-date-picker" ref="playedAt" type="datetime-local" defaultValue={new Date().toISOString().substring(0, 16)} />

          <div className="app-add-match-select-players">
            <div className="app-add-match-select-players-col">
              <h6>Home</h6>
              <input ref="homeScore" name="homeScore" type="number" min="0" min="10" defaultValue="0" />
              
              <PlayerSelect name="homePlayerOne" handleInputChange={this.handleInputChange} players={this.state.availablePlayers} />

              <PlayerSelect name="homePlayerTwo" handleInputChange={this.handleInputChange} players={this.state.availablePlayers} />

            </div>

            <div className="app-add-match-select-players-col">
              <h6>Away</h6>
              <input ref="awayScore" name="awayScore" type="number" min="0" min="10" defaultValue="0" />
              
              <PlayerSelect name="awayPlayerOne" handleInputChange={this.handleInputChange} players={this.state.availablePlayers} onChange={this.handleInputChange} />

              <PlayerSelect name="awayPlayerTwo" handleInputChange={this.handleInputChange} players={this.state.availablePlayers} onChange={this.handleInputChange} />

            </div>
          </div>
          
          <div className="app-account-form-button-bar">
            <a className="button" onClick={this.save} href="#" disabled={this.state.isSaving || this.state.hasSaved}>{this.state.hasSaved ? 'Saved!' : 'Save'}</a>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(AddMatch);
