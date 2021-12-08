import { lazy } from "react";

const route = {
    path: "/product/create",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route;