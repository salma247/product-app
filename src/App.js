//React-router-dom v6
import React from 'react';
import ProductProvider from './context/ProductProvider';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductAdd from './components/Product/ProductAdd';
import ProductList from './components/Product/ProductList';
import './App.css';


function App() {
  return (
    <div className="App">
      <ProductProvider>
      <Router>
        <Routes>
          <Route path="/products-app/" element={<ProductList />} />
          <Route path="/products-app/addProduct" element={<ProductAdd />} />
        </Routes>
      </Router>
      </ProductProvider>
    </div>
  );
}

export default App;
