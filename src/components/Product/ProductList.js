import React from 'react'
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/product-context';

export default function ProductList() {
    const productCtx = React.useContext(ProductContext);
    const { products, deleteProducts, setDeleteProducts, massDelete, getProducts } = productCtx;

    React.useEffect(() => {
        getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMassDelete = () => {
        massDelete();
        //uncheck all checkboxes
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    return (
        <>
            <header>
                <h1>Product List</h1>
                <div className="buttons">
                    <Link to="/products-app/addProduct">ADD</Link>
                    <button onClick={handleMassDelete}>MASS DELETE</button>
                </div>
            </header>

            <div className="container">
                <div className="products">
                    {products.length !== 0 ? products.map((product, index) => (
                        <div className="product" key={index}>
                            <div className="product_mass-delete">
                                <input type="checkbox" onChange={(e) => {
                                    if (e.target.checked) {
                                        setDeleteProducts([...deleteProducts, product.SKU]);
                                    } else {
                                        setDeleteProducts(deleteProducts.filter((SKU) => SKU !== product.SKU));
                                    }
                                }} />
                            </div>
                            <div className="product_details">
                                <p>{product.SKU}</p>
                                <p>{product.name}</p>
                                <p>{product.price}$</p>
                                {
                                    //display attributes object
                                    Object.keys(product.attributes).map((key, index) => (
                                        <p key={index}>{key}: {product.attributes[key]}</p>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                        : <p>No products</p>}

                </div>
            </div>
        </>
    )
}
