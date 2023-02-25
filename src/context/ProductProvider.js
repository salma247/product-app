import { useReducer } from "react";
import { ProductContext } from "../context/product-context";
import axios from "axios";

// const server = "https://junior-product-app.000webhostapp.com/";
const server = "http://localhost/juniortest/"

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
        const jsonProduct = JSON.stringify(product);
        try {
            console.log(jsonProduct);
            await axios.get(server, {
                params: {
                    product: jsonProduct,
                },
            }); // send product object to server using GET method (because of 000webhostapp.com) => "https://junior-product-app.000webhostapp.com/?product={sku:sku1,name:name1,price:price1,quantity:quantity1}'
            getProducts();
        }
        catch (error) {
            console.log(error);
        }
    };

    const massDelete = async () => {
        const jsonDeleteProducts = JSON.stringify(state.deleteProducts);
        try {
            await axios.get(server, {
                params: {
                    deleteProducts: jsonDeleteProducts,
                },
            }); // send deleteProducts array to server using GET method (because of 000webhostapp.com) => "https://junior-product-app.000webhostapp.com/?deleteProducts=[sku1,sku2,sku3]'
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