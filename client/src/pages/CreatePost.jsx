import React from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";
import { useState } from "react";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
   background: ${({ theme }) => theme.background};
    padding: 25px 38px;
  padding-bottom: 50px;
  display: flex;
  flex-direction:column;
 justify-content:center;
  align-items:center;
  gap: 20px;
  @media (max-width:407px) {
    padding: 6px 6px;
  
    // flex-direction:column;
  }
 
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
   height: fit-content;
  gap: 10%;
  max-width: 1400px;
  justify-content:center;
  
  @media (max-width: 407px) {
  display flex;
    flex-direction: column;
  
    
  }
`;

const CreatePost = () => {

  const[generateImageLoading, setGenerateImageLoading]=useState(false);
  const[createPostLoading, setCreatePostLoading]=useState(false);

const [post,setPost]=useState({
   author:"",
   prompt:"",
   photo:"",
})



  return (
    <Container>
      <Wrapper>
        <GenerateImageForm 
        
        post={post}
        setPost={setPost}
         createPostLoading={createPostLoading}
          setCreatePostLoading={setCreatePostLoading}
           generateImageLoading={generateImageLoading}
           setGenerateImageLoading={setGenerateImageLoading}
        
        
        
        />
        <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
        </Wrapper>
    </ Container>
  );
};

export default CreatePost;
