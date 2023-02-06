import { useState } from 'react';
import Login from './components/Login/Login';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  const [logged, setLogged] = useState(false);
  const [userName, setuserName] = useState(null);
  const [moves, setMoves] = useState(20);

  const saveData = (userName) => {
    if(userName){
      setuserName(userName);
      setLogged(true)
    }

  }

  return (
    <div className="main">
      {logged ? (
        <GameBoard userName={userName} moves={moves}/>
        ): (
        <Login saveData={saveData}/>
      )}
    </div>
  );
}

export default App;
