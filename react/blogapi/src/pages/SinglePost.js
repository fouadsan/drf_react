import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'

function SinglePost() {
    const {isLoading, singlePost, fetchSinglePost} = useGlobalContext();

    const {slug} = useParams();
    
    useEffect(() => {
        fetchSinglePost(slug);
    }, [slug])

    if (isLoading) {
        return (
            <main className="page-100">
                <div className="loading"></div>
            </main>
            
        )
    }

    if (!singlePost) {
        return (
            <main className="page-100">
                <h2 className="section-title">
                    no post to display
                </h2>
            </main>
        )
    }

    const {title, excerpt, content} = singlePost[0]
    return (
        <main className="page-100">
           <div className="form-title title">
                <h3>Post Detail</h3>
                <div className="underline"></div>
            </div>
            <section className="section section-center">
                <h4>{title}</h4>
                <h5>{excerpt}</h5>
                <p>{content}</p>
            </section>
        </main>
    )
}

export default SinglePost
