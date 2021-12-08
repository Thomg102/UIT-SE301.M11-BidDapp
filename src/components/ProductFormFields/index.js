import React from 'react';
import { useState, useContext } from 'react';
import  {create}  from 'ipfs-http-client';

let client = create('https://ipfs.infura.io:5001/api/v0');

const Index = () => {

  const [fileUrl, updateFileUrl] = useState(``)

  async function onChangeInput(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
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
          <label for="images">Images</label>
        </div>
        <div className="col-sm-5">
          <input type="file" name="image" onChange={(e)=>onChangeInput(e)} />
          
          {fileUrl&&(<>
          <p>Link: <a className="fileUrl" href={fileUrl}>{fileUrl}</a></p>
          <img src={fileUrl} alt="" width="500"/>
          </>)}
        </div>
      </div>

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
        <div className="col-sm-5">
          <textarea className="form-control" id="productDesc" rows="3" name="productDesc" required></textarea>

        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-2">
          <label className="productPrice">Price:</label>
        </div>
        <div className="col-sm-5 d-flex">
          <input type="number" className="form-control" id="productPrice" name="productPrice" min="0" step="any" required />
        </div>
      </div>

      {/* <div className="form-group row">
        <div className="col-sm-2">
          <label for="productCate">Category:</label>
        </div>
        <div className="col-sm-2">
          <select name="productCate" id="productCate" className="form-control" required>
            <option value="Converse">Converse</option>
            <option value="Converse1">Converse1</option>
            <option value="Converse2">Converse2</option>
          </select>
        </div>
      </div> */}

      {/* <div className="form-group row">
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
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Index