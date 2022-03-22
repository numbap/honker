import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import ReactHtmlParser from 'react-html-parser';
import {Loading} from '../components/index.js'

const VideoSearchSnippet = (props) => {
  const { stats, currentVideo, isLoading } = useAppContext()


  return (isLoading && (currentVideo.videoId === props.videoId)) ? (<Loading/>) : (
    <React.Fragment>
        {
          props.video.transcript.map((y, i) => (
            <tr key={i}>
              <td >{Math.floor(y.start)}</td>
              <td ><p><a href={`https://youtube.com/watch?v=${props.videoId}&t=${y.start}s`} target="_blank">{ReactHtmlParser(y.text)}</a></p></td>
            </tr>
        ))}
    </React.Fragment>
  )
}

export default VideoSearchSnippet


