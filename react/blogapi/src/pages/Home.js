import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { posts_url as url } from '../utils/constants'
import { PostList } from '../components'

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async (url) => {
        setIsLoading(true);
        try {
            const response = await axios.get(url)
            const data = response.data
            if (data.length > 0) {
                setPosts(response.data);
                setError(false);
            } else {
                setError(true);
            }
            
        } catch (error) {
            setError(true);
            console.log("something went wrong");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPosts(url);
    },[])

    if (isLoading) {
        return <div className="loading"></div>
    }

    if (error) {
        return (
            <main className="page-100">
                <div className="section section-center">
                    <h3 className="text-center">Error...</h3>
                </div>
            </main>
        )
    }

    return (
        <main>
            <Wrapper className="page-100">
                <div>
                    <PostList posts={posts} />
                </div>  
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`

`

export default Home
