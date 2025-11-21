import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategory, deletecategory, put_category } from "../features/adminPostCategory.js";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CategoryManager() {
  const dispatch = useDispatch();
  const { categories, category_loading, get_loading, put_loading } = useSelector(
    (state) => state.category
  );

  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(getCategory())
      .unwrap()
      .catch((err) => toast.error(`Ошибка при загрузке категорий: ${err}`));
  }, [dispatch]);

  const handleAdd = () => {
    if (!name.trim()) return toast.error("❌ Введите название категории");
    dispatch(addCategory({ name }))
      .unwrap()
      .then(() => toast.success("✅ Категория успешно добавлена"))
      .catch((err) => toast.error(`Ошибка: ${err}`));
    setName("");
  };

  const handleEdit = () => {
    if (!name.trim()) return toast.error("❌ Введите название категории");
    dispatch(put_category({ id: editItem.id, name }))
      .unwrap()
      .then(() => toast.success("✨ Категория обновлена"))
      .catch((err) => toast.error(`Ошибка: ${err}`));

    setEditMode(false);
    setName("");
  };

  const handleDelete = (id) => {
    if (confirm("❗ Вы уверены, что хотите удалить категорию?")) {
      dispatch(deletecategory({ id }))
        .unwrap()
        .then(() => toast.success("🗑 Удалено"))
        .catch((err) => toast.error(`Ошибка: ${err}`));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="shadow-lg p-6 rounded-xl border border-gray-200 bg-white">
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          📂 Управление категориями
        </h2>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Введите название категории..."
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 w-full outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {editMode ? (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white transition px-5 py-3 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 font-medium shadow-md"
              disabled={put_loading}
            >
              {put_loading ? <Loader2 className="animate-spin" size={20} /> : "Обновить"}
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white transition px-5 py-3 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 font-medium shadow-md"
              disabled={category_loading}
            >
              {category_loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Plus size={18} /> Добавить
                </>
              )}
            </button>
          )}
        </div>

        <div className="mt-8">
          {get_loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-500">Нет категорий 😢</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-100 text-gray-700 border-b">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Название</th>
                    <th className="p-3 text-center">Действия</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {categories.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 text-gray-700">{idx + 1}</td>
                      <td className="p-3 font-medium text-gray-800">{item.name}</td>
                      <td className="p-3 flex justify-center gap-3">
                        {/* Edit */}
                        <button
                          onClick={() => {
                            setEditMode(true);
                            setEditItem(item);
                            setName(item.name);
                          }}
                          className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition shadow-md"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
