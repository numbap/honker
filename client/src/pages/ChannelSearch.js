import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo, VideoSearchSnippet, VideoSearchAllSnippets, Nav, Paginator, Loading} from '../components/index'
import { Link } from 'react-router-dom'
 
import { useAppContext } from '../context/appContext.js'
import { FaYoutube, FaAngleDown, FaAngleUp } from 'react-icons/fa'


const ChannelSearch = () => {
    
  const [search, setSearch] = useState('')
  let params = useParams()
  const {searchChannel, searchListings, selectVideo, currentVideo, getChannelInfo, currentChannel, searchPage, searchCount, isLoading} = useAppContext();

  useEffect(() => {
      getChannelInfo(params.channelId)
  }, [ params.channelId ])


  let clicky = (num) => searchChannel(search, params.channelId, num)

  return (
    <React.Fragment>

    <Nav />
    
    <div className="container">
        <div className='row align-items-end'>


              <div className='col-6'>
              <label htmlFor="searchText">Search Text</label>
              <input 
                type="text" 
                className="form-control" 
                value={search}
                id="searchText" 
                placeholder=""
                onChange={(e) => setSearch(e.target.value)} 
                />
              </div>

              <div className='col-6 align-bottom'>
                <button type="submit" className="btn btn-primary" onClick={() => {
                  searchChannel(search, params.channelId, searchPage)
                }}>Search</button>
              </div>

          



        </div>
        
        
        <div className='row'>
          




        
          <div className='col-12'>
            <h1>{currentChannel.name} <a href={`https://www.youtube.com/channel/${params.channelId}`} target='_blank'><FaYoutube /></a></h1>
            {(((searchListings.length === 0) && !isLoading) && <h3>Enter a search query and we'll tell you where they discussed your topic.</h3>)}
            {isLoading ? (<Loading />) :
              
              (<div className='table-responsive'>
            <table className="table table-light mx-auto w-auto">
              <thead>
              {
              searchListings.map((x, i) => (
                <React.Fragment key={i}>
                <tbody>
                  <tr className="table-secondary" key={i}>
                    <td colSpan="2">
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
            </div>)}
          </div>

        </div>


        <div className='col-md-12' >
            <Paginator pages={Math.ceil(searchCount/25)} currentPage={searchPage} onClick={clicky}/>
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


// <div className="form-group">
// <label for="searchText">Search Text</label>
// <input 
//   type="text" 
//   className="form-control" 
//   value={search}
//   id="searchText" 
//   placeholder=""
//   onChange={(e) => setSearch(e.target.value)} 
//   />
// </div>




// <div className='col-md-6'>
// <button type="submit" className="btn btn-primary" onClick={() => {
//   searchChannel(search, params.channelId, searchPage)
// }}>Search</button>
// </div>






