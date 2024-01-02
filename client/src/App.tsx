import routes from './routes/routes'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => <Route
            path={route.path} 
            element={route.element}
          >
        </Route>)}
      </Routes>
    </>
  )
}

export default App
