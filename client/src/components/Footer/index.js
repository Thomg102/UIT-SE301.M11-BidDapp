/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { GitHub } from '@material-ui/icons';

export const index = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                    <p className="footer__text">BlockCommerce</p>
                    <a className="footer__text"> <GitHub/> Join with us</a>
            </div>
        </div>
    )
}

export default index;
