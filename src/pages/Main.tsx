
import Items from '../components/Items'
import Header from '../components/Header'
import Panier from '../components/Panier'
import { useContext } from 'react'
import { PanierContext } from '../context/ItemsContext'
export default function Main() {
    const {showPanier} = useContext(PanierContext)!
  return (
    <div>
         <Header/>
           {!showPanier ? <Items/> : <Panier/>}
    </div>
  )
}
