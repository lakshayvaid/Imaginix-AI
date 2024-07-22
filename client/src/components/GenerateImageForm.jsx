import React from 'react'
import styled from 'styled-components'
import Button from './button'
import TextInput from './TextInput';
import { AutoAwesome , CreateRounded } from '@mui/icons-material';
import { GenerateAIImage } from '../api/index.js';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";


//styled components
const Form = styled.div`
  flex: 1;
  padding: 16px 17px;
  display: flex;
  flex-direction: column;
  gap: 7.3%;
  justify-content: center;
  // align-items:center
  
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  gap: 20px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex-direction:row;
  flex: 1;
  gap: 9px;
`;


//Main Component

const navigate=useNavigate();
const[error,setError]=useState("");

const GenerateImageForm = (
  {
    post,
    setPost,
     createPostLoading,
      setCreatePostLoading,
       generateImageLoading, 
       setGenerateImageLoading,
  }
) => {

  const generateImageFun =async ()=>{
    setGenerateImageLoading(true);
    
     await GenerateAIImage({prompt:post.prompt}).then((res)=>{
      setPost({...post,photo:`data:image/jpge;base64,${res?.data?.photo}`})
      setGenerateImageLoading(false);
     }).catch((error)=>{
           console.log(error);
           setGenerateImageLoading(false);
     });
     
  };

  const createPostFun =async()=>{
    setCreatePostLoading(true);
    setError("");
    await createPostFun(post)
      .then((res) => {
        navigate("/");
        setCreatePostLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
  };
  return (
   <Form>
    <Top>
        <Title>Generate image with prompt</Title>
        <Desc>Write your prompt according to the image you want to generate</Desc>
    </Top>
    <Body>
      <TextInput 
      label="Author"
      placeholder="Enter your name " name="name"
      value={post.name}
      handelChange={(e)=>setPost({...post,name:e.target.value})}
      />

<TextInput 
      label="Prompt"
      placeholder=" Write a detailed prompt about the image you want to create" name="prompt"
      rows="8"
      textArea
      value={post.prompt}
      handelChange={(e)=>setPost({...post,prompt: e.target.value})}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}
      ** You can post the AI generated image to the Community **
    </Body>

    <Actions>
      
        <Button text="Generate Image" 
        flex leftIcon={<AutoAwesome/>}
        isLoading={generateImageLoading}
        isDisabled={post.prompt===""}
        onClick={()=>generateImageFun()}
        
        />

        
        <Button 
        text="Post Image"
         flex type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={post.name==="" || post.prompt==="" || post.photo ===""}
          onClick={()=>createPostFun()}
          />
    </Actions>
   </Form>




  )
}

export default GenerateImageForm