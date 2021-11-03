
import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from './axios'

const initialUserState =  Object.freeze({
    email: "",
    username: "",
    password: "",
    isLogin: false,
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
    
    const fetchPosts = useCallback(async () => {
        console.log("salam");
        setIsLoading(true);
        try {
            const response = await axios.get()
            const data = response.data
            console.log(data);
            if (data.length > 0) {
                setPosts(data);
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
    }, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            //Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts])

    return <AppContext.Provider value={{
        isLoading,
        posts,
        error,
        searchTerm,
        user,
        setUser,
        handleChange,
        initialUserState,
      }}>
        {children}
        </AppContext.Provider>
    }
    // make sure use
    export const useGlobalContext = () => {
      return useContext(AppContext)
    }
    
    export { AppContext, AppProvider }