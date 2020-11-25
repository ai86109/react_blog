import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getPost} from '../../WebAPI';
import {useParams} from "react-router-dom";

const Root = styled.div`
  max-width: 800px;
  margin: 64px auto;
`

const PostContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(12, 34, 56, 0.2);
  padding: 20px;
`

const PostTitle = styled.div`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.2);
`

const PostBody = styled.div`
  
`

const Loading = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 36px;
`

function Post({post}) {
  return (
    <PostContainer>
      <PostHead>
        <PostTitle>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </PostHead>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  )
}

export default function PostPage() {
  const [post, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let {id} = useParams()
  useEffect(() => {
    getPost(id).then(data => {
      setPost(data)
    })
    setIsLoading(false)
  }, [id])
  
  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {post.map((data, id) => (
        <Post key={id} post={data}/>
      ))}
    </Root>
  )
}