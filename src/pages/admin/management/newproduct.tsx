import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [color, setColor] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
  
    if (files && files.length > 0) {
      const selectedPhotos: File[] = [];
      const previewUrls: string[] = []; 
  
      for (let i = 0; i < files.length; i++) {
        selectedPhotos.push(files[i]);
  
        // Read data URL for preview
        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            previewUrls.push(reader.result);
          }
          if (previewUrls.length === files.length) {
            setPhotoPrev(previewUrls);
          }
        };
        reader.readAsDataURL(files[i]);
      }
      setPhotos(selectedPhotos);
    }
  };
  

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photos) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    //formData.set("photos", photos);
    formData.set("category", category);
    formData.set("color", color);

    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }
    const res = await newProduct({ id: user?._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                required
                type="text"
                placeholder="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <input
                required
                type="text"
                placeholder="eg. sneaker, casuaul etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <input
                required
                type="file"
                onChange={changeImageHandler}
                multiple
              />
            </div>
            <div className="preview-box">
            {photos.map((photo, index) => (
              
                 <img
                key={index}
                src={photoPrev[index]}
                alt={`Preview ${photo}`}
              />
            ))}
            
            </div>

            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
