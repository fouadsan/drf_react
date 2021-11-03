import React, { useEffect } from 'react'
import axios from '../axios';
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context'

function Logout() {
    const history = useHistory();
	const {user, setUser} = useGlobalContext();

	const singout = async () => {
		try {
			const response = await axios.post('user/logout/blacklist/', {
				refresh_token: localStorage.getItem('refresh_token'),
			});
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			axios.defaults.headers['Authorization'] = null;
			setUser({...user, isLogin: false})
			history.push('/login');
			console.log("logged out");
		} catch (error) {
			console.log("Something went wrong");
		}
	}

	useEffect(() => {
		singout();
	}, [user]);
	return <div>Logout</div>;
}

export default Logout
