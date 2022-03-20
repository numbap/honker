import React, { useState, useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  CLEAR_FILTERS,
  SET_EDIT_JOB,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CHANGE_PAGE,
  ADD_CHANNEL_BEGIN,
  ADD_CHANNEL_SUCCESS, 
  UPDATE_CHANNEL_LIST,
  SEARCH_BEGIN,
  SEARCH_SUCCESS,
  SELECT_VIDEO,
  SET_CHANNEL,
  SET_LIBRARY
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  jobLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "decided"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  stats: {},
  monthlyApplications: [],
  channelForm: {
    channelId: ''
  },
  channels: [{hash:"dddddd"}, {hash:"ppppppppp"}, {hash:"oooooooooo"}],
  searchListings: [],
  searchCount: 0,
  searchPage: 1,
  currentVideo: {videoId:null},
  currentChannel: {name:'Loading...'},
  library: []
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1/",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {

      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    // will add page later
    const { search, searchStatus, searchType, sort, page } = state
    let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
    if (search) {
      url = url + `&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch(url)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  // useEffect(() => {
  //   getJobs();
  // }, []);

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  const selectVideo = async (currentVideo) => {
    if(currentVideo){
      dispatch({ 
        type: SELECT_VIDEO,
        payload: { currentVideo, isLoading: true }
       });
       let vid = await axios.get(
        `/api/v1/search/v/${currentVideo.videoId}`
      );

      dispatch({ 
        type: SELECT_VIDEO,
        payload: { currentVideo: vid.data.vid, isLoading: false }
       });
    }else{
      dispatch({ 
        type: SELECT_VIDEO,
        payload: { currentVideo, isLoading: false }
       });
    }

  };

  const getChannelInfo = async (hash) => {
    let currentChannel = await axios.get(
      `/api/v1/search/c/${hash}`
    );
    document.title = `Zeeph : ${currentChannel.data.name}`
    dispatch({ 
      type: SET_CHANNEL,
      payload: { currentChannel: currentChannel.data }
     });
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const registerUSer = async (currentUser) => {
    console.log(currentUser);
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/updateUser", currentUser);
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token: initialState.token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const getChannels = async () => {
    try{
      let response = await authFetch.get("/channels");
      dispatch({
        type: UPDATE_CHANNEL_LIST,
        payload: { channels: response.data.channels },
      });
      
    }catch(e){
      return []
    }

  }


  const getLibrary = async (hash) => {
    let library = await axios.get(
      `/api/v1/search/c/all`
    );
    dispatch({ 
      type: SET_LIBRARY,
      payload: { library: library.data.chan }
     });
  }




  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };



  const addChannel = async (formData) => {
    dispatch({ type: ADD_CHANNEL_BEGIN });
    try {
      const { channelId } = formData;

      let xxxx = await authFetch.post("/channels", {
        channelId
      });

      dispatch({
        type: ADD_CHANNEL_SUCCESS,
      });
      // call function instead clearValues()

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser()
    }

    clearAlert();
  };



  /////////////////////////////////////
  // Come back and check logic here
  /////////////////////////////////////
  const searchChannel = async (search, channelId, searchPage) => {

    dispatch({ type: SEARCH_BEGIN, payload: {searchPage} });
    try {
      const response = await axios.post(
        `/api/v1/search/${channelId}`,{
        search, 
        searchPage}
      );

      dispatch({
        type: SEARCH_SUCCESS,
        payload: {
          searchListings: response.data.vids,
          searchCount: response.data.vidCount
        },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };










  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        getJobs,
        deleteJob,
        clearFilters,
        editJob,
        showStats,
        changePage, 
        addChannel,
        getChannels,
        searchChannel,
        selectVideo,
        getChannels,
        getChannelInfo,
        getLibrary
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
