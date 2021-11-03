import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import { useGlobalContext } from '../context'

function Login() {
    const {user, setUser, initialUserState, handleChange} =
     useGlobalContext();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await axios.post("token/", {
            email: user.email,
            password: user.password
        });
            localStorage.setItem("access_token", response.data.access)
            localStorage.setItem("refresh_token", response.data.refresh)
            axios.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            setUser({...initialUserState, isLogin: true});
            history.push("/");
        } catch (error) { 
            console.log("something went wrong");
        }
        
    }

    return (
        <main className="page-100">
            <Wrapper>
                <form noValidate>
                    <div className="form-title title">
                        <h3>Sign In</h3>
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
                         Login
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
    form {
        width: 50%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        box-shadow: var(--dark-shadow);

        .form-title {
            padding: 1rem;
        }

        .form-control {
            min-width: 100%;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
            
            }

            input {
                padding: 0.5rem 0;
                width: 60%;
                border: 2px solid var(--clr-primary-5);
                border-radius: 10px;
                background-color: rgba(0, 0, 0, .1);
            }
        }

        button {
            margin-top: 1rem;
            padding: 1rem 2rem;
        }
    }
`

export default Login
