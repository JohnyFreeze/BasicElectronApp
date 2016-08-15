/**
 * Created by janmraz on 06/08/16.
 */
'use strict'

// Dependencies
import React from 'react'
import { Link } from 'react-router'

export default class SeriesList extends React.Component {
    /**
     * Render component
     *
     * @return {ReactElement}
     */
    render () {
        console.log('propsi',this.props.series);
        var seriesComponents = this.props.series.map(function (serie) {
            return <p className="serie" key={serie.id}>
                <span>Tournament: <b>{serie.tournament.name}</b>,</span>
                <span>Type: <b>{serie.series_type.name}</b>,</span>
                <span>Home: <b>{serie.home.name}</b>,</span>
                <span>Away: <b>{serie.away.name}</b>,</span>
                <span>Start: <b>{serie.planned_start}</b>,</span>
                <Link to={`series/${serie.id}`}>Edit</Link>
            </p>
        });
        return (
            <div>
                <h1>Series</h1>
                <div>{seriesComponents}</div>
            </div>
        )
    }
}

