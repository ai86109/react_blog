import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getPosts} from '../../WebAPI';
import {Link} from "react-router-dom";

const Root = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(12, 34, 56, 0.2);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.2);
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
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
}

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getPosts().then((posts) => setPosts(posts))
    setIsLoading(false)
  }, [posts])
  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Root>
  )
}