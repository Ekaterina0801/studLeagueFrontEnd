import { useState, useEffect } from 'react';
import { getUsers } from '../api/apiUsers';

const useUsers = (filters = {}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); 
            setError(null);
            
            try {
                const fetchedUsers = await getUsers(filters); 
                setUsers(fetchedUsers); 
            } catch (err) {
                setError(err); 
            } finally {
                setLoading(false); 
            }
        };

        fetchUsers(); 
    }, [filters]); 

    return { users, loading, error };
};

export default useUsers;
