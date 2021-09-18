import React from 'react'
import Navbar from '../../components/Navbar/index'
//import ProductCard from '../../components/ProductCard/index'
import Footer from '../../components/Footer/index'

const index = () => {
    return (
        <>
            <Navbar/>
            <section className="home">
                <table className="table table-borderless text-muted text-center">
                    <thead>
                        <tr>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>mDAI</td>
                            <td>DAPP</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-4" >
                    <div className="card-body">
                        <form className="mb-3" onSubmit={(event) => {
                                event.preventDefault()
                            }}>
                            <div>
                                <label className="float-left"><b>Stake Tokens</b></label>
                                <span className="float-right text-muted">
                                    Balance:
                                </span>
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="0"
                                    required />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <img height='32' alt=""/>
                                        &nbsp;&nbsp;&nbsp; mDAI
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
                        </form>
                        <button
                            type="submit"
                            className="btn btn-link btn-block btn-sm"
                            onClick={(event) => {
                            event.preventDefault()
                            }}>
                            UN-STAKE...
                        </button>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default index
