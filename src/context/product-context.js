import { createContext } from "react";

export const ProductContext = createContext({
    products: [],
    deleteProducts: [],
    setProducts: () => { },
    setDeleteProducts: () => { },
    addProduct: () => { },
    getProducts: () => { },
    massDelete: () => { },
});