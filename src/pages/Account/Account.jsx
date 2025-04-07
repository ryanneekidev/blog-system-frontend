import { useAuth } from "../../components/AuthProvider"
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";

function Account() {
    const auth = useAuth();

    console.log(auth.user.posts)

    return (
        <>
            <div className="grid h-screen w-screen grid-rows-[2.5rem_1fr]">
                <div className="row-start-1 row-end-2 flex justify-between items-center px-[1rem] shadow-lg">
                    <p className="text-lg font-semibold"><Link to="/">Ze Blog</Link></p>
                    <p className="font-semibold text-sm">{auth.user.username}</p>
                </div>
                <div className="row-start-2 row-end-3 grid grid-cols-[10rem_1fr]">
                    <div className="col-start-1 col-end-2 flex flex-col bg-white shadow-lg border-t-gray-900">
                        <div className="px-[1rem] py-[0.25rem] flex items-center hover:underline hover:ml-[0.25rem] hover:bg-gray-100 transition-all">
                            <Link to='/'>Home</Link>
                        </div>
                        <div className="px-[1rem] py-[0.25rem] flex items-center hover:underline hover:ml-[0.25rem] hover:bg-gray-100 transition-all">
                            <Link to='/create'>Create</Link>
                        </div>
                        <div className="px-[1rem] py-[0.25rem] flex items-center hover:underline hover:ml-[0.25rem] hover:bg-gray-100 transition-all">
                            <Link to='/account'>Account</Link>
                        </div>
                    </div>
                    <div className="col-start-2 col-end-3 grid grid-rows-[3rem_1fr_3rem_1fr]">
                        <div className="row-start-1 row-end-2 p-[1rem] flex items-center">
                            <p className="text-xl font-semibold">My Account</p>
                            <button className="border-[2px] ml-[1rem] hover:bg-red-600 hover:text-white rounded-sm font-semibold px-[0.25rem] border-red-600 text-red-600 cursor-pointer transition-all" onClick={auth.logout}>Log Out</button>
                        </div>
                        <div className="flex flex-col row-start-2 row-end-3 px-[1rem] pt-[0.25rem]">
                            <p className="font-semibold mb-[0.25rem]">General information</p>
                            <div className="mb-[1rem]">
                                <div>
                                    <p>Username</p>
                                    <div className="bg-gray-100 min-w-fit max-w-[12rem] overflow-hidden px-[0.5rem] py-[0.075rem] rounded-sm border border-gray-300">{auth.user.username}</div>
                                </div>
                                <div>
                                    <p>Email</p>
                                    <div className="bg-gray-100 min-w-fit max-w-[12rem] overflow-hidden px-[0.5rem] py-[0.075rem] rounded-sm border border-gray-300">{auth.user.email}</div>
                                </div>
                                <div>
                                    <p>Joined</p>
                                    <div className="bg-gray-100 min-w-fit max-w-[12rem] overflow-x-hidden px-[0.5rem] py-[0.075rem] rounded-sm border border-gray-300">{auth.user.joinedAt}</div>
                                </div>
                            </div>
                            <p className="font-semibold mb-[0.25rem]">Administration</p>
                            <div className="">
                                <div>
                                    <p>Role</p>
                                    <div className="bg-gray-100 min-w-fit max-w-[12rem] overflow-hidden px-[0.5rem] py-[0.075rem] rounded-sm border border-gray-300">{auth.user.role}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row-start-3 row-end-4 p-[1rem]">
                            <p className="text-xl font-semibold mb-[0.25rem]">My Posts and Comments</p>
                        </div>
                        <div className="row-start-4 row-end-5 px-[1rem] flex flex-col gap-[1rem]">
                            <ul>
                                {
                                    auth.user.posts.map((post, index) =>
                                        <Card key={index} title={post.title} content={post.content} author={auth.user.username} createdAt={post.createdAt} />
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Account