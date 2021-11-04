import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'

function Modal({type}) {
    function slugify(string) {
		const a =
			'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
		const b =
			'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
		const p = new RegExp(a.split('').join('|'), 'g');

		return string
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
			.replace(/&/g, '-and-') // Replace & with 'and'
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

    const {newData ,setNewData, createPost, editPost} = useGlobalContext();


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if ([name] == 'title') {
            setNewData({
                ...newData,
                [name]: value,
                ['slug']: slugify(value.trim())
            })
        } else if ([name] == 'category') {
            setNewData({
                ...newData,
                ['category']: parseInt(value),
            })
        } else {
            setNewData({
                ...newData,
                [name]: value,
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        type === "create" ? createPost() : editPost()
    }

    return (
        <Wrapper>
            <div className="modal">
                <form className="form" noValidate>
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
                        value={newData.title}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className="form-control">
                        <select className="form-input"
                            name="category"
                            value={newData.category}
                            onChange={handleChange}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <input type="text"
                            className="form-input"
                            name="slug"
                            autoComplete="slug"
                            placeholder="slug"
                            value={newData.slug}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <input type="text"
                            className="form-input"
                            name="excerpt"
                            autoComplete="excerpt"
                            placeholder="excerpt"
                            value={newData.excerpt}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <textarea 
                            className="form-input"
                            placeholder="Content"
                            name = "content"
                            value={newData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="submit-btn">
                        <button 
                            type="submit"
                            className="btn"
                            onClick={handleSubmit}
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
