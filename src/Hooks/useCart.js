import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/CartDb";

const useCart = (products) => {
   const [cart, setCart] = useState([]);

   useEffect(() => {
      const storedCart = getStoredCart()
      const savedCart = []
      for (let id in storedCart) {
         const addedProduct = products?.find(product => product._id == id)
         if (addedProduct) {
            addedProduct.quantity = storedCart[id]
            savedCart.push(addedProduct)
         }
      }
      setCart(savedCart)
   }, [products])

   return [cart, setCart]
}

export default useCart