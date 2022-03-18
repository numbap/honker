import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo, VideoSearchSnippet, VideoSearchAllSnippets, Nav} from '../components/index'
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

  return (
    <React.Fragment>

    <Nav />
    
    <div className="container">
        <div className='row'>
          <div className='col-md-12'>

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


          </div>
          <div className='col-md-12'>
            <button type="submit" className="btn btn-primary" onClick={() => {
              console.log(params) 
              searchChannel(search, params.channelId)
            }}>Search</button>
          </div>
        </div>
        
        
        <div className='row'>
          <div className='col-12'>

            <h1>{currentChannel.name} </h1>
            <div className='table-responsive'>
            <table className="table table-light mx-auto w-auto">
              <thead>
              {
              searchListings.map(x => (
                <React.Fragment>
                <tbody>
                  <tr className="table-secondary">
                    <td colspan="2">
                    <h5>{x.name} {(currentVideo && x.videoId === currentVideo.videoId) ? <FaAngleDown onClick={() => selectVideo({videoId:null})} /> : <FaAngleUp onClick={() => selectVideo({videoId:x.videoId})} />}</h5>
                    </td>
                  </tr>
            
                  {(currentVideo && x.videoId === currentVideo.videoId) ?   
                    <VideoSearchAllSnippets video={x} videoId={x.videoId} />  : 
                    <VideoSearchSnippet video={x} videoId={x.videoId}/> }
                    </tbody>
                </React.Fragment>
              ))}
              </thead>         
            </table>
            </div>

          </div>

        </div>
    </div>


    </React.Fragment>

);
};


export default ChannelSearch;


// {(currentVideo && x.videoId === currentVideo.videoId) ?   
//   <VideoSearchAllSnippets /> : 
//  <VideoSearchSnippet video={x} videoId={x.videoId}/> }


//     













