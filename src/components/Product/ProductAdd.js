import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/product-context';

function ProductAdd() {
  const [selectedType, setSelectedType] = useState("DVD");
  const productCtx = React.useContext(ProductContext);

  // refs
  const skuRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const sizeRef = useRef(null);
  const weightRef = useRef(null);
  const heightRef = useRef(null);
  const widthRef = useRef(null);
  const lengthRef = useRef(null);

  // validation
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    
    const skuExists = productCtx.products.find((product) => product.SKU === skuRef.current.value);
    if (skuExists) {
      newErrors.sku = "SKU already exists";
    }

    if (!skuRef.current.value) {
      newErrors.sku = "SKU is required";
    }
    if (!nameRef.current.value) {
      newErrors.name = "Name is required";
    }
    if (!priceRef.current.value) {
      newErrors.price = "Price is required";
    }

    if (selectedType === "DVD") {
      if (!sizeRef.current.value) {
        newErrors.size = "Size is required";
      } else if (isNaN(sizeRef.current.value) || sizeRef.current.value <= 0) {
        newErrors.size = "Size must be a positive number";
      }
    }

    if (selectedType === "Furniture") {
      if (!heightRef.current.value) {
        newErrors.height = "Height is required";
      } else if (isNaN(heightRef.current.value) || heightRef.current.value <= 0) {
        newErrors.height = "Height must be a positive number";
      }

      if (!widthRef.current.value) {
        newErrors.width = "Width is required";
      } else if (isNaN(widthRef.current.value) || widthRef.current.value <= 0) {
        newErrors.width = "Width must be a positive number";
      }

      if (!lengthRef.current.value) {
        newErrors.length = "Length is required";
      } else if (isNaN(lengthRef.current.value) || lengthRef.current.value <= 0) {
        newErrors.length = "Length must be a positive number";
      }
    }

    if (selectedType === "Book") {
      if (!weightRef.current.value) {
        newErrors.weight = "Weight is required";
      } else if (isNaN(weightRef.current.value) || weightRef.current.value <= 0) {
        newErrors.weight = "Weight must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addProduct = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // create product object
      const attributes = {};
      if(selectedType === "DVD") {
        attributes.size = sizeRef.current.value;
      } else if(selectedType === "Furniture") {
        attributes.height = heightRef.current.value;
        attributes.width = widthRef.current.value;
        attributes.length = lengthRef.current.value;
      } else if(selectedType === "Book") {
        attributes.weight = weightRef.current.value;
      }

      const product = {
        SKU: skuRef.current.value,
        name: nameRef.current.value,
        price: priceRef.current.value,
        attributes: attributes,
      };

      // add product to context
      productCtx.addProduct(product);
      navigate("/products-app");
    }
  };

  return (
    <>
      <header>
        <h1>Product Add</h1>
        <div className="buttons">
          <button onClick={addProduct}>ADD</button>
          <Link to="/products-app"><button>CANCEL</button></Link>
        </div>
      </header>

      <form id="product_form">
        {
          Object.keys(errors).length > 0 &&
            <ul className="errors">
              {
                Object.keys(errors).map((key) => {
                  return <li key={key}>{errors[key]}</li>
                }
                )
              }
            </ul>
          
        }
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input type="text" id="sku" name="sku" ref={skuRef} />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" ref={nameRef} />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" id="price" name="price" ref={priceRef} />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type Switcher</label>
          <select id="type" name="type" onChange={handleTypeChange}>
            <option value="DVD" id="DVD">DVD</option>
            <option value="Book" id="Book">Book</option>
            <option value="Furniture" id="Furniture">Furniture</option>
          </select>
        </div>

        {
          selectedType === "DVD" ?
            <div id="DVD" className="form-group">
              <label htmlFor="size">Size (MB)</label>
              <input type="text" id="size" name="size" ref={sizeRef} />
              <p>
                please provide size in MB
              </p>
            </div>
            : null
        }

        {
          selectedType === "Book" ?
            <div id="Book" className="form-group">
              <label htmlFor="weight">Weight (KG)</label>
              <input type="text" id="weight" name="weight" ref={weightRef} />
              <p>
                please provide weight in KG
              </p>
            </div>
            : null
        }

        {
          selectedType === "Furniture" ?
            <div id="Furniture" className="form-group">
              <label htmlFor="height">Height (CM)</label>
              <input type="text" id="height" name="height" ref={heightRef} />
              <label htmlFor="width">Width (CM)</label>
              <input type="text" id="width" name="width" ref={widthRef} />
              <label htmlFor="length">Length (CM)</label>
              <input type="text" id="length" name="length" ref={lengthRef} />
              <p>
                please provide dimensions in HxWxL format
              </p>
            </div>
            : null
        }

      </form>
    </>
  )
}

export default ProductAdd