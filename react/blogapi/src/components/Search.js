import React, { useState } from 'react'
import styled from 'styled-components'
import axios from '../axios'

function Search() {
    const [searchState, setSearchState] = useState({
        search_term: "",
        posts: []
    });

    const handleChange = (e) => {
        const value = e.target.value
        setSearchState({...searchState, search_term: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = 
            await axios.get(`search/?search=${searchState.search_term}`)
            const posts = response.data
            console.log(posts);
        } catch (error) { 
            console.log("something went wrong");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <input type="text" id="slug" name="slug"
                    placeholder="Search" onChange={handleChange}
                />
            </div>
        </form>
    )
}

export default Search
