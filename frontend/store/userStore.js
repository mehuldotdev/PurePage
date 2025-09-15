import {create} from 'zustand';


export const useUserStore = create((set)=> ({

    user: null,
    loading: false,
    error: null,

    fetchUser: async(token)=> {
        try {
            set({loading: true, error: null});

            const res = await fetch('http://localhost:8001/api/auth/details', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, 
                }
            })

            if(!res.ok){
                throw new Error('Failed to fetch user')
            }

            localStorage.setItem('token', data.token);

            const data = await res.json()
            set({user: data, loading: false})

        } catch (error) {
            set({error: error.message, loading: false})
        }
    }

}))