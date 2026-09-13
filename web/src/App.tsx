import { Routes, Route } from 'react-router-dom'
import Documentation from './interface/Documentation';
import Encrypt from './interface/Encrypt';
import Decrypt from './interface/Decrypt';
import Home from './interface/Home';
import { useEffect, useState } from 'react';
import { routes } from './util/global';
import Header from './util/global/header';
import Footer from './util/global/footer';
import Unfound from './interface/Unfound';

function App() {

  const [dark, setDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('scode-app-theme')
    if (theme) {
      setDark(theme === 'dark')
    }
  }, [])

  return (
    <div className={dark ? "dark" : "light"}>
        <Header dark={dark} setDark={setDark} />
      <main className='bg-gray-50 dark:bg-gray-800 min-h-screen'>
        <Routes>
          <Route path='*' element={<Unfound />} />
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.doc} element={<Documentation />} />
          <Route path={routes.encrypt} element={<Encrypt />} />
          <Route path={routes.decrypt} element={<Decrypt />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
