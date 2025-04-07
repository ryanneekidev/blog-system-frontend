import { useAuth } from "../../components/AuthProvider"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const auth = useAuth();

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        postStatus: 'NORMAL'
    });

    const handleTitleChange = (e) => {
        let title = e.target.value;
        setPost((prev) => ({ ...prev, title }))
    }

    const handleContentChange = (e) => {
        let content = e.target.value;
        setPost((prev) => ({ ...prev, content }))
    }

    const handlePostStatusChange = (e) => {
        let postStatusBool = e.target.checked;
        let postStatus = "NORMAL";
        if (postStatusBool === true) {
            postStatus = "ADMIN"
        } else {
            postStatus = "NORMAL"
        }
        setPost((prev) => ({ ...prev, postStatus }))
    }

    const createPost = async () => {
        if (post.title !== "" && post.content !== "") {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `title=${post.title}&content=${post.content}&authorId=${auth.user.id}&postStatus=${post.postStatus}`
            })
            const res = await response.json();
            console.log(res.message)
            navigate('/');
            return;
        }
        alert("Please fill out all required fields!")
    }

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
                    <div className="col-start-2 col-end-2 p-[1rem] flex flex-col">
                        <p className="text-lg font-semibold">Create a new post</p>
                        <label htmlFor="title">Post title*</label>
                        <input type="text" id="title" name="title" placeholder="Your post's title" onChange={handleTitleChange} className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-500 outline-none p-[0.125rem] mb-[1rem] transition-all" required={true}></input>
                        <label htmlFor="content">Post content*</label>
                        <textarea id="content" name="content" placeholder="Your post..." onChange={handleContentChange} className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-500 outline-none p-[0.125rem] mb-[1rem] transition-all" required={true}></textarea>
                        {
                            auth.user.role === "ADMIN" ? (
                                <>
                                    <label htmlFor="content">Admin Post?</label>
                                    <input type='checkbox' id="post-status" name="post-status" onChange={handlePostStatusChange} className="self-start mb-[1rem]" />
                                </>
                            ) : (
                                <></>
                            )

                        }
                        <p className="text-xs">All fields marked by an asterisk (*) are required</p>
                        <button onClick={createPost} className="bg-blue-400 text-white py-[0.125rem] px-[0.75rem] rounded-md shadow-xs hover:bg-blue-500 hover:shadow-sm hover: cursor-pointer transition-all self-end resizeable">Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create