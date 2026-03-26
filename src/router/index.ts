import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

export function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
