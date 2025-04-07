function Card(props) {
    return (
        <>
            {
                (props.postStatus === 'ADMIN') ?
                    <div className="rounded-sm shadow-sm px-[0.5rem] py-[0.25rem] bg-amber-400 flex flex-col">
                        <p className="text-md font-semibold">{props.title}</p>
                        <p className="text-xs text-gray-600">By {props.author} at {props.createdAt}</p>
                        <p>{props.content}</p>
                        <div className="self-end flex">
                            <button onClick={props.commentAction} className="bg-green-600 text-green-100 px-[0.25rem] rounded-sm cursor-pointer hover:bg-green-500 mr-[0.25rem] transition-all">{props.commentText} <span className="text-green-200">{props.comments}</span></button>
                            <button onClick={props.likeAction} className="bg-pink-600 text-pink-100 px-[0.25rem] rounded-sm cursor-pointer hover:bg-pink-500 transition-all">{props.likeText} <span className="text-pink-200">{props.likes}</span></button>
                        </div>
                    </div>
                    :
                    <div className="rounded-sm shadow-sm px-[0.5rem] py-[0.25rem] flex flex-col">
                        <p className="text-md font-semibold">{props.title}</p>
                        <p className="text-xs text-gray-600">By {props.author} at {props.createdAt}</p>
                        <p>{props.content}</p>
                        <div className="self-end flex">
                            <button onClick={props.commentAction} className="bg-green-600 text-green-100 px-[0.25rem] rounded-sm cursor-pointer hover:bg-green-500 mr-[0.25rem] transition-all">{props.commentText} <span className="text-green-200">{props.comments}</span></button>
                            <button onClick={props.likeAction} className="bg-pink-600 text-pink-100 px-[0.25rem] rounded-sm cursor-pointer hover:bg-pink-500 transition-all">{props.likeText} <span className="text-pink-200">{props.likes}</span></button>
                        </div>
                    </div>
            }

        </>
    )
}

export default Card