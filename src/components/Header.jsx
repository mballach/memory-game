import '../styles/Header.css'
import nflLogo from '../assets/NFL-logo.png'
function Header() {
  
  return (
    <>
      <div className="header-wrapper">
        <img src={nflLogo} alt="nfl logo" className='topLogo' />
        <h1>NFL Memory Game</h1>
      </div>
      
    </>
  )
}

export default Header
