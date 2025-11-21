import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { editProducts, deleteProduct } from "../features/adminEditProducts.js";
import { get_products } from "../features/adminUploa.js";
import { ArrowLeft } from "lucide-react";

export default function ProductEditPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = state?.id;

  useEffect(() => {
    dispatch(get_products());
  }, [dispatch]);

  const productState = useSelector((state) => state.uploadProducts);
  const productArray = productState.products
    ? Object.entries(productState.products).map(([id, value]) => ({ id, ...value }))
    : [];

  const product1 = productArray.find((item) => item.id === id);

  const [form, setForm] = useState({
    name: product1?.name || "",
    desc: product1?.desc || "",
    price: product1?.price || "",
    category: product1?.category || "",
    endStatus: product1?.endStatus || false,
    images:product1?.images
  });

  const [mainImage, setMainImage] = useState(product1?.images?.[0] || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEndStatus = () => {
    setForm({ ...form, endStatus: !form.endStatus });
  };

  const handleEdit = () => {
    dispatch(editProducts({ id, ...form }));
    alert("Mahsulot muvaffaqiyatli yangilandi!");
  };

  const handleDelete = () => {
    if (confirm("❗ Rostdan ham o'chirmoqchimisiz?")) {
      dispatch(deleteProduct({ id }));
      navigate(-1);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      {/* Orqaga */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 mb-4"
      >
        <ArrowLeft size={20} /> Orqaga
      </button>

      <h2 className="text-xl font-semibold mb-4">🛠 Mahsulotni tahrirlash</h2>

      {mainImage && (
        <img
          src={mainImage}
          alt={form.name}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {product1?.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setMainImage(img)}
            className={`w-20 h-20 object-cover rounded border cursor-pointer ${
              img === mainImage ? "border-blue-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      <label className="block mb-2 font-medium">Nomi</label>
      <input
        className="border p-2 w-full rounded"
        value={form.name}
        name="name"
        onChange={handleChange}
      />

      <label className="block mb-2 mt-4 font-medium">Narx</label>
      <input
        className="border p-2 w-full rounded"
        value={form.price}
        type="number"
        name="price"
        onChange={handleChange}
      />

      <label className="block mb-2 mt-4 font-medium">Kategoriya</label>
      <input
        className="border p-2 w-full rounded"
        value={form.category}
        name="category"
        onChange={handleChange}
      />

      <label className="block mb-2 mt-4 font-medium">Ta'rif</label>
      <textarea
        className="border p-2 w-full rounded"
        value={form.desc}
        name="desc"
        onChange={handleChange}
      />

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={form.endStatus}
          onChange={toggleEndStatus}
          id="endStatus"
        />
        <label htmlFor="endStatus" className="font-medium">
          Mahsulot mavjudmi
        </label>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleEdit}
          className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          💾 Saqlash
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          🗑 O'chirish
        </button>
      </div>
    </div>
  );
}
