export interface IFormulaTeams {
    TeamName: string;
    Constructor: string;
    Driver1: string;
    Driver2: string;
    id: string;
    Motor: string;
    Points: number;
    TeamBoss: string;
}

export interface IFormulaTeamResponse {
    formula_teams_by_id: IFormulaTeams;
}

export interface IFormulaTeamsResponse {
    formula_teams: IFormulaTeams[];
}

export interface INewFormulaTeam {
    TeamName: string;
    Constructor: string;
    Driver1: string;
    Driver2: string;
    id: string;
    Motor: string;
    Points: number;
    TeamBoss: string;
}