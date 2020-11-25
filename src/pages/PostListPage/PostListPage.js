import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getPosts, getPostsList} from '../../WebAPI';
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

const PageBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const Home = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: "<<";
  }
`

const PageUp = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: "<";
  }
`

const PageDown = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: ">";
  }
`

const End = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: ">>";
  }
`

const PageNumber = styled.div``

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

function Page({page, setPage, totalPages}) {
  return (
    <PageBlock>
      <Home onClick={() => changePage('home', page, setPage, totalPages)} />
      <PageUp onClick={() => changePage('pageup', page, setPage, totalPages)} />
      <PageNumber>{page} / {totalPages}</PageNumber>
      <PageDown onClick={() => changePage('pagedown', page, setPage, totalPages)} />
      <End onClick={() => changePage('end', page, setPage, totalPages)} />
    </PageBlock>
  )
}

function changePage(target, page, setPage, totalPages) {
  if(target === 'home') {
    setPage(1)
  } else if(target === 'end') {
    setPage(totalPages)
  } else if(target === 'pageup' && page > 1) {
    setPage(page - 1)
  } else if(target === 'pagedown' && page < totalPages) {
    setPage(page + 1)
  }
}

export default function PostListPage() {
  const [posts, setPosts] = useState([])
  const [postNumber, setPostNumber] = useState(1)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const postPerPage = 5
  let totalPages = Math.ceil(postNumber / postPerPage )

  useEffect(() => {
    getPosts().then((data) => setPostNumber(data.length))
    getPostsList(postPerPage, page).then((posts) => setPosts(posts))
    setIsLoading(false)
  }, [page])

  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {!isLoading && <Page page={page} setPage={setPage} totalPages={totalPages} />}
    </Root>
  )
}