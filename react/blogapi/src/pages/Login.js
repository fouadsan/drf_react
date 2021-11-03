import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import { useGlobalContext } from '../context'
import { useHistory } from 'react-router-dom'

function Login() {
    const { handleChange, handleSubmit, isLoading, error, setError } = useGlobalContext();
    const history = useHistory();

    useEffect(() => {
        setError({isError: false, msg: ""})
    }, [])

    if (isLoading) {
        return (
            <main className="page-100">
                <div className="loading"></div>
            </main>
        )  
    }

    if (error.isError) {
        return (
            <main className="page-100">
                <div className="section section-center">
                    <h3 className="text-center">{error.msg}</h3>
                </div>
            </main>
        )
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
                    <button className="btn" type="submit" onClick={async (e) => {
                        await handleSubmit(e)
                        history.push("/")
                    }}>
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
