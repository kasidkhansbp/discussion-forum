import axios, { AxiosInstance } from 'axios';
import { Dispatch } from 'redux';
import { handleResponse } from './handlers';
import { getDiscussionsAction,getLoginStatus } from '../../redux/actions/dataActions';

const mwUrl = '';
let axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

function getDiscussions() {
  return (dispatch: Dispatch) => {
      handleResponse(axiosInstance.get(mwUrl + '/session/get-discussions'), dispatch, getDiscussionsAction);
  }
}

function addDiscussion(data: any) {
    return axiosInstance.post(mwUrl + '/api/add-discussion', data);
}

function updateDiscussion(data:any) {
  return axiosInstance.patch(mwUrl + `/api/update-discussion/${data.id}`,data);
}

function addComment(data:any) {
  return axiosInstance.post(mwUrl + `/api/add-comment/${data.id}`,data);
}

function deleteComment(data:any) {
  return axiosInstance.delete(mwUrl + `/api/delete-comment/${data.id}`,data);
}

function checkUserLoggedInStatus() {
    return (dispatch: Dispatch) => {
      axiosInstance.get(mwUrl + '/session/user-login-status').then(resp => {
        dispatch(getLoginStatus({loginStatus:resp.data.loginStatus,userId:resp.data.userId}));
      }).catch(err => dispatch(getLoginStatus({loginStatus:false})))
    }
}

function logout() {
  return (dispatch: Dispatch) => {
    axiosInstance.post(mwUrl + '/session/logout').then(resp => {
      dispatch(getLoginStatus({loginStatus:!!resp.data.loginStatus}));
    }).catch(err => dispatch(getLoginStatus({loginStatus:false})))
  }
}

function getDiscussion(id:any) {
  return axiosInstance.get(mwUrl + `/session/get-discussion/${id}`);
}

function updateComment(data:any) {
  return axiosInstance.patch(mwUrl + `/api/update-comment/${data.id}`,data);
}

export default {
    getDiscussions,
    addDiscussion,
    addComment,
    deleteComment,
    checkUserLoggedInStatus,
    logout,
    updateDiscussion,
    getDiscussion,
    updateComment
}

