import React from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login () {
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        // console.log(user);
        navigate("/weather-details")

      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  
        
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="avatar items-center">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.freepik.com/free-icon/man_318-157500.jpg" />
            </div>
          </div>

          <h1 className="text-xl items-center font-bold leading-tight tracking-tight text-blue-500 md:text-2xl mt-3 mb-1">
            Welcome back Mr. Arthur
          </h1>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-blue-100 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <center>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-blue-500">
                Sign in to your account
              </h1>
              </center>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-500">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-blue-500">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>

                {error && <p className='error'>{error}</p>}
                
                <button type="submit" className="w-full text-blue-500 bg-primary-600 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

              </form>

              <div className="flex flex-col items-center justify-between mt-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-blue-500">
                  Use Below Credentials to Sign in
                </h3>

                <p className="text-sm font-medium text-gray-900 dark:text-blue-500 mt-3">
                  {/* Email : arthur@gmail.com
                  password : 123456 */}
                  <ul>
                    <li>Email : arthur@gmail.com</li>
                    <li>password : 123456</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Login;