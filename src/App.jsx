import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MedicoLayout } from './layouts/MedicoLayout'
import AtencionDetail from './components/AtencionDetail'
import AtencionTLD from './components/AtencionTLD'
import AtencionPHD from './components/AtencionPHD'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<MedicoLayout/>}>
      <Route path='/' index element={<AtencionDetail/>}/>
      <Route path='/tld' element={<AtencionTLD/>}/>
      <Route path='/phd' element={<AtencionPHD/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
