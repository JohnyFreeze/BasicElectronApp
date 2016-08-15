'use strict'

// Dependencies
import React from 'react'
import { reduxForm } from 'redux-form'
var Select = require('react-select');
var DatePicker = require('react-datepicker');
var moment = require('moment');


var sports = require('../../init/Sports.json');
var seriesTypes = require('../../init/SeriesTypes.json');
var tournaments = require('../../init/Tournaments.json');
var sportHasTournament = require('../../init/SportHasTournament.json');
var teamsInTournaments = require('../../init/TeamsInTournaments.json');
var teams = require('../../init/Teams.json');

var optionsTournaments = tournaments.map((tour) => {return {value: tour.id, label: tour.name}});
var optionsTypes = seriesTypes.map((type) => { return { value: type.id, label: type.name} });
var optionsSports = sports.map((sport) => { return { value: sport.id, label: sport.name} });
var optionsTeams = teams.map((team) => { return { value: team.id, label: team.name} });



export default class SeriesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: {},
            tournament:{},
            type:{},
            home:{},
            away:{},
            startDate: moment()
        };

        // Bind callback methods to make `this` the correct context.
        this.selectedSport = this.selectedSport.bind(this);
        this.selectedHome = this.selectedHome.bind(this);
        this.selectedAway = this.selectedAway.bind(this);
        this.selectedType = this.selectedType.bind(this);
        this.selectedDate = this.selectedDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetData = this.resetData.bind(this);
        this.selectedTournament = this.selectedTournament.bind(this);
    }

   selectedSport = function (val) {
       var _this = this;
       _this.setState({sport: val});
       sportHasTournament.forEach(function (sportHasTour) {
           if(sportHasTour.sport_id == val.value){
               optionsTournaments.forEach(function (tour) {
                   if(tour.value == sportHasTour.tournament_id){
                       _this.setState({tournament: tour});
                   }
               });
           }
       })
    };
    selectedTournament = function (val) {
        var _this = this;
        _this.setState({tournament: val});
        sportHasTournament.forEach(function (sportHasTour) {
            if(sportHasTour.tournament_id == val.value){
                optionsSports.forEach(function (sport) {
                    if(sport.value == sportHasTour.sport_id){
                        _this.setState({ sport });
                    }
                });
            }
        });
        var teamsIds = [];
        teamsInTournaments.forEach(function (tir) {
            if(tir.tournament_id == val.value){
                teamsIds.push(tir.team_id);
            }
        });
        var allowedTeams = [];
        teams.forEach(function (team) {
            teamsIds.forEach(function (id) {
                if(team.id == id){
                    allowedTeams.push({ value: team.id, label: team.name});
                }
            });
        });
        optionsTeams = allowedTeams;
    };
    resetData = function (e) {
        e.preventDefault();
       this.setState({
           sport: {},
           tournament:{},
           type:{},
           home:{},
           away:{},
           startDate: moment()
       });
    };
    selectedType = function (val) {
       this.setState({type: val});
    };
    selectedHome = function (val) {
        this.setState({home: val});};
    selectedAway = function (val) {
        this.setState({away: val});
    };
    selectedDate = function (date) {
       this.setState({startDate: date});
    };
    handleSubmit = function (e) {
        e.preventDefault();
        if(
            this.state.sport.value &&
            this.state.tournament.value &&
            this.state.type.value &&
            this.state.home.value &&
            this.state.away.value
            ){
            this.props.handlerAddingSerie(Object.assign({},this.state));
            this.setState({
                sport: {},
                tournament:{},
                type:{},
                home:{},
                away:{},
                startDate: moment()
            });
        }else{
            alert('fill all information');
        }

    };
  /**
   * Render component
   *
   * @return {ReactElement}
   */
  render () {
    return (
        <div>
          <h3>Add serie</h3>
            <form onSubmit={this.handleSubmit}>
                <Select
                    name="sport"
                    placeholder="Sport"
                    options={optionsSports}
                    value={this.state.sport}
                    onChange={this.selectedSport}
                    clearable={false}
                />
                <br/>
                <Select
                    name="tournament"
                    placeholder="Tournament"
                    value={this.state.tournament}
                    onChange={this.selectedTournament}
                    options={optionsTournaments}
                    clearable={false}
                />
                <br/>
                <Select
                    name="type"
                    placeholder="Series type"
                    value={this.state.type}
                    onChange={this.selectedType}
                    options={optionsTypes}
                    clearable={false}
                />
                <br/>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.selectedDate}
                />
                <br/>
                <Select
                    name="home"
                    placeholder="Home team"
                    value={this.state.home}
                    onChange={this.selectedHome}
                    options={optionsTeams}
                    clearable={false}
                />
                <br/>
                <Select
                    name="away"
                    placeholder="Away team"
                    value={this.state.away}
                    onChange={this.selectedAway}
                    options={optionsTeams}
                    clearable={false}
                />
                <button type="submit">Submit</button>
                <button onClick={this.resetData}>discard</button>
            </form>
        </div>
    )
  }
}

export default reduxForm({
  form: 'series',fields: ['away', 'home', 'startDate','type','tournament','sport']
})(SeriesForm)
