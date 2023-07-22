import { createContext, useContext, ParentProps } from "solid-js";
import { createStore } from "solid-js/store";

type GameStore = {
  player1: {
    name: string
    score: number
  }
  player2: {
    name: string
    score: number
  }
}



const GameStateContext = createContext<GameStore>();

export function GameStateProvider(props: ParentProps) {
  const [gameStore, setGameStore] = createStore<GameStore>({
    player1: { name: "player1", score: 0 },
    player2: { name: "player2", score: 0 },
  })

  return (
    <GameStateContext.Provider value={gameStore}>
      {props.children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  return useContext(GameStateContext);
}
