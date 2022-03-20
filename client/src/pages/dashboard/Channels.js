import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import Loading from "../../components/Loading.js"
import ChannelForm from "../../components/ChannelForm.js"
import ChannelList from "../../components/ChannelsList.js"

const Channels = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, addChannel, channelForm } =
    useAppContext()
    const [channelId, setChannelId] = useState(channelForm?.channelId)

  // const [form, setForm] = useState({channelId: 'dxxxx'})

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (!name || !email || !lastName || !location) {
  //     // test and remove temporary
  //     displayAlert()
  //     return
  //   }

  //   updateUser({ name, email, lastName, location })
  // }



  return (
    <Wrapper>
      
      <div>
      {isLoading ? <div/> : <ChannelForm/>}
      {isLoading ? <Loading/> : <ChannelList/>}
        
      </div>

    </Wrapper>
  )
}

export default Channels