import React, { useEffect } from 'react'
import axios from '../axios';
import { useHistory } from 'react-router-dom';

function Logout() {
    const history = useHistory();

	useEffect(() => {
		const response = axios.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axios.defaults.headers['Authorization'] = null;
		history.push('/login');
	});
	return <div>Logout</div>;
}

export default Logout
