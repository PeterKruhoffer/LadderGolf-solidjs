import { makePersisted } from "@solid-primitives/storage";
import { type ParentProps, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type scoreBoard = {
  player1Name: string,
  player2Name: string,
  player1Score: number,
  player2Score: number,
}
type Context = ReturnType<typeof init>
const context = createContext<Context>()

function init() {
  const [store, setStore] = makePersisted(
    createStore<scoreBoard[]>([])
  )

  return {
    value: store,
    set: setStore,
  }
}

export function ScoreboardProvider(props: ParentProps) {
  const ctx = init()
  return <context.Provider value={ctx}>{props.children}</context.Provider>
}

export function useScoreboard() {
  const ctx = useContext(context)
  if (!ctx) {
    throw new Error("No context provided")
  }
  return ctx
}
