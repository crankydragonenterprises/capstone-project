import { createContext, useState , useEffect} from "react";
import SHOP_DATA from '../shop-data.json';

//the actual value you want to access
export const ProductsContext = createContext({
    products: [],

});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(SHOP_DATA);
    const value = { products };

    useEffect(() => {
        
    }, [])
    
    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}