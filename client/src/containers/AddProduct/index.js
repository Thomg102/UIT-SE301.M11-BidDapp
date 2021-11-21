import React from "react";
import ProductFormFields from '../../components/ProductFormFields/index'


const route = () => {
  return (
    <>
      <div class="d-flex ">
        <div class="col-2 pl-0 h-100 w-25 fixed-top"></div>
        <div class="col-12 w-100 pr-0">
          <div class="col-10 ml-auto">
            <div class="d-flex justify-content-between pt-3">
              <h1 class="text-primary text-uppercase">Add product</h1>
            </div>
            <hr />
            <div class="ml-3">
              <form
                enctype="application/x-www-form-urlencoded"
                class="needs-validation"
                action="api/product/add"
                method="POST"
              >
                <ProductFormFields/>
                <button
                  class="btn btn-success pt-2 md-2 mb-5 submit"
                  type="submit"
                  name="submit"
                  id="submitBtn"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default route;
