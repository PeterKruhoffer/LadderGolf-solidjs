import { For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import { useScoreboard } from '../scoreboard'

function Home() {
  const scoreBoard = useScoreboard()

  return (
    <main class="min-h-screen bg-slate-800 flex flex-col items-center">
      <h1 class="text-slate-200 text-xl">Laddergolf</h1>
      <A class="text-slate-200 text-lg p-2 underline" href="/game">Start game</A>
      <Show when={scoreBoard.value.length > 0}>
        <div class='flex flex-col justify-center w-full items-center overflow-auto mt-14'>
          <For each={scoreBoard.value}>
            {(game) => (
              <div class='border-b-2 flex flex-col w-1/2 gap-2 my-4'>
                <div class='flex flex-row justify-between'>
                  <h3 class='text-xl text-slate-200'>{game?.player1Name}:</h3>
                  <p class='text-xl text-slate-200'>{game?.player1Score}</p>
                </div>
                <div class='flex flex-row justify-between'>
                  <h3 class='text-xl text-slate-200'>{game?.player2Name}:</h3>
                  <p class='text-xl text-slate-200'>{game?.player2Score}</p>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </main>
  )
}

export default Home
