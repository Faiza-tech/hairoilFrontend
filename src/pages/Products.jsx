// src/pages/Products.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/Axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";


const Products = () => {

  //Add STATE
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [viewMode, setViewMode] = useState("grid");

  // ADD SEARCH + FILTER
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");


  // create state for sortOption
  const [sortOption, setSortOption] = useState("default");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1)



  useEffect(() => {

    if (window.innerWidth <= 600) {
      setViewMode("grid");
    }

    const fetchProducts = async () => {

      try {

        setIsLoading(true);

      
        const res = await api.get("/api/products", {
          params: {
            keyword: searchTerm,
            category: selectedCategory,
            price: priceRange,
            sort: sortOption,
            page: currentPage,
          },
        });

        setProducts(res.data.products);

        setTotalPages(res.data.pages);

      } catch (error) {

        console.log(error);

      } finally {

        setIsLoading(false);

      }
    };

    fetchProducts();

  }, [
    searchTerm,
    selectedCategory,
    priceRange,
    sortOption,
    currentPage,
  ]);

  

  return (
    <section className="products-page">
      <h1>Our Hair Oil Products</h1>

      <div className="filters-bar">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page
          }}
        />

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Category</option>
          <option value="oil">Oil</option>
          <option value="soap">Soap</option>
          <option value="accessories">Accessories</option>
          <option value="combo">Combo</option>
        </select>

        {/* PRICE FILTER */}
        <select
          value={priceRange}
          onChange={(e) => {
            setPriceRange(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">Filter by Price</option>
          <option value="low">Below £200</option>  
          <option value="mid">£200 - £400</option>
          <option value="high">Above £400</option>
        </select>

        {/* SORT BY */}
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name-az">Name: A → Z</option>
          <option value="name-za">Name: Z → A</option>
        </select>

      </div>



      {/* View toggle + showing results */}
      <div className="view-toggle-bar">
        {/* Left side: Showing results */}
        <div className="show-results">

          <h6>{products.length} Products Found</h6>
        </div>

        {/* Right side: Grid/List toggle */}
        <div className="gl-buttons">
          <button
            className={viewMode === "grid" ? "active" : ""}

            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <i className="fas fa-th"></i>
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <i className="fas fa-list-ul"></i>
          </button>
        </div>
      </div>


      {/* Products */}
      <div className={viewMode === "grid" ? "products-grid" : "products-list"}>

        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map(product => (
            <ProductCard key={product._id} {...product} view={viewMode} />
          ))
        )}


      </div>


      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (

          < button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))
        }
      </div >


    </section >
  );
};

export default Products;







