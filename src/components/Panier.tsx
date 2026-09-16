
import { useContext } from "react"
import { PanierContext } from "../context/ItemsContext"
import Cart from "./Cart"

export default function Panier() {
    const {itemsPanier } = useContext(PanierContext)!
  return (
    <div className="mt-30">
     <div className="flex flex-wrap">
        {itemsPanier?.map(b=>(
            <Cart key={b.id} biere={b}/>
        ))}
    </div>
    <p className="p-3 text-4xl font-bold">à payer : {
        itemsPanier.reduce((total,b)=> total + b.count * b.prix , 0).toFixed(2)
    } </p>
    </div>
   
  )
}
