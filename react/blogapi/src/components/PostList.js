import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function PostList({posts}) {
    return (
        <Wrapper>
            {posts.map((post) => {
                const {id, title, excerpt, status} = post
                return (
                    <PostCard key={id}>
                        <CustomLink to={`posts/${id}`} >
                            {
                                title.length <= 15 ?
                                <h4 className="text-center">{title}</h4> :
                                <h4 className="text-center">
                                    {title.substr(0, 15)}...
                                </h4>
                            }
                        </CustomLink>
                        {
                            excerpt.length <= 30 ?
                            <p>{excerpt}</p> :
                            <p>{excerpt.substr(0, 30)}...</p>
                        }
                        <span className="text-center">{status}</span>
                    </PostCard>
                )   
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    gap: 3rem 1.5rem;
    grid-template-columns: auto auto auto;
    margin: 4rem 2rem;
    padding: 2rem;
    box-shadow: var(--dark-shadow);
`

const PostCard = styled.div`
    padding: 1rem;
    display: flex;
    height: 40vh;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--light-shadow);
    transition: var(--transition);
    p {
        padding: 1rem;
    }
    span {
        width: 100%;
        padding: 0.2rem 1rem;
        font-weight: 700;
        color: gray;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    &:hover {
        transform: scale(1.04);
    }
`

const CustomLink = styled(Link)`
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    padding: 1rem;
    cursor: pointer;
    h4 {
        color: var(--clr-grey-1);
    }
    &:hover {
        h4 {
            color: red;
        }
        
    }
`

export default PostList
