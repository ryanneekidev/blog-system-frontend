import { useState } from "react"
import { useAuth } from "../../components/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
    const auth = useAuth();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [credentials, setCredentials] = useState({
        email: '',
        username: '',
        password: ''
    })

    function handleEmailChange(e) {
        const email = e.target.value;
        const isValid = e.target.checkValidity();
        setCredentials((prev) => ({ ...prev, email }))
        setIsEmailValid(isValid)
    }

    function handleUsernameChange(e) {
        const username = e.target.value;
        const isValid = e.target.checkValidity();
        setCredentials((prev) => ({ ...prev, username }))
        setIsUsernameValid(isValid)
    }

    function handlePasswordChange(e) {
        const password = e.target.value;
        const isValid = e.target.checkValidity();
        setCredentials((prev) => ({ ...prev, password }))
        setIsPasswordValid(isValid)
    }

    function submitData(e) {
        if (credentials.username !== '' && credentials.password !== '' && credentials.email !== '' && isEmailValid && isUsernameValid && isPasswordValid) {
            auth.register(credentials)
            return;
        }
        alert('Please provide valid credentials!')
    }

    return (
        <>
            <div className="container flex h-screen w-screen justify-center items-center">
                <div className="w-[24rem] h-[24rem] rounded-lg shadow-md inset-shadow-sm flex flex-col justify-between p-[1rem]">
                    <div className="h-full w-full grid grid-rows-[4rem_1fr_1fr_2rem]">
                        <div className="row-start-1 row-end-2 flex flex-col items-center mb-[1rem]">
                            <h1 className="text-lg font-semibold">Ze Blog</h1>
                            <h1 className="">Sign Up</h1>
                            <p>{isEmailValid}</p>
                            <p>{isUsernameValid}</p>
                            <p>{isPasswordValid}</p>
                        </div>
                        <div className="mb-[1rem] row-start-2 row-end-3 flex flex-col">
                            <label htmlFor='email' className="mb-[0.25rem]">Email</label>
                            <div className="flex flex-col">
                                <input className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-400 outline-none p-[0.125rem] transition-all invalid:border-red-500 focus:invalid:border-red-500 peer" type='email' id='email' autoComplete="off" name='email' placeholder='Email address' onChange={handleEmailChange}></input>
                                <p className='hidden peer-invalid:block text-red-400 text-xs mb-[0.25rem]'>Invalid email address</p>
                            </div>
                            <label htmlFor='username' className="mb-[0.25rem]">Username</label>
                            <div className="flex flex-col">
                                <input className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-400 outline-none p-[0.125rem] transition-all invalid:border-red-500 focus:invalid:border-red-500 peer" type='text' id='username' autoComplete="off" name='username' placeholder='Username' minLength={8} maxLength={16} onChange={handleUsernameChange}></input>
                                <p className='hidden peer-invalid:block text-red-400 text-xs mb-[0.25rem]'>Username must be between 8 and 16 characters long</p>
                            </div>
                            <label htmlFor='password' className="">Password</label>
                            <div className="flex flex-col">
                                <input className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-400 outline-none p-[0.125rem] transition-all invalid:border-red-500 focus:invalid:border-red-500 peer" type='password' id='password' name='password' placeholder='Password' minLength={8} maxLength={32} onChange={handlePasswordChange}></input>
                                <p className='hidden peer-invalid:block text-red-400 text-xs mb-[0.25rem]'>Password must be between 8 and 32 characters long</p>
                            </div>
                        </div>
                        <div className="row-start-3 row-end-4 flex justify-center items-center py-[0.5rem]">
                            {
                                auth.regError.code === 400 ? (
                                    <div className="bg-red-400 text-red-100 px-[0.5rem] py-[0.125rem] text-sm rounded-sm w-full h-full flex items-center">
                                        {auth.regError.message}
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                        <div className="row-start-4 row-end-5 flex flex-col">
                            <button className="bg-green-500 rounded-sm text-white p-[0.25rem] shadow-xs hover:inset-shadow-sm hover:inset-shadow-green-600 hover:shadow-sm hover:cursor-pointer transition-all" onClick={submitData}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login