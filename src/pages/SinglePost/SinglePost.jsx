import { useAuth } from "../../components/AuthProvider"
import { createPath, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SinglePost() {
    const auth = useAuth();

    const navigate = useNavigate();

    const [comment, setComment] = useState("");

    const [post, setPost] = useState();

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }
    const [queryParams] = useSearchParams()

    const createComment = async () => {
        if (comment !== "") {
            const response = await fetch('http://localhost:3000/api/comment', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `content=${comment}&authorId=${auth.user.id}&postId=${queryParams.get("postId")}`
            })
            const res = await response.json();
            console.log(res.message)
            navigate('/');
            return;
        }
        alert("Please fill out all required fields!")
    }

    const getPost = async () => {
        console.log("getting post")
        const response = await fetch('http://localhost:3000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `postId=${queryParams.get("postId")}`
        })
        const res = await response.json();
        console.log(res.post);
        setPost(res.post);
        console.log(post)
    }

    useEffect(() => { getPost() }, [])

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
                        <p className="text-lg font-semibold">Comment on this post</p>
                        <label htmlFor="content">Your comment*</label>
                        <textarea id="content" name="content" placeholder="Your post..." onChange={handleCommentChange} className="rounded-sm border border-solid border-gray-300 shadow-xs px-[0.5rem] focus:shadow-sm focus:border-gray-500 outline-none p-[0.125rem] mb-[1rem] transition-all" required={true}></textarea>
                        <p className="text-xs">All fields marked by an asterisk (*) are required</p>
                        <button onClick={createComment} className="bg-blue-400 text-white py-[0.125rem] px-[0.75rem] rounded-md shadow-xs hover:bg-blue-500 hover:shadow-sm hover: cursor-pointer transition-all self-end resizeable">Post</button>
                        <p className="text-lg font-semibold">Comments</p>
                        {
                            post ? (
                                post.comments.map(comment => {
                                    <div>
                                        <p>{comment.author.username}</p>
                                        <p>{comment.content}</p>
                                    </div>
                                })
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost