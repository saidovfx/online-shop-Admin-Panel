import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload_products } from "../features/adminUploa";
import { getCategory } from "../features/adminPostCategory";
import { Camera, ImagePlus, X } from "lucide-react";

export default function ProductForm() {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector((state) => state.uploadProducts);
  const { categories, get_loading } = useSelector((state) => state.category);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    shtok: "",
    desc: "",
    images: [],
    category: "",
  });

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0]; 
    if (!file) return;

    if (product.images.length >= 4) return alert("❌ Max 4 images allowed!");

    const updatedFiles = [...product.images, file];
    const updatedPreview = [...preview, URL.createObjectURL(file)];

    setProduct({ ...product, images: updatedFiles });
    setPreview(updatedPreview);
  }

  function removeImage(index) {
    const updatedFiles = product.images.filter((_, i) => i !== index);
    const updatedPreview = preview.filter((_, i) => i !== index);

    setProduct({ ...product, images: updatedFiles });
    setPreview(updatedPreview);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(upload_products(product));
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-base-200 rounded-xl mt-5">
      <h2 className="font-bold text-xl sm:text-2xl text-center mb-4">
        Add Product 🛒
      </h2>

      <form className="flex flex-col gap-4 overflow-y-auto max-h-[75vh] pb-20" onSubmit={handleSubmit}>

        <select
          className="select select-bordered w-full"
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          <option disabled selected>
            {get_loading ? "Loading..." : "Select category"}
          </option>
          {categories.map((cat) => (
            <option key={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input className="input input-bordered" placeholder="Product name" onChange={(e)=> setProduct({...product, name: e.target.value})} />
        <input className="input input-bordered" placeholder="Price" type="number" onChange={(e)=> setProduct({...product, price: e.target.value})} />
        <input className="input input-bordered" placeholder="Stock" type="number" onChange={(e)=> setProduct({...product, shtok: e.target.value})} />
        <textarea className="textarea textarea-bordered" placeholder="Description" onChange={(e)=> setProduct({...product, desc: e.target.value})}></textarea>

        {/* Buttons */}
        <div className="flex gap-3">
          <label className="btn btn-outline flex-1">
            <ImagePlus size={18} />
            Gallery
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
          </label>

          <label className="btn btn-outline flex-1">
            <Camera size={18} />
            Camera
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange}/>
          </label>
        </div>

        {/* Image Preview */}
        {preview.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {preview.map((src, index) => (
              <div key={index} className="relative">
                <img src={src} className="w-full h-32 object-cover rounded-lg" />
                <button onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                  <X size={14}/>
                </button>
              </div>
            ))}
          </div>
        )}

      </form>

      {/* Sticky Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="btn btn-primary w-full sticky bottom-2 mt-4 z-50"
      >
        {loading ? "Uploading..." : "Upload Product"}
      </button>

      {success && <p className="text-green-500 text-center mt-2">✔ Done!</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
