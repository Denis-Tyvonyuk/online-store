import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    component: Admin,
    exact: true,
  },
  {
    path: BASKET_ROUTE,
    component: Basket,
    exact: true,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    component: Shop,
    exact: true,
  },
  {
    path: LOGIN_ROUTE,
    component: Auth,
    exact: true,
  },
  {
    path: REGISTRATION_ROUTE,
    component: Auth,
    exact: true,
  },
  {
    path: DEVICE_ROUTE + "/:id", // Removed the extra "/" before :id
    component: DevicePage,
    exact: true,
  },
];
