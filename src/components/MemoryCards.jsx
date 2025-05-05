import { useState } from 'react'
import '../styles/MemoryCards.css'



function MemoryCards() {
    const [dataReady, setDataReady] = useState(false);
    let teams = []
    async function returnTeamData(){
        try {const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
            let data = await response.json()
            let ret = data.sports[0].leagues[0].teams
            for (let x=0; x<ret.length ; x++){
                teams.push(ret[x])
                }
            console.log(teams)
            setDataReady(true)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }  
    
    returnTeamData()

    
    function Card(){
        return (
            <>
                {teams[0]}
            </>
        )
    }

    if(dataReady){

    return (
        <>
           <Card />
        </>
    )
    } else {
        return (
            <>
            Loading
            </>
        )
    }
}

export default MemoryCards
