import { createRoot } from "react-dom/client";
import Root from "./root/Root.tsx";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(<Root />);
