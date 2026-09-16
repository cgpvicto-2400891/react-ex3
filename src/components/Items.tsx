import {  useContext} from 'react'
import Cart from './Cart'
import { PanierContext } from '../context/ItemsContext'



export default function Items() {
const {items} = useContext(PanierContext)!
   
  return (
    <div className='flex flex-wrap mt-30 justify-center'>
        {items?.map(b=>(
            <Cart key={b.id} biere={b}/>
        ))}
    </div>
  )
}
