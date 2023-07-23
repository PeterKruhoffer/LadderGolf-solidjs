import { lazy } from 'solid-js'
import { Routes, Route, A } from '@solidjs/router'
const Game = lazy(() => import('./pages/Game'))
const Home = lazy(() => import('./pages/Home'))

function App() {

  return (
    <>
      <header class='bg-slate-800'>
        <nav class='flex p-4'>
          <A class='text-slate-200' href="/">Home</A>
        </nav>
      </header>
      <main class='min-h-screen bg-slate-800'>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/game" component={Game} />
        </Routes>
      </main>
    </>
  )
}

export default App

