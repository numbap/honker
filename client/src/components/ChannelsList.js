import { useState, useEffect } from 'react'
import { FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import Loading from "../components/Loading.js"
import {Link} from 'react-router-dom' 

const ChannelList = (props) => {
    const { channels, user, isLoading, addChannel, channelForm, getChannels } =
    useAppContext()
    const [channelId, setChannelId] = useState(channelForm?.channelId)

    useEffect(() => {
        getChannels()
        // eslint-disable-next-line
      }, [])


    console.log(channels, "Channels")
    return (
        <Wrapper>
        {
            channels.map(x => (
                (<p><Link to={`/${x.hash}`}>{x.name}</Link></p>)
            ))
        }
        </Wrapper>
    )

}

export default ChannelList