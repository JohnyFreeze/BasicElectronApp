/**
 * Created by janmraz on 06/08/16.
 */
'use strict'

// Dependencies
import React from 'react'
import { editSerie } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'
var Select = require('react-select');
var DatePicker = require('react-datepicker');
var moment = require('moment');
import { hashHistory} from 'react-router'



var seriesTypes = require('../../init/SeriesTypes.json');
var teams = require('../../init/Teams.json');

var optionsTypes = seriesTypes.map((type) => { return { value: type.id, label: type.name} });
var optionsTeams = teams.map((team) => { return { value: team.id, label: team.name} });



export default class SeriesEdit extends React.Component {
    constructor(props) {
        super(props);
        var _this = this;
        this.props.series.forEach(function (serie) {
            if(serie.id == _this.props.params.id ){
                _this.state = {
                    type: {label: serie.series_type.id,value: serie.series_type.id},
                    home: {label: serie.home.name,value: serie.home.id},
                    away: {label: serie.away.name,value: serie.away.id},
                    startDate: moment(serie.planned_start)
                };
            }
        });



        // Bind callback methods to make `this` the correct context.
        this.selectedHome = this.selectedHome.bind(this);
        this.selectedAway = this.selectedAway.bind(this);
        this.selectedType = this.selectedType.bind(this);
        this.selectedDate = this.selectedDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    selectedType = function (val) {
        this.setState({type: val});
    };
    selectedHome = function (val) {
        this.setState({home: val});
    };
    selectedAway = function (val) {
        this.setState({away: val});
    };
    selectedDate = function (date) {
        this.setState({startDate: date});
    };
    handleSubmit = function (e) {
        e.preventDefault();
        this.state.serieId = this.props.params.id;
        this.props.onEditSerie(Object.assign({},this.state));
        hashHistory.push('/series');
    };
    /**
     * Render component
     *
     * @return {ReactElement}
     */
    render () {
        return (
            <div>
                <h3>Edit serie</h3>
                <form onSubmit={this.handleSubmit}>
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
                </form>
                <Link to={`/series`}>Back</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        series: state.series
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onEditSerie: (serie) => {
            dispatch(editSerie(serie))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SeriesEdit)
