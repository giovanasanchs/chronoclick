import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../app/App";
import NotFound from "../pages/NotFound";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
