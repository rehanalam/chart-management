import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGetFredCategoryQuery } from './redux/fredCategories/api'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore, store } from './redux/store'
import Dashboard from './components/Dashboard'

function App() {
  // const {data, isLoading} = useGetFredCategoryQuery(undefined,{refetchOnMountOrArgChange: true});

  return (
   <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
      <Dashboard/>
      </PersistGate>
  </Provider>
   </>
  )
}

export default App
