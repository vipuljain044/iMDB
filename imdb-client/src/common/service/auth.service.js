import {useState, useCallback} from 'react';

const useAuthService = () => {
    const [user, setUser] = useState();

    const login = useCallback(async (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch('http://localhost:4000/accounts/authenticate', options);
        const result = await response.json();
        if(result.statusCode === 200){
            setUser(result.accountInfo)
        }

        return (result.statusCode === 200);
    }, [setUser])

    const signup = useCallback(async (data) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch('http://localhost:4000/accounts/register', options);
        const result = await response.json();
        return (result.statusCode === 200);
    }, [])

    const logout = useCallback(() => {
        setUser();
    }, [setUser])

    return {
        user,
        login,
        signup,
        logout,
    }
}

export default useAuthService;