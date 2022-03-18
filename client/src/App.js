import styled from 'styled-components'
import {Landing, Error, Register, ProtectedRoute, ChannelSearch, Library} from './pages'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import {
  AddJob, 
  AllJobs, 
  Profile, 
  SharedLayout, 
  Stats, 
  Channels} from './pages/dashboard/index.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={
            <ProtectedRoute>
              <SharedLayout/>
              </ProtectedRoute>}>
              <Route index element={<Channels />} />
              <Route path='profile' element={<Profile />}/>
              <Route path='channels' element={<Channels />}/>
        </Route>
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing />} />
        <Route path='/:channelId' element={<ChannelSearch />}/>
        <Route path='/' element={<Library />}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
