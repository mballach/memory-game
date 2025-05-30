import { useState, useEffect } from 'react'
import '../styles/MemoryCards.css'



function MemoryCards() {
    const [dataReady, setDataReady] = useState(false);
    const [error, setError] = useState(false)
    const [teams, setTeams] = useState(null)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    
    useEffect(()=> {
    async function returnTeamData(){
        try {const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
            let data = await response.json()
            data = data.sports[0].leagues[0].teams
            let teams = []
            for (let i=0; i<data.length; i++){
                let j = data[i].team
                j.clicked = false
                teams.push(j)
            }
            setTeams(teams)
            setDataReady(true)
        } catch (error) {
            setError(true)
            alert("Error fetching data: " + error)
        }
    }  
    returnTeamData()
    },[]);
    
    const shuffleTeams = () => {
        let currentIndex = teams.length;
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [teams[currentIndex], teams[randomIndex]] = [
            teams[randomIndex], teams[currentIndex]];
        }
        setTeams([...teams])
    }

    const incScore = () => {
        setScore(score+1)
        setHighScoreTally()
        checkWin()
    }

    const setHighScoreTally = () => {
        if (score+1>highScore){
            setHighScore(score+1)
        }
    }

    const checkWin = () => {
        if(score+1===32){
            alert("Congrats! You found them all! Click to reset and play again!")
            wipeScore()
        }
        
    }

    const wipeScore = () => {
        setScore(0);
    }

    const setClicked = (id) => {
        const target = teams.filter((team)=>team.id == id)
        target[0].clicked = true
        const reduced = teams.filter((team)=>team.id !== id)
        setTeams([...reduced, ...target])
    }

    const resetClicked = () => {
        let newTeams = [...teams]
        for (let i=0;i<newTeams.length;i++){
            newTeams[i].clicked=false
        }
        setTeams(newTeams)
        shuffleTeams()
        wipeScore()
    }

    const duplicateClick = () => {
        alert("You have already clicked this team! Game over! Final Score: "+score)
        resetClicked()
        wipeScore()
    }

    function Card({team}){

        const toggleFirstClick = () => {
            setClicked(team.id)
            shuffleTeams()
            incScore()
        }

        const toggleSecondClick = () => {
            duplicateClick()

        }

        if(team.clicked===false){
            return (
                <div className="card" key={team.id} onClick={toggleFirstClick}>
                            <img className='logo' src={team.logos[0].href} alt="" />
                            {team.displayName}
                            {team.clicked}
                            
                </div>
        )} else {
            return (
                <div className="card" key={team.id} onClick={toggleSecondClick}>
                            <img className='logo' src={team.logos[0].href} alt="" />
                            {team.displayName}
                            {team.clicked}
                            
                </div>
            )
        }
    }

    if(error){
        return(
            <>
             Error loading cards...
            </>
        )
    }

    if(!dataReady) {
        return (
            <>
            Loading...
            </>
        )
        
    }

    if(dataReady){
        return (
            <div className="board">
                Click as many logos as you can without repeating!
                <div className='scoreboard'>
                    <button onClick={resetClicked}>Click to reset</button>
                    <div>Current Score: {score}</div>
                    <div>High Score: {highScore}</div>
                </div> 
                    <div className="card-container">
                        {teams.map((item) => (
                            <Card team={item} key={item.id}/>
                            
                        ))}
                        
                    </div>
            </div>

        )

    }
}

export default MemoryCards
