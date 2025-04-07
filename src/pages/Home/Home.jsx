import { useAuth } from "../../components/AuthProvider"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card.jsx"

function Home() {
    const auth = useAuth();

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate()

    const getUsers = async () => {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.token
            }
        })
        const res = await response.json();
        console.log(res)
    }

    const getPosts = async () => {
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'GET',
        })
        const res = await response.json();
        setPosts(res)
        console.log(res)
    }

    const likePost = async (postId) => {
        if (auth.token !== '') {
            const response = await fetch("http://localhost:3000/api/posts/like", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userId=${auth.user.id}&postId=${postId}`
            })
            const res = await response.json()
            auth.user.like = res.updatedLikes;
            console.log(res)
            getPosts()
        } else {
            navigate('/login')
        }
    }

    const dislikePost = async (postId, likeId) => {
        if (auth.token !== '') {
            const response = await fetch("http://localhost:3000/api/posts/dislike", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userId=${auth.user.id}&postId=${postId}&likeId=${likeId}`
            })
            const res = await response.json()
            auth.user.like = res.updatedLikes;
            console.log(res)
            getPosts()
        } else {
            navigate('/login')
        }
    }

    const commentPost = (postId) => {
        if (auth.token !== '') {
            navigate(`/posts?postId=${postId}`)
        } else {
            navigate('/login')
        }
    }

    useEffect(() => { getPosts() }, [])

    console.log(auth.user)

    return (
        <>
            <div className="grid h-screen w-screen grid-rows-[2.5rem_1fr]">
                <div className="row-start-1 row-end-2 flex justify-between items-center px-[1rem] shadow-lg">
                    <p className="text-lg font-semibold"><Link to="/">Ze Blog</Link></p>
                    {
                        auth.token === '' ? (
                            <>
                                <div>
                                    <Link className="bg-white text-indigo-500 border-[2px] font-semibold px-[0.25rem] rounded-sm mr-[0.5rem] hover:px-[0.375rem] hover:bg-indigo-50 text-sm py-[0.125rem] transition-all" to='register'>Register</Link>
                                    <Link className="bg-green-500 text-white px-[0.5rem] py-[0.25rem] font-semibold text-sm rounded-sm hover:bg-green-600 transition-all" to='login'>Login</Link>
                                </div>
                            </>
                        ) : (
                            <Link to="/account" className="font-semibold text-sm">{auth.user.username}</Link>
                        )
                    }
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
                    <div className="col-start-2 col-end-3 grid grid-rows-[3rem_1fr]">
                        <div className="row-start-1 row-end-2 p-[1rem]">
                            <p className="text-xl font-semibold">Latest posts</p>
                        </div>
                        <div className="row-start-2 row-end-3 p-[1rem] grid grid-cols-[1fr_16rem]">
                            <div className="col-start-1 col-end-2 grid gap-y-[0.75rem] grid-rows-[1fr_1fr_1fr_1fr]">
                                {
                                    auth.user ? (
                                        posts.map((post, index) =>
                                            auth.user.like.some((like) => like.postId === post.id) ? (
                                                <Card key={index} title={post.title} content={post.content} author={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Liked" likes={post.likes} comments={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => dislikePost(post.id, auth.user.like.find((like) => like.postId === post.id).id)} />
                                            ) : (
                                                <Card key={index} title={post.title} content={post.content} author={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likes={post.likes} comments={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => likePost(post.id)} />
                                            )
                                        )
                                    ) : (
                                        posts.map((post, index) =>
                                            <Card key={index} title={post.title} content={post.content} author={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likes={post.likes} comments={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => likePost(post.id)} />
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home