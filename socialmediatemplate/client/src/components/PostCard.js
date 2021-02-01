import React from 'react'
import {Button,Card, Icon, Image, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import moment from 'moment';

 function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes}}) {
   function likePost(){
    console.log('Post Liked')

   }
   function commentOnPost(){
       console.log("Comment on post")
   }
    return (
        <Card fluid>
            <Card.Content>
                 <Image
                 floated='right'
                 size='mini'
                 src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554__340.png'
                 />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                 {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button as='div' labelPosition='right' onClick={likePost}>
                 <Button color='blue' basic>
                    <Icon name='heart' />
                     
                 </Button>
                <Label as='a' basic color='blue' pointing='left'>
                    {likeCount}
                </Label>
                 </Button>
                 <Button as='div' labelPosition='right' onClick={commentOnPost}>
                 <Button color='red' basic>
                    <Icon name='comments' />
                     
                 </Button>
                <Label as='a' basic color='red' pointing='left'>
                    {commentCount}
                </Label>
                 </Button>
                </div>
            </Card.Content>
    </Card>
    )
}

export default PostCard
