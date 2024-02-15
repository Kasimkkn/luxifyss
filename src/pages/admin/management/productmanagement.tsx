import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, photos, name, description, stock, category, color } =
    data?.product || {
      photos: "",
      description: "",
      category: "",
      name: "",
      color: "",
      stock: 0,
      price: 0,
    };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [colorUpdate, setcolorUpdate] = useState<string>(color);
  const [descriptionUpdate, setdescriptionUpdate] =
    useState<string>(description);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File[]>([]);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files && files.length > 0) {
      const selectedPhotos: File[] = [];
      const previewUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        selectedPhotos.push(files[i]);

        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            previewUrls.push(reader.result);
          }
          if (previewUrls.length === files.length) {
            setPhotoUpdate(previewUrls); // Update photoUpdate with the array of data URLs
          }
        };
        reader.readAsDataURL(files[i]);
      }
      setPhotoFile(selectedPhotos);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) {
      for (let i = 0; i < photoFile.length; i++) {
        formData.append("photos", photoFile[i]);
      }
    }

    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (colorUpdate) formData.set("color", colorUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setdescriptionUpdate(data.product.description);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setcolorUpdate(data.product.color);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              {Array.isArray(photos) && photos.length > 0 && (
                <div className="existing-box">
                  {photos.map((url, index) => (
                    <img key={index} src={url} alt={`Product ${index}`} />
                  ))}
                </div>
              )}
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{price}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="description"
                    value={descriptionUpdate}
                    onChange={(e) => setdescriptionUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Color</label>
                  <input
                    type="text"
                    placeholder="color"
                    value={colorUpdate}
                    onChange={(e) => setcolorUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photo</label>
                  <input type="file" onChange={changeImageHandler} multiple />
                </div>

                {photoUpdate && (
                  <div className="preview-box">
                    {photoUpdate.map((url, index) => (
                      <img key={index} src={url} alt={`Preview ${index}`} />
                    ))}
                  </div>
                )}

                <button type="submit">Update</button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
