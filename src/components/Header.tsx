
import { useContext } from "react"
import { PanierContext } from "../context/ItemsContext"
export default function Header() {
    const { showPanier, setShowPanier ,  trouver  } = useContext(PanierContext)!
  return (
    <div className='bg-yellow-500 text-black p-9 text-3xl font-bold flex bg-blend-screen w-full fixed top-0 left-0 z-50 mb-15 justify-between'>
        <p className=" cursor-pointer" onClick={()=> setShowPanier(!setShowPanier)}>Biere</p>
        <input className='bg-white rounded-2xl text-black text-2xl p-2' placeholder="🔎" type="text"  onChange={(e)=>trouver(e.target.value)} />
        <button onClick={() => setShowPanier(!showPanier)} className="text-4xl p-1 cursor-pointer bg-fuchsia-900 rounded-2xl">🛒</button>
    </div>
  )
}
