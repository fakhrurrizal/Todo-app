import reportWebVitals from './reportWebVitals';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from './context/AppContext';

const client = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Router>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

reportWebVitals();
