
import React, { useState, useContext } from 'react'
import { useCallback } from 'react'
import axios from './axios'

const getLocalStorage = () => {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      return true
    } else {
      return false
    }
  }

const initialUserState =  Object.freeze({
    email: "",
    username: "",
    password: "",
    isLogin: getLocalStorage(),
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
        isModalOpen: true,
        type: "create"
    })
    
    const fetchPosts = useCallback(async () => {
        console.log("fetching...");
        setIsLoading(true);
        try {
            if (user.isLogin) {
                const response = await axios.get()
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

    const handleChange = (e) => {
        setUser({
            ...user,
            //Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("token/", {
            email: user.email,
            password: user.password
        });
            localStorage.setItem("access_token", response.data.access)
            localStorage.setItem("refresh_token", response.data.refresh)
            axios.defaults.headers['Authorization'] = 
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
            const response = await axios.get(`posts/?slug=${slug}`)
            const data = response.data
            console.log(data);
            setSinglePost(response.data);
            setIsLoading(false);
        } catch (error) {
            setError({isError: true, msg: "an error occured while fetching data"})
            setIsLoading(false);
        }
        
    }

    const createPost = async ({...data}) => {
        try {
            const response = await axios.post('admin/create/')
            setSinglePost(response.data);
            setIsLoading(false);
        } catch (error) {
            setError({isError: true, msg: "an error occured while fetching data"})
            setIsLoading(false);
        }
    }

    const editPost = async (id) => {
        try {
            
        } catch (error) {
            
        }
    }

    const deletePost = async (id) => {
        try {
            
        } catch (error) {
            
        }
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
        handleChange,
        handleSubmit,
        initialUserState,
        singlePost,
        fetchSinglePost,
        modalState,
        setModalState
      }}>
        {children}
        </AppContext.Provider>
    }
    // make sure use
    export const useGlobalContext = () => {
      return useContext(AppContext)
    }
    
    export { AppContext, AppProvider }