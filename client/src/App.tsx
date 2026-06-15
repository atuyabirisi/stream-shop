import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLayout from "./components/layout/AdminLayout";
import CreateProperty from "./pages/admin/CreateProperty";
import Properties from "./pages/admin/Properties";
import PropertyView from "./pages/PropertyView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyView />} />

        {/* <Route path="/properties" element={<PublicProperties />} /> */}
        {/* <Route path="/properties/:id" element={<PropertyDetails />} /> */}

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="properties/new" element={<CreateProperty />} />
          <Route path="properties" element={<Properties />} />
          {/* <Route path="analytics" element={<Analytics />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
