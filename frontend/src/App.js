import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import SearchResults from "./components/SearchResults";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<HomeScreen />} /> {/* Use element instead of component */}
          <Route path="/product/:id" element={<ProductScreen />} /> {/* Use element instead of component */}
          <Route path="/cart" element={<CartScreen />} /> {/* Use element instead of component */}
          <Route path="/search/:query" element={<SearchResults />} /> {/* Added search route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
