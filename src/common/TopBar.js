import React, { useState } from 'react';
import { nav, topdropdown, products } from '../data/Data'; // Import products from data file
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    // Filter products based on search input
    const filtered = products.filter(product =>
      product.product_name && product.product_name.toLowerCase().includes(inputValue)
    );
    setFilteredProducts(filtered);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
  }

  return (
    <div className="container-fluid">
      <div className='row bg-secondary py-1 px-xl-5'>
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center h-100">
            {nav.slice(2, 5).map((val, index) => (
              <Link className="text-body mr-3" key={index}>
                {val.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center h-100">
            {topdropdown.map((val, index) => (
              <div className="btn-group" key={index}>
                <button type="button" className="btn btn-sm btn-light dropdown-toggle">
                  {val.btn}
                </button>
              </div>
            ))}
          </div>
          <div className="d-inline-flex align-items-center d-block d-lg-none">
            <Link className='btn px-0 ml-2'>
              <i className='fas fa-heart text-dark'></i>
              <span style={{paddingBottom: "2px"}} className='badge text-dark border border-dark rounded-circle'>0</span>
            </Link>
            <Link className='btn px-0 ml-2'>
              <i className='fas fa-shopping-cart text-dark'></i>
              <span style={{paddingBottom: "2px"}} className='badge text-dark border border-dark rounded-circle'>0</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
        <div className="col-lg-4">
          <Link className="text-decoration-none" to="/">
            <span className="h1 text-uppercase text-primary bg-dark px-2">Shop</span>
            <span className="h1 text-uppercase text-dark bg-primary px-2">Nest </span>
          </Link>
        </div>
        <div className='col-lg-4 col-6'>
          <form className="d-flex" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                className='form-control' 
                name="text" 
                placeholder='Search for products...'
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <div className='input-group-append'>
                <span className='input-group-text bg-transparent text-primary'><i className='fa fa-search'></i></span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 col-6 text-right">
          <p className="m-0">Customer Service</p>
          <h5 className="m-0">+0123-345-4535</h5>
        </div>
      </div>
      {/* Display filtered products */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className="card">
              <img src={product.product_img} className="card-img-top" alt={product.product_name} />
              <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <p className="card-text">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
