import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo, VideoSearchSnippet, VideoSearchAllSnippets} from '../components/index'
import { Link } from 'react-router-dom'
 
import { useAppContext } from '../context/appContext.js'
import { FaAlignLeft, FaAngleDown, FaAngleUp } from 'react-icons/fa'


const ChannelSearch = () => {
    
  const [search, setSearch] = useState('')
  let params = useParams()
  const {searchChannel, searchListings, selectVideo, currentVideo, getChannelInfo, currentChannel} = useAppContext();

  useEffect(() => {
      getChannelInfo(params.channelId)
  }, [ params.channelId ])

  console.log(currentChannel, "channel")

  console.log(searchListings, "kkkkkkkkkkk")
  return (
  <div className="container">
    <nav><Logo /></nav>
    <div className='contaier page'>
        <div className="form-group">
        <label for="searchText">Search Text</label>
        <input 
          type="text" 
          className="form-control" 
          value={search}
          id="searchText" 
          placeholder=""
          onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => {
          console.log(params) 
          searchChannel(search, params.channelId)
        }}>Search</button>
    </div>




    <div className="container page">
        <h1>{currentChannel.name}</h1>
        {
          searchListings.map(x => (
            <div>
             <h3>{x.name} {x.videoId} {(currentVideo && x.videoId === currentVideo.videoId) ? <FaAngleDown onClick={() => selectVideo({videoId:null})} /> : <FaAngleUp onClick={() => selectVideo({videoId:x.videoId})} />}</h3>
                {(currentVideo && x.videoId === currentVideo.videoId) ?   
                      <VideoSearchAllSnippets video={x} videoId={x.videoId} />  : 
                      <VideoSearchSnippet video={x} videoId={x.videoId}/> }
            </div>
          ))

        }
    </div>
  </div>

);
};


export default ChannelSearch;


// {(currentVideo && x.videoId === currentVideo.videoId) ?   
//   <VideoSearchAllSnippets /> : 
//  <VideoSearchSnippet video={x} videoId={x.videoId}/> }