import React, {useLayoutEffect, useState} from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import Header from '../Header/Header'
import PostPage from '../../pages/PostPage'
import NewPostPage from '../../pages/NewPostPage'
import PostListPage from '../../pages/PostListPage'
import About from '../../pages/AboutPage'
import { AuthContext } from '../../context';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Root = styled.div`
  padding-top: 64px;
`

function App() {
  const [user, setUser] = useState(null)
  //這邊也可以優化當真的有token的時候再call getMe & 閃一下的問題
  useLayoutEffect(() => {
    const token = getAuthToken() || null
    if(token) {
      getMe().then((response) => {
        if(response.ok) {
          setUser(response.data)
        }
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/post-list">
              <PostListPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  )
}

export default App;
