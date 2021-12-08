import { lazy } from "react";

const route = {
    path: "/product/:id",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route;