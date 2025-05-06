import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import {
  MemesHome,
  CreateNewMeme,
  GetSingleMeme,
  NotFound
} from './containers/';

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MemesHome/>} />
        <Route path="/create" element={<CreateNewMeme />} />
        <Route path="/meme/:id" element={<GetSingleMeme />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
