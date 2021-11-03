import React from 'react'
import { CustomLink } from './Header';

function NavAuthBtns({isLogin}) {
    if (isLogin) {
        return (
            <React.Fragment>
                <CustomLink to="/logout">
                    <span>LOGOUT</span>
                </CustomLink>
                <CustomLink to="/admin">
                    <span>ADMIN</span>
                </CustomLink>
            </React.Fragment>
        )
    }
    return (
    <React.Fragment>
        <CustomLink to="/register" activeClassName="selected">
            <span>REGISTER</span>
        </CustomLink>  
        <CustomLink to="/login" activeClassName="selected">
            <span>LOGIN</span>
        </CustomLink> 
    </React.Fragment>
    )
}

export default NavAuthBtns
