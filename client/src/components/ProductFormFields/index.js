<<<<<<< HEAD
import React from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const index = () => {
  return (
    <>
      <div class="form-group row">
        <label for="productName" class="col-sm-2">
          Name
        </label>
        <div class="col-sm-5">
          <input
            type="text"
            name="productName"
            id="productName"
            class="form-control"
            required
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label for="productImg">Cover Image</label>
        </div>
        <div class="col-sm-5">
=======
import React from 'react'
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode, FilePondPluginImageExifOrientation)

const index = () => {
  return (
    <>
      <div className="form-group row">
        <label for="productName" className="col-sm-2">Name</label>
        <div className="col-sm-5">
          <input type="text" name="productName" id="productName" className="form-control" required />

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label for="productImg">Cover Image</label>
        </div>
        <div className="col-sm-5">
          <FilePond allowMultiple={false} server="/api" />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label for="images">Images</label>
        </div>
        <div className="col-sm-5">
>>>>>>> 6d59f9aad2411d90dd2c0f61ada8294154e7c74f
          <FilePond allowMultiple={true} maxFiles={3} server="/api" />
        </div>
      </div>

<<<<<<< HEAD
      <div class="form-group row">
        <div class="col-sm-2">
          <label for="images">Images</label>
        </div>
        <div class="col-sm-5">
          <input
            type="file"
            class="form-control-file filepond"
            multiple
            id="images"
            name="images"
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label for="productShortDesc">Description:</label>
        </div>
        <div class="col-sm-5">
          <textarea
            class="form-control"
            id="productShortDesc"
            rows="3"
            maxlength="250"
            name="productShortDesc"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label for="productDesc">Detail:</label>
        </div>
        <div class="col-sm-8">
          <textarea
            class="form-control"
            id="productDesc"
            rows="3"
            name="productDesc"
            required
          ></textarea>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label class="productPrice">Price:</label>
        </div>
        <div class="col-sm-5">
          <input
            type="number"
            class="form-control"
            id="productPrice"
            name="productPrice"
            required
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label for="productCate">Category:</label>
        </div>
        <div class="col-sm-2">
          <select
            name="productCate"
            id="productCate"
            class="form-control"
            required
          ></select>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <p>Condition:</p>
        </div>
        <div class="col-sm-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="pIsNew"
              id="true"
              value="true"
            />
            <label class="form-check-label" for="true">
              True
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="pIsNew"
              id="false"
              value="false"
              checked
            />
            <label class="form-check-label" for="false">
              False
            </label>
=======
      <div className="form-group row">
        <div className="col-sm-2">
          <label for="productShortDesc">Description:</label>
        </div>
        <div className="col-sm-5">
          <textarea className="form-control" id="productShortDesc" rows="3" maxlength="250" name="productShortDesc"
            required></textarea>

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label for="productDesc">Detail:</label>
        </div>
        <div className="col-sm-8">
          <textarea className="form-control" id="productDesc" rows="3" name="productDesc" required></textarea>

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label className="productPrice">Price:</label>
        </div>
        <div className="col-sm-5">
          <input type="number" className="form-control" id="productPrice" name="productPrice" required />

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label for="productCate">Category:</label>
        </div>
        <div className="col-sm-2">
          <select name="productCate" id="productCate" className="form-control" required>
            <option value="Converse">Converse</option>
          </select>

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <p>Condition:</p>
        </div>
        <div className="col-sm-2">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="pIsNew" id="true" value="true" />
            <label className="form-check-label" for="true">True</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="pIsNew" id="false" value="false" checked />
            <label className="form-check-label" for="false">False</label>
>>>>>>> 6d59f9aad2411d90dd2c0f61ada8294154e7c74f
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div class="form-group row">
        <div class="col-sm-2">
          <label for="pSaleOff">Discount percent:</label>
        </div>
        <div class="col-sm-2">
          <input
            type="number"
            value="0"
            class="form-control"
            id="pSaleOff"
            name="pSaleOff"
            required
          />
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-2">
          <label for="quantity">Quantity:</label>
        </div>
        <div class="col-sm-2">
          <input
            type="number"
            class="form-control"
            id="quantity"
            name="quantity"
            required
          />
        </div>
      </div>
    </>
  );
};

export default index;
=======
      <div className="form-group row">
        <div className="col-sm-2">
          <label for="pSaleOff">Discount percent:</label>
        </div>
        <div className="col-sm-2">
          <input type="number" value="0" className="form-control" id="pSaleOff" name="pSaleOff" required />

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label for="quantity">Quantity:</label>
        </div>
        <div className="col-sm-2">
          <input type="number" className="form-control" id="quantity" name="quantity" required />
        </div>
      </div>
    </>
  )
}

export default index
>>>>>>> 6d59f9aad2411d90dd2c0f61ada8294154e7c74f
