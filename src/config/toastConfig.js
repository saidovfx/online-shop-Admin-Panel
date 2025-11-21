import { toast } from "react-hot-toast";

export const showSuccess = (message) => {
  toast.success(message || "Успешно выполнено ✅");
};

export const showError = (message) => {
  toast.error(message || "Произошла ошибка ❌");
};
