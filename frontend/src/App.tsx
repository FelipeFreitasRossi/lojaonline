import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/produto/:id" element={<Layout><ProductPage /></Layout>} />
        <Route path="/sobre" element={<Layout><About /></Layout>} />
        <Route path="/contato" element={<Layout><Contact /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App