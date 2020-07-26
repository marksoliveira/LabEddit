import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization";
import CriarPost from "../../components/CriarPost/CriarPost";

import Paper from "@material-ui/core/Paper";
import { EstiloFeed, StyleListPosts, StyleListDetails } from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

let body;

function FeedPage() {
  useAuthorization();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [condicao, setCondicao] = useState();

  let history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts",
        headers
      )
      .then((response) => {
        setPosts(response.data.posts);
        setCondicao(1);
      })
      .catch((error) => {
        
      });
  };

  const votePost = (id, decisao, userVoteDirection) => {
    if (userVoteDirection === decisao) {
      body = {
        direction: 0,
      };
    } else {
      body = {
        direction: decisao,
      };
    }

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`,
        body,
        headers
      )
      .then((response) => {
        getPosts();
        
      })
      .catch((error) => {
       
      });
  };

  const goToPostPage = (idPost) => {
    history.push(`/post/${idPost}`);
  };

  const listPosts = posts.map((post) => {
    return (
      <Paper elevation={3}>
        <StyleListPosts>
          <h3>{post.username}</h3>
          <div>{post.text}</div>
          <StyleListDetails>
            <div>
              <button
                onClick={() => votePost(post.id, 1, post.userVoteDirection)}
              >
                Curtir
              </button>
            </div>
            <div>{post.votesCount}</div>
            <div>
              <button
                onClick={() => votePost(post.id, -1, post.userVoteDirection)}
              >
                Descurtir
              </button>
            </div>

            <div>
              {post.commentsCount} - Comentários
              <span>
                <button onClick={() => goToPostPage(post.id)}>Detalhes</button>
              </span>
            </div>
          </StyleListDetails>
        </StyleListPosts>
      </Paper>
    );
  });

  if (condicao === undefined) {
    return (
      <EstiloFeed>
        <CircularProgress />
      </EstiloFeed>
    );
  } else {
    return (
      <div>
        <EstiloFeed>
          <h1>Feed</h1>
          <CriarPost getPosts={getPosts} />
          <hr></hr>
          <div>{listPosts}</div>
        </EstiloFeed>
      </div>
    );
  }
}

export default FeedPage;
