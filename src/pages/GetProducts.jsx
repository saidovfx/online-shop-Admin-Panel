import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_products } from "../features/adminUploa.js";
import { useNavigate } from "react-router-dom";
import { router } from "../config/router.js";

export default function GetProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, get_loading, get_error } = useSelector(
    (state) => state.uploadProducts
  );

  useEffect(() => {
    dispatch(get_products());
  }, [dispatch]);

  const productArray = products
    ? Object.entries(products).map(([id, value]) => ({ id, ...value }))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 pt-6 bg-[#EEF1F4] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 tracking-wide">
        🛒 Список товаров
      </h1>

      {get_loading && (
        <p className="text-center text-gray-600 animate-pulse">Загрузка...</p>
      )}
      {get_error && <p className="text-center text-red-600">{get_error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {productArray.length > 0 ? (
          productArray.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(router.productsView, { state: { id: item.id } })
              }
              className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden border ${
                item.endStatus ? "border-red-400" : "border-gray-200"
              }`}
            >
              {item.endStatus && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md font-semibold">
                  ❌ Закончился
                </span>
              )}

              <img
                src={item.images?.[0]}
                alt={item.name}
                className={`w-full h-40 object-cover ${
                  item.endStatus ? "opacity-50" : ""
                }`}
              />

              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-5">
                  {item.name}
                </h3>

                <p className="text-gray-700 text-[13px] font-medium mt-2">
                  💰 {item.price?.toLocaleString()} сум
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  📦 Остаток:{" "}
                  <span
                    className={`font-bold ${
                      item.shtok <= 3 && !item.endStatus
                        ? "text-orange-500"
                        : item.endStatus
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.endStatus ? "Нет" : item.shtok}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            ❌ Товары не найдены
          </p>
        )}
      </div>
    </div>
  );
}
