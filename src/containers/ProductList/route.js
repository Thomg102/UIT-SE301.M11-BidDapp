import { lazy } from "react";

const route = {
    path: "/products",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route;