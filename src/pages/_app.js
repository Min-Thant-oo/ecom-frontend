import '@/styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/slices/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={'loading'} persistor={persistor}>
        <Component {...pageProps} />  
      </PersistGate>
    </Provider>
  )
}