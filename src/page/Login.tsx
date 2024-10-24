import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [formState, setFormState] = useState<{
        username: string;
        password: string;
        error: string | null;
    }>({
        username: '',
        password: '',
        error: null,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                username: formState.username,
                password: formState.password,
            });
    
            localStorage.setItem('token', response.data.token);
    
            console.log('Login successful:', response.data);
            setFormState((prev) => ({ ...prev, error: 'Login successfull' }));
    
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err) && err.response) {
                setFormState((prev) => ({ ...prev, error: err.response?.data.message || 'Login failed' }));
            } else {
                setFormState((prev) => ({ ...prev, error: 'An unknown error occurred' }));
            }
        }
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value })); 
    };

    return (
        <div id="login-page-container" className="w-screen h-screen flex justify-center items-center bg-slate-400">
            <div id="form-container" className="w-[30%] h-[30%] bg-white flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center w-[100%] h-[100%] p-5">
                    <h1 className="text-center">Login</h1>
                    {formState.error && <p className="text-red-500 text-center">{formState.error}</p>}
                    <div id="username-input-container" className="flex flex-col text-start">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formState.username} 
                            onChange={handleChange} 
                            className="border" 
                        />
                    </div>
                    <div id="password-input-container" className="flex flex-col text-start">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formState.password} 
                            onChange={handleChange} 
                            className="border" 
                        />
                    </div>
                    <div id="submit-button-container" className="flex justify-center">
                        <button type="submit" className="bg-blue-600 text-white w-[100px] p-2">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
