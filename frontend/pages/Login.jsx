import React from 'react';
import { BlurFade } from '../src/components/magicui/blur-fade.jsx';

function Login() {
  return (
    <div className='h-[100vh] bg-secondary/50 flex items-center justify-center'>
      <div className='w-full max-w-md'>
        <BlurFade duration={1} direction='down'>
          <div className='login-form rounded-lg px-6 py-6 bg-primary shadow-xl'>
            <p className='text-5xl font-medium text-center text-white mb-6'>Login</p>

            <form className='space-y-5'>
              {/* Username */}
              <div className='flex flex-col'>
                <label className='mb-1 text-white text-xl font-medium'>Username</label>
                <input
                  type='text'
                  placeholder='Enter your username'
                  name='username'
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
                  required
                  className='border bg-secondary border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>

              {/* Button */}
              <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition'
              >
                Login
              </button>
            </form>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}

export default Login;
