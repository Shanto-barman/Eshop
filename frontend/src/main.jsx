import React, { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import  App  from './app.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
    <StrictMode>
       <App/>
       <Toaster/>
    </StrictMode>
)
