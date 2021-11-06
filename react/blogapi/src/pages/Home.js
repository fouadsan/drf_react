import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { PostList } from '../components'

function Home() {
    const {isLoading, error, fetchPosts, user} = useGlobalContext();
    
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts, user])

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
        <main>
            <Wrapper className="page-100">
                <div>
                    <PostList />
                </div>  
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
`

export default Home