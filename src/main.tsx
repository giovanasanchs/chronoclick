import { createRoot } from "react-dom/client";
import Router from "./routes/Router.tsx";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(<Router />);
