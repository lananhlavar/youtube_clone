import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchFromAPI } from "./../utils/fetchFromAPI";
import {ChannelCard,Videos} from "./";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  console.log(channelDetail, videos);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            zIndex: 10,
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,237,255,1) 29%, rgba(255,0,254,1) 96%)",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box >
      <Box p={2} display="flex">

      <Box sx={{mr: {sm:'100px'}}}/>
        <Videos videos={videos}/>
      </Box>
      
    </Box>
  );
};

export default ChannelDetail;
