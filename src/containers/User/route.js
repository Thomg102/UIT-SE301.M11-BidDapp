import { lazy } from "react";

const route = {
    path: "/user/:id",
    exact: true,
    public: true,
    component: lazy(() => import(".")),
}

export default route;