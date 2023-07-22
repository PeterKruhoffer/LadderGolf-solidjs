import { lazy } from 'solid-js'
import { Routes, Route, A } from '@solidjs/router'
const Game = lazy(() => import('./pages/Game'))
const Home = lazy(() => import('./pages/Home'))

function App() {

  return (
    <main class='min-h-screen bg-slate-800'>
      <nav class='flex mb-4 p-4'>
        <A class='text-slate-200' href="/">Home</A>
      </nav>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Routes>
    </main>
  )
}

export default App

