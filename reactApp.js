function Team(props) {

  let shotPercentageDiv

  if (props.stats.shots) {
    const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100)
    shotPercentageDiv = (
      <div>
          <strong>Shooting %:</strong> {shotPercentage}
      </div>
    )
  }
  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>shots:</strong> {props.stats.shots}
      </div>

      <div>
        <strong>score:</strong> {props.stats.score}
      </div>

      {shotPercentageDiv}

      <button onClick={props.shotHandler}>Shoot!</button>
    </div>
  );
}


class Game extends React.Component {
  constructor(props) {
    super(props) 

      this.state = {
        resetCount: 0,
        homeTeamStats: {
          shots: 0,
          score: 0
        },
        visitingTeamStats: {
          shots: 0,
          score: 0
        },
      }

      this.shotSound = new Audio('./assets/audio/Bounces.wav');
      this.scoreSound = new Audio('./assets/audio/Swish+2.wav');
      this.missSound = new Audio('./assets/audio/Back+Board.wav');
  
  }

  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`
    console.log("teamStatsKey: " + teamStatsKey)
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
      this.scoreSound.play();
      }, 3000)
    } else {
      setTimeout(() => {
      this.missSound.play();
      }, 3000)
    }
  
    setTimeout(() => {
      this.setState((state, props) => ({
        [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
        }
      }));
    }, 3000)
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }))
  }

  render() {
    return (
      <div className="Game">
        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot('home')}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets: </strong>{this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
            </div>
          </div>

          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot('visiting')}
          />
        </div>
      </div>
    )
  }
}
  
// Default App component that all other compents are rendered through
function App(props) {
  const ducks = {
    name: "Danville Flippin' Ducks",
    logoSrc: "./assets/images/FlippingDuck.jpg"
  }

  const romelets = {
    name: "Russiaville Romelets",
    logoSrc: "./assets/images/RomeletPlate.jpg"
  }

  const tacRamens = {
    name: "Tarkington Tac-Ramens",
    logoSrc: "./assets/images/tacRamen.jpg"
  }

  const zombies = {
    name: "Zionsville Zombies",
    logoSrc: "./assets/images/ZombieBob.jpg"
  } 

  const huahuas = {
    name: "Washington huahuas",
    logoSrc: "./assets/images/Mochi.jpg"
  } 

  const bobs = {
    name: "Haughville Hair Bobs",
    logoSrc: "./assets/images/hairBob.jpg"
  } 

  return (
    <div className="App">
      <Game 
        venue="Hoosier Fieldhouse"
        homeTeam={bobs}
        visitingTeam={zombies}
      />
    
      <Game 
        venue="IndyDome"
        homeTeam={ducks}
        visitingTeam={romelets}
      />
    </div>
  );
}

//   Render the application
ReactDOM.render(<App />, document.getElementById('root'));
