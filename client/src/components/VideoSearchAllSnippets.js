import { useAppContext } from '../context/appContext'
import ReactHtmlParser from 'react-html-parser';
import {Loading} from './index.js'

const VideoSearchAllSnippets = (props) => {
  const { isLoading, currentVideo } = useAppContext()


  return (isLoading && (currentVideo.videoId === props.videoId)) ? (<Loading />) : (
    <tr>
              <td colSpan="2"><p>{
              currentVideo.transcript.map((y, i) => (
              <a href={`https://youtube.com/watch?v=${props.videoId}&t=${y.start}s`} target="_blank" key={i}>{ReactHtmlParser(y.text)} </a> 
            ))}</p></td>
    </tr>
  )

}

export default VideoSearchAllSnippets