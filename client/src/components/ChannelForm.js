import { useState } from 'react'
import { FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import Loading from "../components/Loading.js"


const ChannelForm = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading, addChannel, channelForm } =
    useAppContext()
    const [channelId, setChannelId] = useState(channelForm?.channelId)

    return (
        <Wrapper>
        <input 
              type='text'
              value={channelId}
              onChange={e => setChannelId(e.target.value)}
              name='channelId'
              /> 
              <button
              className='btn submit-btn'
              type='submit'
              type="text" onClick={() => addChannel({channelId})}
              >
              Add Channel
              </button>
        </Wrapper>
    )

}

export default ChannelForm