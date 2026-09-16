
import type { Biere } from '../assets/types'
import { useContext } from 'react'
import { PanierContext } from '../context/ItemsContext'

export default function Cart({biere}:{biere:Biere}) {
    const {ajouter , reduire } = useContext(PanierContext)!
  return (
    <div className='flex flex-col w-90 border border-gray-400 p-5 m-3 rounded-2xl'>
        <div className='w-full flex justify-center items-center'>
               <img className='w-32.5 h-50 m-10' src={biere.photo} alt="biere" />
        </div>
     
        <p className='text-2xl font-bold'>{biere.nom}</p>
        <p className='text-gray-400'>{biere.producteur}</p>
        <div className=' flex'>
            <span className=' p-3 m-2 bg-gray-300 flex flex-wrap w-20 rounded-2xl'>
                {biere.alcool}
            </span>
            <span className=' p-3 m-2 bg-gray-100 rounded-2xl flex '>
                {biere.style}
            </span>
        </div>
        <p className='text-gray-400'>{biere.volume}</p>
        <p className=' text-2xl font-bold'>{biere.prix}</p>
        <p className=' text-2xl font-bold'>total: { biere.prix * biere.count}</p>
        <div className=' bg-gray-200 flex justify-between rounded-2xl '>
             <p className='p-2'>quantite : {biere.count} </p> 
             <div className='flex p-2  gap-1 justify-end mt-2 rounded-2xl'>
            <button onClick={()=>ajouter(biere.id)} className= 'bg-black text-white rounded-2xl p-2 font-bold'>+</button>
            <button onClick={()=>reduire(biere.id)} className='bg-gray-200 font-bold rounded-2xl p-2'>-</button>
        </div>
        </div>
       
    </div>
  )
}
