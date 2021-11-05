const fetchTeamsFor2021Url = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&sort_order=name_asc&season='2021'";
const fetch40ManRosterForTeamUrl = "http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=";

export const fetchPlayers = async (inputString: string) => {
  const inputJson = JSON.parse(inputString);
  const teamIdIndex = inputJson.pageToken;

  const teamsResponse = await fetch(fetchTeamsFor2021Url).then(response => response.json());
  const teamIds = teamsResponse.team_all_season.queryResults.row.map(team => team.team_id);

  if(!teamIdIndex){
    
    const playersResponse = await fetchPlayersForTeam(teamIds[0]);

    return JSON.stringify({ data: playersResponse, nextPageToken: '1' })
  
  } else {
    const playersResponse = await fetchPlayersForTeam(teamIds[teamIdIndex]);
    const nextTeamIdIndex = parseInt(teamIdIndex) + 1;

    if(nextTeamIdIndex >= teamIds.length){
      
      return JSON.stringify({ data: playersResponse });
    
    } else {
      return JSON.stringify({ data: playersResponse, nextPageToken: nextTeamIdIndex.toString()})
    }
  }
}

const fetchPlayersForTeam = async (teamId: string) => await fetch(`${fetch40ManRosterForTeamUrl}'${teamId}'`).then(response => response.json());
  