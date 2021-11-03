import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context'
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function Admin() {
    const {isLoading, error, posts, fetchPosts, user} =
     useGlobalContext();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts, user])

    if (isLoading) {
        <main className="page-100">
            <div className="loading"></div>
        </main>
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
            <Wrapper className="section">
                    {posts.map((post) => {
                        const {id, title, excerpt, slug, status} = post
                        return (
                            <ListView key={id}>
                                <div className="info">
                                    <p>{id}</p>
                                    {
                                        title.length <= 15 ?
                                        <p>{title}</p> :
                                        <h5>
                                            {title.substr(0, 15)}...
                                        </h5>
                                    }
                                    {
                                        excerpt.length <= 30 ?
                                        <p>{excerpt}</p> :
                                        <p>{excerpt.substr(0, 30)}...</p>
                                    }
                                </div>
                                
                                <div className="action">
                                    <button className="btn"><FaPen /></button>
                                    <button className="btn"><FaTrash /></button>
                                </div>
                            </ListView>
                        )
                    })}
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    min-height: 500px;
    justify-content: space-evenly;
    box-shadow: var(--dark-shadow);
`

const ListView = styled.div`
    padding: 2rem;
    width: 100%;
    display: flex;
    box-shadow: var(--light-shadow);

    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
    }

    .action {
        padding: 1rem;
        display: flex;

        .btn {
            margin-left: 0.2rem;
        }
        svg {
            width: 1rem;
            height: 1rem;
        }
    }
   
`

export default Admin
