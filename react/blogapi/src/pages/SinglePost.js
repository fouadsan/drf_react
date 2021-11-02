import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from '../axios'
import { useParams } from 'react-router-dom'

function SinglePost() {
    const [isLoading, setIsLoading] = useState(false);
    const [singlePost, setSinglePost] = useState(null);

    const {slug} = useParams();

    const fetchSinglePost = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(slug)
            const data = response.data
            console.log(data);
            setSinglePost(response.data);
        } catch (error) {
            throw error;
        }
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchSinglePost();
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

    const {title, excerpt, content} = singlePost
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
