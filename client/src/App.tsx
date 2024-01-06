import routes from './routes/routes'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import UserContext from './util/UserTokenContext';

function App() {
  const [userToken, setUserToken] = useState('');
  const userTokenState = { userToken, setUserToken };

  return (
      <>
          <UserContext.Provider value={userTokenState}>
              <Routes>
                  {routes.map((route, index) => (
                      <Route
                          path={route.path}
                          element={route.element}
                          key={index}
                      />
                  ))}
              </Routes>
          </UserContext.Provider>
      </>
  );
}

export default App
