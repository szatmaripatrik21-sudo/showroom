import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Layout from '@/components/layout/Layout'

import Home from '@/pages/Home'
import Work from '@/pages/Work'
import CaseStudy from '@/pages/CaseStudy'
import Ajanlat from '@/pages/Ajanlat'
import Folyamat from '@/pages/Folyamat'
import Ar from '@/pages/Ar'
import Kapcsolat from '@/pages/Kapcsolat'
import Iparagai from '@/pages/Iparagai'
import Iparagak from '@/pages/Iparagak'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/munkak" element={<Work />} />
            <Route path="/munkak/:slug" element={<CaseStudy />} />
            <Route path="/ajanlat" element={<Ajanlat />} />
            <Route path="/folyamat" element={<Folyamat />} />
            <Route path="/ar" element={<Ar />} />
            <Route path="/kapcsolat" element={<Kapcsolat />} />
            <Route path="/iparagai" element={<Iparagai />} />
            <Route path="/iparagai/:slug" element={<Iparagak />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}
