import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import { useGlobalContext } from '../context'

function Register() {
    const {user, setUser, initialUserState, handleChange} =
     useGlobalContext();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await axios.post("user/register/", {
            email: user.email,
            user_name: user.username,
            password: user.password
        });
            setUser(initialUserState);
            history.push("/login");
            console.log(response.data);
            console.log("User has been created successfully, You can now login");
        } catch (error) { 
            console.log("something went wrong");
        }
        
    }

    return (
        <main className="page-100">
            <Wrapper>
                <form className="form" noValidate>
                    <div className="form-title title">
                        <h3>Sign up</h3>
                        <div className="underline"></div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">
                            <h4>Email:</h4>
                        </label>
                        <input type="email"
                         className="form-input"
                         id="email"
                         name="email"
                         autoComplete="email"
                         onChange={handleChange}
                         required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="username">
                            <h4>Username: </h4>
                        </label>
                        <input type="text"
                         className="form-input"
                         name="username"
                         autoComplete="username"
                         onChange={handleChange}
                         required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">
                            <h4>Password:</h4>
                        </label>
                        <input type="password"
                         className="form-input"
                         id="password"
                         name="password"
                         autoComplete="current-password"
                         onChange={handleChange}
                         required
                        />
                    </div>
                    <button className="btn" type="submit" onClick={handleSubmit}>
                         Sign Up
                    </button>
                </form>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
   
    button {
        margin-top: 1rem;
        padding: 1rem 2rem;
    }
`

export default Register