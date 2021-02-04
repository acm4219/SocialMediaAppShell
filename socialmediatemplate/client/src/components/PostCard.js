import React, { useContext } from 'react'
import {Button,Card, Icon, Image, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import moment from 'moment';
import LikeButton from "./LikeButton"

import {AuthContext} from '../context/auth'

 function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes}}) {
   const { user } = useContext(AuthContext);
   
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
    
                <LikeButton post={{ id, likes, likeCount}}/>
                 <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                 <Button color='red' basic>
                    <Icon name='comments' />
                     
                 </Button>
                <Label as='a' basic color='red' pointing='left'>
                    {commentCount}
                </Label>
                 </Button>
                 {user && user.username === username && (
                     <Button as="div" color="red" 
                     floated="right"
                     onClick={() => console.log('Post Delete')}>
                         <Icon name="trash" style={{margin:0}}/>
                     </Button>
                 )}
                
            </Card.Content>
    </Card>
    )
}

export default PostCard
