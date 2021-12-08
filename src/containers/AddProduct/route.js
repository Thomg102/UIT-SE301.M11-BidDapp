import { lazy } from "react";

const route = {
    path: "/admin/product/create",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route;