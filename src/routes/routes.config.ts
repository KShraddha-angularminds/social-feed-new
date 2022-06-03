import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const SignUp = lazy(() => import("../pages/auth/SignUp/SignUp"));
const ForgetPassword = lazy(
  () => import("../pages/auth/ForgetPassword/ForgetPassword")
);
const ResetPassword = lazy(
  () => import("../pages/auth/ResetPassword/ResetPassword")
);
/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  ForgetPassword: "/auth/forgot-password",
  ResetPassword: "/auth/reset-password",
  SignUp: "/auth/sign-up",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.SignUp,
    component: SignUp,
  },
  {
    path: paths.ForgetPassword,
    component: ForgetPassword,
  },
  {
    path: paths.ResetPassword,
    component: ResetPassword,
  },
];
