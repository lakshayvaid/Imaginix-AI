import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DownloadRounded } from "@mui/icons-material";

import { Avatar } from "@mui/material";
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card};
  border-radius: 2px;
  box-shadow: 1px 2px 40px 5.5px ${({ theme }) => theme.black + 60};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  gap: 2px;
  justify-content: end;
  flex-direction: column;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  opacity: 0;
  padding: 16px;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.white};

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;
const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const ImageCard = ({item}) => {
  return (
    <Card>
      <LazyLoadImage
      alt={item?.prompt}
      style={{borderRadius:"12px"}}
        width="100%"
      src={item?.photo}
      />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div style={{
            display:"flex",
            width:"100%",
            alignItems:"center",
            justifyContent:"space-between"
        }}>
          <Author style={{gap:"12px"}}>
            <Avatar style={{ width: "27", height: "30px" ,padding:"2px 2px", fontSize:"16px"}}>{item?.Avatar}</Avatar>
            {item?.author}
          </Author>
          <DownloadRounded onClick={()=>FileSaver.saveAs(item?.photo,"download.jpg")} />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
