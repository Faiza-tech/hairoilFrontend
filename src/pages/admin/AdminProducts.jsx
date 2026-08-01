
import AdminTable from "../../components/adminReuseUI/AdminTable";
import { useEffect, useState } from "react";
import api from "../../api/Axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/adminReuseUI/AdminLayout";
import "./AdminProducts.css";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  //product search
  const [search, setSearch] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;


  // GET USER TOKEN
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await api.get("/api/admin/products")

      console.log("AdminProducts:", res.data);
      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);


  // DELETE PRODUCT
  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/products/${id}`);

      alert("Product deleted");

      // refresh products
      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Delete failed");

    }
  };

  // console.log(products);
  // console.log(Array.isArray(products));


  //search product
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );


  //pagination
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );


  return (

    <AdminLayout>


      <div style={{ padding: "30px" }}>

        <h1>Admin Products</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="product-search"
        />

        <br />

        <Link to="/admin/create-product">
          Create Product
        </Link>


        <AdminTable
          columns={[
            "ID",
            "IMAGE",
            "TITLE",
            "PRICE",
            "CATEGORY",
            "ACTIONS",
          ]}
        >


          {currentProducts.map((product) => (

            <tr key={product._id}>

              <td>{product._id}</td>

              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  width="60"
                />
              </td>

              <td>{product.title}</td>

              <td>£{product.price}</td>

              <td>{product.category}</td>

              <td>

                <Link
                  to={`/admin/product/${product._id}/edit`}
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    deleteHandler(product._id)
                  }
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </AdminTable>

        {/** pagination */}
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>



      </div>

    </AdminLayout>

  );
};

export default AdminProducts;

