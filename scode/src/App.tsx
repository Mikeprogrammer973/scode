import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Documentation from './interface/Documentation';
import Encrypt from './interface/Encrypt';
import Decrypt from './interface/Decrypt';
import Home from './interface/Home';
import { useEffect, useState } from 'react';
import { HandleHistory, routes } from './util/global';
import Header from './util/global/header';
import Footer from './util/global/footer';

function App() {

    const navigate = useNavigate()
    const [dark, setDark] = useState(false)

    useEffect(()=>{
      HandleHistory(window.location.href, navigate)
    }, [navigate])

  return (
    <div className={dark ? "dark" : "light"}>
        <Header dark={dark} setDark={setDark} />
      <main className='bg-gray-50 dark:bg-gray-800'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='doc' element={<Documentation />} />
          <Route path='/encrypt' element={<Encrypt />} />
          <Route path='/decrypt' element={<Decrypt />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
