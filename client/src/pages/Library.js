import { useState, useEffect } from 'react'
import { FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import Loading from "../components/Loading.js"
import {Link} from 'react-router-dom' 

const Library = (props) => {
    const { isLoading, getLibrary, library, getChannels } = useAppContext()

    useEffect(() => {
        getLibrary()
        // eslint-disable-next-line
      }, [])


    console.log(library, "library")
    return (
        <div className='container'>Hello
        {
            library.map(x => (
                (<p><Link to={`/${x.hash}`}>{x.name}</Link></p>)
            ))
        }
        </div>
    )

}

export default Library