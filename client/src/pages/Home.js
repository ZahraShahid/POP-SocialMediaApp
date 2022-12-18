import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import PostBox from "../components/PostBox";

function Home() {
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  
//   if (loading) return "Loading...";

  //   if (data) {
  //     console.log(data);
  //     const { getPosts: posts } = data;
  //   }
  // const { getPosts: posts } = data;

  return (
    <Grid colums={3}>
      <Grid.Row>
        <h3>Recent Posts</h3>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h5>loading posts..</h5>
        ) : (
          posts &&
          posts.map((p) => {
            <Grid.Column key={p.id}>
              <PostBox post={p} />;
            </Grid.Column>;
          })
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
