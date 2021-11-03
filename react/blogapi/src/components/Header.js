import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Search } from '.'

function Header() {
    return (
        <NavContainer>
            <NavMenu>
                <CustomLink exact to="/" activeClassName="selected">
                    <span>HOME</span>
                </CustomLink>
                <CustomLink to="/about" activeClassName="selected">
                    <span>ABOUT</span>
                </CustomLink>
              
            </NavMenu>
            <CustomLink to="/register" activeClassName="selected">
                <span>REGISTER</span>
            </CustomLink>
            <CustomLink to="/login" activeClassName="selected">
                <span>LOGIN</span>
            </CustomLink>
            <CustomLink to="/logout">
                <span>LOGOUT</span>
            </CustomLink>
        </NavContainer>
    )
}

const NavContainer = styled.nav`
    height: 70px;
    background-color: var(--clr-black);
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
`

const CustomLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: var(--clr-white);
    cursor: pointer;
    img {
        height: 20px;
    }
    span {
        font-size: 13px;
        letter-spacing: 1.42px; 
        position: relative;
        &:after {
            content: "";
            height: 2px;
            background-color: var(--clr-white);
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
    }
    &:hover {
        span:after {
            transform: scale(1);
            opacity: 1;
        }
    }
`

export default Header
