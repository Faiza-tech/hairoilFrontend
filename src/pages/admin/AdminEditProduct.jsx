
import { useEffect, useState } from "react";
import api from "../../api/Axios";
import { useNavigate, useParams, } from "react-router-dom";




const AdminEditProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [features, setFeatures] = useState("");

  const [stock, setStock] = useState("");

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await api.get(`/api/products/${id}`);

        const product = res.data;

        setTitle(product.title);

        setPrice(product.price);

        setImage(product.image);

        setCategory(product.category);

        setDescription(product.description);

        // ✅ ADD THIS LINE HERE
        setFeatures(product.features ? product.features.join(",") : "");

        setStock(product.stock);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProduct();

  }, [id]);

  // UPDATE PRODUCT
  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/api/products/${id}`,
        {
          title,
          price,
          image,
          category,
          description,
          features: features ? features.split(",") : [],
          stock,
        },

      );


      alert("Product updated");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }
  };

  // for image 
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
   
      const { data } = await api.post("/api/upload", formData);

      setImage(data.imageUrl);

      alert("Image uploaded!");
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Edit Product</h1>

      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "500px",
        }}
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        {/** for cloudinary image */}
        <input
          type="file"
          accept="image/*"
          onChange={uploadImageHandler}
        />
        {image && (
          <img
            src={image}
            alt="preview"
            width="120"
            style={{
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <textarea
          placeholder="Features separated by comma"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />


        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        <button type="submit">
          Update Product
        </button>

      </form>

    </div>
  );
};

export default AdminEditProduct;