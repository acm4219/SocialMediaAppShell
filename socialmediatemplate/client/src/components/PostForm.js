import React from 'react'
import {Button, Form} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function PostForm() {
    const { values, onChange, onSubmit} = useForm(createPostCallback, {
        body: ''
    })
    
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables:values,
        update(proxy, result){
            const data = proxy.readQuery({
                query:  FETCH_POSTS_QUERY
            })
            // data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
                getPosts: [result.data.createPost, ...data.getPosts],
            }})
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost();
    }

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Post..."
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    error={error ? true : false}
                    />
                <Button disabled={!values.body.trim()} type="submit" color="red">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        </>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            likeCount
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

export default PostForm;
