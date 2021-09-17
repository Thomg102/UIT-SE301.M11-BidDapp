import { lazy } from "react";

const route = {
    path: "/product/view",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route