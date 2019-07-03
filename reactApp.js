class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0
    };

    this.shotSound = new Audio('./assets/audio/Bounces.wav');
    this.scoreSound = new Audio('./assets/audio/Swish+2.wav');
    this.missSound = new Audio('./assets/audio/Back+Board.wav');
  }

  shotHandler = () => {
    let score = this.state.score;
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
        shots: state.shots + 1,
        score
      }));
    }, 3000)

  };

  render() {
    let shotPercentageDiv

    if (this.state.shots) {
      const shotPercentage = Math.round((this.state.score / this.state.shots) * 100)
      shotPercentageDiv = (
        <div>
            <strong>Shooting %:</strong> {shotPercentage}
        </div>
      )
    }
    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team
          name={props.homeTeam.name}
          logo={props.homeTeam.logoSrc}
        />

        <div className="versus">
          <h1>VS</h1>
        </div>

        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />
      </div>
    </div>
  )
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
