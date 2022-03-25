import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from "../components/Loading.js"
import {Link} from 'react-router-dom' 
import {Nav} from '../components/index'

const Library = (props) => {
    const { isLoading, getLibrary, library } = useAppContext()

    useEffect(() => {
        getLibrary()
        document.title = `Zeeph : Channels`
      }, [])

    return (
        <div>
        <Nav />

        <div className='container'>
        <div className='row'>
        <div><h1>Full-text search for YouTube</h1><h3>Go directly to points of interest in your favorite channels!</h3></div>
            {library.map((x, i) => (
            
                (
                <div className='col-sm-3 border bg-light' key={i}>
                <Link to={`/${x.hash}`}>{x.name}</Link>
                </div>)
            ))}
        </div>
        <div><p>Are you a content creator? Contact us to find out how you can <a href="https://docs.google.com/forms/d/e/1FAIpQLSdq7CYkmmCFBJCX7qqUsLzogrW7lKTJUyZ2mXBuqPYjI-2TNQ/viewform">leverage Zeeph to enhance your audience experience</a>.</p></div>
        <div><p><Link to={'/Privacy'}>Privacy Policy</Link></p></div>
        </div>
        </div>
    )

}

export default Library