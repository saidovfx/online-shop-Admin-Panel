import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./pages/AdminProducts.jsx";
import GetProducts from "./pages/GetProducts.jsx";
import Navbar from "./pages/Navbar.jsx";
import CategoryManager from "./pages/Category.jsx";
import { router } from "./config/router.js";
import ProductEditPage from "./pages/ProductsView.jsx";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
<Route path={router.products} element={<ProductForm />} />

        <Route path={router.add} element={<GetProducts />} />

    
        
        <Route path={router.category} element={<CategoryManager/>}/>
        <Route path={router.productsView} element={<ProductEditPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
