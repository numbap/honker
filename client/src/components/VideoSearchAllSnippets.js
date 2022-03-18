import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import ReactHtmlParser from 'react-html-parser';
import {Loading} from './index.js'

const VideoSearchAllSnippets = (props) => {
  const { isLoading, currentVideo } = useAppContext()


  return (
    <div>
        { isLoading ?
              <Loading /> :
            <p>{
              currentVideo.transcript.map((y, i) => (
              <a href={`https://youtube.com/watch?v=${props.videoId}&t=${y.start}s`} target="_blank" key={i}>{ReactHtmlParser(y.text)}</a> 
            ))}</p>
        }
    </div>
  )

}

export default VideoSearchAllSnippets