/**
 * Created by janmraz on 05/08/16.
 */

export default function series(state = {},action) {

    switch (action.type){
        case 'ADD_SERIE':
            console.log('here I am',action);
            var newObj = {
                tournament_id: action.serie.tournament.value,
                series_type_id: action.serie.type.value,
                home_team_id: action.serie.home.value,
                away_team_id: action.serie.away.value,
                planned_start: action.serie.startDate.format("YYYY-MM-DD"),
                id: state.length+1,
                tournament: {
                   id: action.serie.tournament.value,
                   name: action.serie.tournament.label,
                   sport:{
                       id: action.serie.sport.value,
                       name: action.serie.sport.label,
                   }
                },
                series_type: {
                    id: action.serie.type.value,
                    name: action.serie.type.label,
                },
                home:{
                    id: action.serie.home.value,
                    name: action.serie.home.label,
                },
                away:{
                    id: action.serie.away.value,
                    name: action.serie.away.label,
                }
            };
            return state.concat(newObj);
        case 'EDIT_SERIE':
            console.log('here I am',action);
            state.forEach(function (serie) {
                if(serie.id == action.serie.serieId){
                    serie.series_type = {
                        id: action.serie.type.value,
                        name: action.serie.type.label,
                    };
                    serie.home = {
                        id: action.serie.home.value,
                        name: action.serie.home.label,
                    };
                    serie.away = {
                        id: action.serie.away.value,
                        name: action.serie.away.label,
                    };
                    serie.planned_start = action.serie.startDate.format("YYYY-MM-DD");
                    serie.series_type_id = action.serie.type.value;
                    serie.home_team_id = action.serie.home.value;
                    serie.away_team_id = action.serie.away.value;
                }
            });
            return state;
        default:
            return state;
    }
}
