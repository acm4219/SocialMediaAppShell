import React, { useContext } from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import { Card, Grid, Button, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

 function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext)
    console.log(postId);

    const { data : { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback(){
        props.history.push('/')
    }

    let postMarkup;

    if(!getPost){
        postMarkup = <p>Loading Post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;

        postMarkup= (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image 
                    src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554__340.png'
                    size="small"
                    float="right"
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes}} />
                                <Button labelPosition='right' onClick={() => console.log('Comment on post')}>
                                 <Button color='red' basic>
                                   <Icon name='comments' />
                                </Button>
                                    <Label basic color='red' pointing='left'>
                                    {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }

`

export default SinglePost
