import { useState } from "react"
import { useAuth } from "../../components/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
    const auth = useAuth();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    function handleUsernameChange(e) {
        const username = e.target.value;
        setCredentials((prev) => ({ ...prev, username }))
    }

    function handlePasswordChange(e) {
        const password = e.target.value;
        setCredentials((prev) => ({ ...prev, password }))
    }

    function submitData(e) {
        if (credentials.username !== '' && credentials.password !== '') {
            auth.login(credentials)
            return;
        }
        alert('Please provide valid credentials!')
    }

    return (
        <>
            <div className="container flex h-screen w-screen justify-center items-center">
                <div className="w-[24rem] h-[20rem] rounded-lg shadow-md inset-shadow-sm flex flex-col justify-between p-[1rem]">
                    <div className="grid grid-rows-[4rem_1fr_1fr_2rem] h-full w-full">
                        <div className="row-start-1 row-end-2 flex flex-col items-center mb-[1rem]">
                            <h1 className="text-lg font-semibold">Ze Blog</h1>
                            <h1 className="">Login</h1>
                        </div>
                        <div className="row-start-2 row-end-3 flex flex-col">
                            <label htmlFor='username' className="mb-[0.25rem]">Username</label>
                            <input className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-500 outline-none p-[0.125rem] mb-[0.5rem] transition-all" type='text' id='username' name='username' placeholder='Username' onChange={handleUsernameChange}></input>
                            <label htmlFor='password' className="mb-[0.25rem]">Password</label>
                            <input className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-500 outline-none p-[0.125rem] transition-all" type='password' id='password' name='password' placeholder='Password' onChange={handlePasswordChange}></input>
                            <p className="text-sm">Don't have an account? <Link className="text-blue-500 hover:underline" to='/register'>Sign Up</Link></p>
                        </div>
                        <div className="row-start-3 row-end-4 flex justify-center items-center py-[0.5rem]">
                            {
                                auth.logError.code === 400 ? (
                                    <div className="bg-red-400 text-red-100 px-[0.5rem] py-[0.125rem] text-sm rounded-sm w-full h-full flex items-center">
                                        <p>{auth.logError.message}</p>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                        <div className="row-start-4 row-end-5 flex flex-col">
                            <button className="bg-green-500 rounded-sm text-white p-[0.25rem] shadow-xs hover:bg-green-600 hover:shadow-sm hover:cursor-pointer transition-all" onClick={submitData}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login