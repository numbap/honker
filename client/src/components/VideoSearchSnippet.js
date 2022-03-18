import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
import ReactHtmlParser from 'react-html-parser';

const VideoSearchSnippet = (props) => {
  const { stats } = useAppContext()


  return (
    <div>
        {
          props.video.transcript.map((y, i) => (
          <p><a href={`https://youtube.com/watch?v=${props.videoId}&t=${y.start}s`} target="_blank" key={i}>{ReactHtmlParser(y.text)}</a></p>
        ))}
    </div>
  )
}

export default VideoSearchSnippet


