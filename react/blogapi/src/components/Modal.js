import React from 'react'
import styled from 'styled-components'

function Modal() {
    return (
        <Wrapper>
            <div className="modal">
                <form action="" className="form">
                    <div className="form-title title">
                        <h3>New Post</h3>
                        <div className="underline"></div>
                    </div>
                    <div className="form-control">
                        <input type="text"
                        className="form-input"
                        name="title"
                        autoComplete="title"
                        placeholder="title"
                        
                        required
                        />
                    </div>
                    <div className="form-control">
                        <select className="form-input">
                            <option selected value="0">category</option>
                            <option value="1">1</option>
                            <option value="1">2</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <input type="text"
                        className="form-input"
                        name="excerpt"
                        autoComplete="excerpt"
                        placeholder="excerpt"
                        
                        required
                        />
                    </div>
                    <div className="form-control">
                        <textarea 
                            className="form-input"
                            placeholder="Content"
                            
                        >
                            
                        </textarea>
                    </div>
                    <div className="submit-btn">
                        <button 
                            type="submit"
                            className="btn"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .2);
    z-index: 999;
    .modal {
        padding: 2rem;
        left: 25vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border: 2px solid grey;
        box-shadow: var(--dark-shadow);

        .submit-btn {
            display: flex;
            justify-content: center;
        }
    }
    
`

export default Modal
