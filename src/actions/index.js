import {get_groups_request, authorize_request} from "../constants/actions";

export const getNews = () => ({
      type: 'GET_NEWS',
});

export const getGroupsRequest = () => ({
      type: get_groups_request,
});

export const authorizeRequest = (info) => ({
      type: authorize_request,
      data: info
});