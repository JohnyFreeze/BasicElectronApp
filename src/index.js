'use strict'

// Dependencies
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import routes from './routes'
import configureStore from './store/configureStore'
import 'react-select/dist/react-select.css'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
require('moment-transform')

var series = require('./init/Series.json');
var seriesTypes = require('./init/SeriesTypes.json');
var sports = require('./init/Sports.json');
var sportHasTournament = require('./init/SportHasTournament.json');
var teams = require('./init/Teams.json');
var teamsInTournaments = require('./init/TeamsInTournaments.json');
var tournaments = require('./init/Tournaments.json');

series.forEach(function (serie, index, array) {
    serie.planned_start = moment(serie.planned_start).format("YYYY-MM-DD");
    tournaments.forEach(function (tournament, ind, arr) {
        if(serie.tournament_id == tournament.id){

            sportHasTournament.forEach(function (sporthastour, i, a) {
               if(sporthastour.tournament_id == tournament.id){
                   var sport_id = sporthastour.sport_id;

                   sports.forEach(function (sport) {
                       if(sport_id == sport.id){
                           tournament.sport = sport;
                       }
                   })

               }
            });
            tournament.teams = [];
            teamsInTournaments.forEach(function (teamintour, i, a) {
               if(teamintour.tournament_id == tournament.id){
                   var team_id = teamintour.team_id;

                   teams.forEach(function (team) {
                       if(team.id == team_id){
                           tournament.teams.push(team);
                       }
                       if(team.id == serie.home_team_id){
                           serie.home = team;
                       }
                       if(team.id == serie.away_team_id){
                           serie.away = team;
                       }
                   })

               }
            });

            serie.tournament = tournament;
        }
    });
    seriesTypes.forEach(function (sertype, ind, arr) {
        if(serie.series_type_id == sertype.id){
            serie.series_type = sertype;
        }
    });

});

console.log('initObj',series);

const store = configureStore({ series })
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>,
  document.getElementById('root')
)
