import { useReducer } from "react";
import { ProductContext } from "../context/product-context";
import axios from "axios";

const server = "https://junior-product-app.000webhostapp.com/";

const initialState = {
    products: [],
    deleteProducts: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "SET_DELETE_PRODUCTS":
            return {
                ...state,
                deleteProducts: action.payload,
            };
        default:
            return state;
    }
}

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setProducts = (products) => {
        dispatch({
            type: "SET_PRODUCTS",
            payload: products,
        });
    };

    const setDeleteProducts = (deleteProducts) => {
        dispatch({
            type: "SET_DELETE_PRODUCTS",
            payload: deleteProducts,
        });
    };

    const getProducts = async () => {
        const response = await axios.get(server);
        setProducts(response.data);
    };

    const addProduct = async (product) => {
        try {
            await axios.post(server, {
                product: product,
            });
            getProducts();
        }
        catch (error) {
            console.log(error);
        }
    };

    const massDelete = async () => {
        try {
            await axios.delete(server, {
                data: {
                    deleteProducts: state.deleteProducts,
                },
            });
            setDeleteProducts([]);
            getProducts();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                deleteProducts: state.deleteProducts,
                setProducts,
                setDeleteProducts,
                addProduct,
                getProducts,
                massDelete,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;