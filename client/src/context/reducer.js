import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    SETUP_USER_BEGIN, 
    SETUP_USER_SUCCESS, 
    SETUP_USER_ERROR,
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
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    CLEAR_FILTERS,
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
   } from "./actions"

   import { initialState } from './appContext'

const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT){
        return {...state, showAlert:true, alertType:'danger',
        alertText:'Please provide all values!'}
    }
    if(action.type === CLEAR_ALERT){
        return {...state, showAlert:false, alertType:'',
        alertText:''}
    }

      if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === SETUP_USER_SUCCESS) {
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        }
      }
      if (action.type === SETUP_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if (action.type === TOGGLE_SIDEBAR) {
        console.log('Toggling')
        return { ...state, showSidebar: !state.showSidebar }
      }

      if (action.type === LOGOUT_USER) {
        return {
          ...initialState,
          user: null,
          token: null,
          userLocation: '',
          jobLocation: '',
        }
      }

      if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
      }

      if (action.type === SET_CHANNEL) {
        return { ...state, currentChannel: action.payload.currentChannel  }
      }

      if (action.type === SET_LIBRARY) {
        return { ...state, library: action.payload.library, searchListings: [], currentChannel: {name:'Loading...'}, currentVideo: {videoId:null}, searchCount: 0, searchPage: 1}
      }

      if (action.type === UPDATE_CHANNEL_LIST) {
        return { ...state, channels: action.payload.channels }
      }

      if (action.type === UPDATE_USER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          token:action.payload.token,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: 'User Profile Updated!',
        }
      }

      if (action.type === ADD_CHANNEL_SUCCESS) {
        return {
          ...state,
          isLoading: false,
        }
      }


      if (action.type === UPDATE_USER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if (action.type === HANDLE_CHANGE) {
        return { ...state, page: 1, [action.payload.name]: action.payload.value }
      }

      if (action.type === CLEAR_VALUES) {
        const initialState = {
          isEditing: false,
          editJobId: '',
          position: '',
          company: '',
          jobLocation: state.userLocation,
          jobType: 'full-time',
          status: 'pending',
          channelForm: {
            channelId: ''
          }
        }
        return { ...state, ...initialState }
      }

      if (action.type === CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === CREATE_JOB_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'New Job Created!',
        }
      }
      if (action.type === CREATE_JOB_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if (action.type === GET_JOBS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
      }
      if (action.type === GET_JOBS_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          jobs: action.payload.jobs,
          totalJobs: action.payload.totalJobs,
          numOfPages: action.payload.numOfPages,
        }
      }

      if (action.type === SET_EDIT_JOB) {
        const job = state.jobs.find((job) => job._id === action.payload.id)
        const { _id, position, company, jobLocation, jobType, status } = job
        return {
          ...state,
          isEditing: true,
          editJobId: _id,
          position,
          company,
          jobLocation,
          jobType,
          status,
        }
      }

      if (action.type === DELETE_JOB_BEGIN) {
        return { ...state, isLoading: true }
      }

      if (action.type === EDIT_JOB_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === EDIT_JOB_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'Job Updated!',
        }
      }
      if (action.type === EDIT_JOB_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }

      if (action.type === CLEAR_FILTERS) {
        return {
          ...state,
          search: '',
          searchStatus: 'all',
          searchType: 'all',
          sort: 'latest',
        }
      }

      if (action.type === SHOW_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
      }

      if (action.type === ADD_CHANNEL_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
      }

      if (action.type === SHOW_STATS_SUCCESS) {
        console.log("payload stats", action.payload.stats)
        return {
          ...state,
          isLoading: false,
          stats: action.payload.stats,
          monthlyApplications: action.payload.monthlyApplications,
        }
      }

      if (action.type === CHANGE_PAGE) {
        return { ...state, page: action.payload.page }
      }

      if (action.type === SEARCH_BEGIN) {
        return { ...state, isLoading: true, searchPage: action.payload.searchPage}
      }

      if (action.type === SELECT_VIDEO) {
        return { 
          ...state, 
          currentVideo: action.payload.currentVideo, 
          isLoading: action.payload.isLoading }
      }

      if (action.type === SEARCH_SUCCESS) {
        return { ...state, searchListings: action.payload.searchListings, searchCount: action.payload.searchCount, isLoading: false }
      }

      throw new Error(`no such action :${action.type}`)
  }
  export default reducer