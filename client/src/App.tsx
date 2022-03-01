import { useQuery } from '@apollo/client'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Content from './components/Content'
import AddLaptop from './components/Forms/AddLaptop'
import Loading from './components/Loading'
import classes from './App.module.scss'
import { INITIAL_QUERIES } from './queries'

function App() {
  const { loading } = useQuery(INITIAL_QUERIES)

  if (loading) return <Loading />

  return (
    <div className={classes.app}>
      <Header />
      <Routes>
        <Route path="/add-laptop" element={<AddLaptop />} />
        <Route path="/" element={<Content />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
