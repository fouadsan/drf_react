import React, { useState, useContext } from 'react'
import { useCallback } from 'react'
import axiosInstance from './axios'
import { useHistory } from 'react-router-dom'

const getLocalStorage = () => {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      return true
    } else {
      return false
    }
  }

const initialUserState =  Object.freeze({
    id: null,
    email: "",
    username: "",
    password: "",
    isLogin: getLocalStorage(),
});

const initialFormData = ({
    title: "",
    category: 1,
    slug: "",
    excerpt: "",
    content: "",
});

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        "isError": false,
        "msg": "",
    })
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(initialUserState);
    const [singlePost, setSinglePost] = useState(null);
    const [modalState, setModalState] = useState({
        isModalOpen: false,
        type: ""
    })
    const [newData, setNewData] = useState(initialFormData);
    const [postImage, setPostImage] = useState(null);
    
    const history = useHistory();

    const fetchPosts = useCallback(async () => {
        console.log("fetching...");
        setIsLoading(true);
        try {
            if (user.isLogin) {
                const response = await axiosInstance.get()
                const data = response.data
                if (data.length > 0) {
                    setPosts(data);
                    // console.log(posts);
                    setError({isError: false, msg: ""});
                } else {
                    setError({isError: true, msg: "No Data Found"});
                }
            } else {
                setError({isError: true, msg: "You must login first to see the posts"})
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError({isError: true, msg: "something went wrong"});
            console.log("something went wrong");
        }
    }, [user]);



    const submitAuth = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("token/", {
            email: user.email,
            password: user.password
        });
            localStorage.setItem("access_token", response.data.access)
            localStorage.setItem("refresh_token", response.data.refresh)
            axiosInstance.defaults.headers['Authorization'] = 
                'JWT ' + localStorage.getItem('access_token');
            setUser({...initialUserState, isLogin: true});
            setError({isError: false, msg: ""});
        } catch (err) {
            setError({isError: true, msg: "Oops, somthing went wrong"}) 
            console.log(err);
        }
        setIsLoading(false);
    }

    const fetchSinglePost = async (slug) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get(`posts/?slug=${slug}`)
            const data = response.data
            console.log(data);
            setSinglePost(response.data);
            setIsLoading(false);
        } catch (error) {
            setError({isError: true, msg: "an error occured while fetching data"})
            setIsLoading(false);
        }
        
    }

    const createPost = async () => {
        let formData = new FormData();
		formData.append('title', newData.title);
		formData.append('slug', newData.slug);
		formData.append('author', 1);
		formData.append('excerpt', newData.excerpt);
		formData.append('content', newData.content);
		formData.append('image', postImage.image[0]);
         try {
            await axiosInstance.post(`admin/create/`, formData);
            setPosts([...posts, formData])
            setNewData(initialFormData)
            setModalState({isModalOpen: false, type: ""})
            setIsLoading(false);
            history.push({
			pathname: '/admin/',
		});
        } catch (error) {
            setError({isError: true, msg: "an error occured while sending data"})
            setIsLoading(false);
        }
    }

    const editPost = async () => {
        const data = {author: 1, ...newData}
        try {
            await axiosInstance.put(`admin/edit/${data.id}/`, data)
            setNewData(initialFormData)
            setModalState({isModalOpen: false, type: ""})
            console.log(data);
            setIsLoading(false);
        } catch (error) {
            setError({isError: true, msg: "an error occured while sending data"})
            setIsLoading(false);
        }
    }

    const deletePost = async (id) => {
        setIsLoading(true);
        try {
            await axiosInstance.delete(`admin/delete/${id}/`)
            const newPosts = posts.filter((item) => {
                return item.id !== id
            })
            console.log(newPosts);
            setPosts(newPosts);
            setIsLoading(false);
        } catch (error) {
            setError({isError: true, msg: "an error occured while sending data"})
        }
        setIsLoading(false);
    }

    return <AppContext.Provider value={{
        isLoading,
        setIsLoading,
        posts,
        fetchPosts,
        error,
        setError,
        searchTerm,
        user,
        setUser,
        submitAuth,
        initialUserState,
        singlePost,
        fetchSinglePost,
        modalState,
        setModalState,
        newData,
        setNewData,
        editPost,
        createPost,
        deletePost,
        postImage,
        setPostImage
      }}>
        {children}
        </AppContext.Provider>
    }
    // make sure use
    export const useGlobalContext = () => {
      return useContext(AppContext)
    }
    
    export { AppContext, AppProvider }