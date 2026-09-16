import PanierProvider from './context/ItemsContext'
import Main from './pages/Main'

export default function App() {

  return (
    <div> 
      <PanierProvider>
      <Main/>
      </PanierProvider>
    </div>
  )
}
