import React from "react";
import { Card, Icon, Label } from "semantic-ui-react";

function PostBox({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) {
  return (
    <Card>
      <div class="ui cards">
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="https://semantic-ui.com/images/avatar2/large/molly.png"/>
            <div class="header">{username}</div>
            <div class="meta">{createdAt}</div>
            <div class="description">
             {body} 
            </div>
          </div>
          {/* <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">Approve</div>
              <div class="ui basic red button">Decline</div>
            </div>
          </div> */}
        </div>
      </div>
    </Card>
  );
}

export default PostBox;
