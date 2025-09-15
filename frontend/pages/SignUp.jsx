import React, { useEffect, useState } from 'react';
import { BlurFade } from '../src/components/magicui/blur-fade.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/getAuthStore.js';

function SignUp() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  useEffect(()=> {
    if(!error && useAuthStore.getState().user) {
      navigate('/login')
    }
  }, [error])

  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async(e) => {
    e.preventDefault();

    await signup({ username, email, password, address });
  }


  return (
    <div className='h-[100vh] bg-secondary/50 flex items-center justify-center'>
      
      <div className='signup-form rounded-lg w-full max-w-md px-6 py-6 bg-primary shadow-xl'>
        <BlurFade duration={0.50} direction='up'>
        <p className='text-5xl font-medium text-center text-white mb-6'>Sign-Up</p>
        </BlurFade>
        <BlurFade duration={1.15} direction='up'>
        <form className='space-y-5'>

          {/* Username */}
          <div className='flex flex-col'>
            <label className='mb-1 text-white text-xl font-medium'>Username</label>
            <input
              type='text'
              placeholder='Enter your username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='border bg-secondary border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Email */}
          <div className='flex flex-col'>
            <label className='mb-1 text-white text-xl font-medium'>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='border bg-secondary border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='flex flex-col'>
            <label className='mb-1 text-white text-xl font-medium'>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='border bg-secondary border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Address */}
          <div className='flex flex-col'>
            <label className='mb-1 text-white text-xl font-medium'>Address</label>
            <textarea
              rows='3'
              placeholder='Enter your address'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className='border bg-secondary border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Button */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition'
          >
            Sign Up
          </button>
          <p className='text-center text-md font-light text-white'>already have an account? click <Link className='font-bold' to={'/login'}>Login</Link></p>
        </form>
      </BlurFade>
      </div>
    </div>
  );
}

export default SignUp;
