
import { useState } from "react";
import api from "../../api/Axios";

const AdminCreateProduct = () => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [features, setFeatures] = useState("");
    const [stock, setStock] = useState(100);

    // CREATE PRODUCT
    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            const newProduct = {
                title,
                image,
                description,
                price,
                category,
                stock,
                features: features
                    ? features.split(",")
                    : []
            };

            await api.post("/api/products", newProduct);

            alert("Product Created!");

            // clear form
            setTitle("");
            setImage("");
            setDescription("");
            setPrice("");
            setCategory("");
            setFeatures("");

        } catch (error) {

            console.log(error);

            alert("Create Product Failed");

        }
    };

    // for image
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
           
            const { data } = await api.post("/api/upload", formData,);

            setImage(data.imageUrl); // store Cloudinary URL

            alert("Image uploaded!");
        } catch (error) {
            console.log(error);
            alert("Image upload failed");
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Create Product</h1>

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

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
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

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />


                <textarea
                    placeholder="Features separated by comma"
                    value={features}
                    onChange={(e) =>
                        setFeatures(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />



                <button type="submit">
                    Create Product
                </button>

            </form>

        </div>
    );
};

export default AdminCreateProduct;