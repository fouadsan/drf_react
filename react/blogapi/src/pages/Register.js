import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from '../axios'

function Register() {
    const initialFormData = Object.freeze({
        email: "",
        username: "",
        password: ""
    });
    const [formData, setFormData] = useState(initialFormData);

    const history = useHistory();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            //Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post("user/register/", {
            email: formData.email,
            user_name: formData.username,
            password: formData.password
        });
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
                <form noValidate>
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
                        <input type="test"
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

export default Register