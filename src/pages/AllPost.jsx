import React, {useState, useEffect } from 'react'
import appwriteService from '../appwrite/appwriteConfig.js'
import {PostCard, Container} from "../Components/index.js"

function AllPosts() {
    const [posts, setPosts] = useState([])
    // useEffect(() => {}, [])
    appwriteService.getAllPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    // console.log(posts);
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts