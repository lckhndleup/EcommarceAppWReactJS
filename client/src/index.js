import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./reset.css";
import { ChakraProvider } from '@chakra-ui/react' 
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";



//Contexts
import  {AuthProvider} from './Context/AuthContext';
import { BasketProvider } from './Context/BasketContext';


const queryClient = new QueryClient({ 
  defaultOptions:{
    queries:{
      refetchOnMount:false, 
      refetchOnWindowFocus:false, 
    }
  }
}); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
