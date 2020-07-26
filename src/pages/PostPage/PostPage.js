import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useAuthorization from "../../hooks/useAuthorization";
import CriarComentario from "../../components/CriarComentario/CriarComentario";

import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { StyleListPosts, StyleListDetails, EstiloFeed } from "./styles";

function PostPage() {
  useAuthorization();

  useEffect(() => {
    getPostDetail();
  }, []);

  const token = localStorage.getItem("token");
  const pathParams = useParams();

  const [postDetail, setPostDetail] = useState({ comments: [] });
  const [condicao, setCondicao] = useState();

  const getPostDetail = () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}`,
        headers
      )
      .then((response) => {
        setPostDetail(response.data.post);
        setCondicao(1);
      })
      .catch((error) => {
    
      });
  };

  const voteComment = (id, decisao, userVoteDirection) => {
    let body;
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
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment/${id}/vote`,
        body,
        headers
      )
      .then((response) => {
        getPostDetail();
      })
      .catch((error) => {
      });
  };

  const votePost = (id, decisao, userVoteDirection) => {
    let body;
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
        getPostDetail();
      })
      .catch((error) => {
      });
  };

  const listComments = postDetail.comments.map((comment) => {
    return (
      <Paper elevation={3}>
        <StyleListPosts key={comment.id}>
          <h3>{comment.username}</h3>
          <div>{comment.text}</div>
          <StyleListDetails>
            <button
              onClick={() =>
                voteComment(comment.id, 1, comment.userVoteDirection)
              }
            >
              Curtir
            </button>
            <span>Votos:{comment.votesCount}</span>
            <button
              onClick={() =>
                voteComment(comment.id, -1, comment.userVoteDirection)
              }
            >
              Descurtir
            </button>
          </StyleListDetails>
        </StyleListPosts>
      </Paper>
    );
  });

  if (condicao === undefined) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <EstiloFeed>
        <CriarComentario getPostDetail={getPostDetail} />
        <h1>Detalhes do Post</h1>
        <h1>POST</h1>
        <Paper>
          <StyleListPosts>
            <h3>{postDetail.username}</h3>
            <div>{postDetail.text}</div>
            <div>
              <button
                onClick={() =>
                  votePost(postDetail.id, 1, postDetail.userVoteDirection)
                }
              >
                Curtir
              </button>
              <span>Votos:{postDetail.votesCount}</span>
              <button
                onClick={() =>
                  votePost(postDetail.id, -1, postDetail.userVoteDirection)
                }
              >
                Descurtir
              </button>
            </div>
            <div>Comentarios:{postDetail.commentsCount}</div>
          </StyleListPosts>
        </Paper>

        <h1>Comentarios</h1>
        <div>{listComments}</div>
      </EstiloFeed>
    );
  }
}

export default PostPage;
