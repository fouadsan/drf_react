import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import { PostList } from '../components'

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(
        {
            "isError": false,
            "msg": "",
        }
    );
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get()
            const data = response.data
            console.log(data);
            if (data.length > 0) {
                setPosts(response.data);
                console.log(posts);
                setError({isError: false, msg: ""});
            } else {
                setError({isError: true, msg: "No Data Found"});
            }
            
        } catch (error) {
            setError({isError: true, msg: "something went wrong"});
            console.log("something went wrong");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    if (isLoading) {
        return <div className="loading"></div>
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
