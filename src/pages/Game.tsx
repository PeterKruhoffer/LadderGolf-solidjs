import { createSignal, createEffect, type Setter, type Accessor, JSXElement, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { useNavigate } from "@solidjs/router"

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

export const [gameStore, setGameStore] = createStore<GameStore[]>([])


function Game() {
  const [isNameSet, setIsNameSet] = createSignal(false)
  const [score1, setScore1] = createSignal(0)
  const [score2, setScore2] = createSignal(0)
  const [player1Name, setPlayer1Name] = createSignal("")
  const [player2Name, setPlayer2Name] = createSignal("")
  const navigate = useNavigate()

  createEffect(() => {
    if (score1() >= 21 || score2() >= 21) {
      setGameStore((s) =>
        [...s, {
          player1: { name: player1Name(), score: score1() },
          player2: { name: player2Name(), score: score2() },
        }]
      )
      return navigate("/")
    }
  })

  return (
    <>
      <Show when={!isNameSet()}>
        <form class="flex flex-col gap-4 p-4 sm:w-full sm:items-center" onsubmit={(e) => {
          e.preventDefault()
          setPlayer1Name(player1Name)
          setPlayer2Name(player2Name)
          setIsNameSet(true)
        }}>
          <label for="player-1-input" class="text-slate-200">Player 1 name:</label>
          <input id="player1-input"
            type="text"
            value={player1Name()}
            required
            onInput={(e) => setPlayer1Name(e.currentTarget.value)}
            placeholder="Player name here"
            class="p-4 rounded sm:w-1/2"
          />

          <label for="player-2-input" class="text-slate-200">Player 2 name:</label>
          <input id="player2-input"
            type="text" value={player2Name()}
            required
            onInput={(e) => setPlayer2Name(e.currentTarget.value)}
            placeholder="Player name here"
            class="p-4 rounded sm:w-1/2"
          />

          <button class="text-slate-200 border-2 rounded px-4 py-2 border-slate-200">START</button>
        </form>
      </Show>

      <div class='flex flex-row h-screen gap-y-4 justify-center items-center'>
        <Show when={isNameSet()}>
          <div class="w-1/2 h-full border-r-2">
            <div class="flex flex-col gap-y-32">
              <LadderContainer playerName={player1Name()} score={score1} >
                <Ladder point={3} setScore={setScore1} />
                <Ladder point={2} setScore={setScore1} />
                <Ladder point={1} setScore={setScore1} />
              </LadderContainer>
            </div>
          </div>


          <div class="w-1/2 h-full border-l-2">
            <div class="flex flex-col gap-y-32">
              <LadderContainer playerName={player2Name()} score={score2} >
                <Ladder point={3} setScore={setScore2} />
                <Ladder point={2} setScore={setScore2} />
                <Ladder point={1} setScore={setScore2} />
              </LadderContainer>
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Game


function LadderContainer({ playerName, score, children }: { playerName: string, score: Accessor<number>, children: JSXElement }) {

  return (
    <>
      <div class="w-full relative h-auto flex flex-col items-center gap-y-2">
        <p class="text-xl text-slate-200">{playerName}</p>
        <p class="text-xl text-slate-200">current score:</p>
        <p class="text-xl text-slate-200">{score()}</p>
      </div>

      {children}
    </>
  )

}

function Ladder({ point, setScore }: { point: number, setScore: Setter<number> }) {
  return (
    <button class="relative w-full cursor-pointer" onclick={() => { setScore((s) => s + point) }}>
      <div class="absolute top-0 left-0 py-1 bg-slate-900 w-full my-4 h-1 z-0" />
      <p class="absolute left-1/2 text-slate-200 z-20">{point}</p>
    </button>
  )
}
