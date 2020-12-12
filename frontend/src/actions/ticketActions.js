import axios from 'axios';

export const listTickets = (keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'TICKET_LIST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/tickets?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: 'TICKET_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyTickets = (keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'TICKET_MY_LIST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/tickets/my?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: 'TICKET_MY_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_MY_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllTickets = (keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'TICKET_ALL_LIST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/tickets/all?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    dispatch({
      type: 'TICKET_ALL_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_ALL_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTicketDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'TICKET_DETAILS_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tickets/${id}`, config);

    dispatch({
      type: 'TICKET_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTicketReply = (ticketId, reply) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'TICKET_CREATE_REPLY_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/tickets/${ticketId}/replies`, reply, config);

    dispatch({
      type: 'TICKET_CREATE_REPLY_SUCCESS',
    });
    localStorage.removeItem('replyText');
  } catch (error) {
    dispatch({
      type: 'TICKET_CREATE_REPLY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTicket = (
  toDepartment,
  toDesignation,
  vessel,
  summary,
  description,
  isImportant,
  attachment
) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'TICKET_CREATE_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/tickets`,
      {
        toDepartment,
        toDesignation,
        vessel,
        summary,
        description,
        isImportant,
        attachment,
      },
      config
    );

    dispatch({
      type: 'TICKET_CREATE_SUCCESS',
      payload: data,
    });

    localStorage.removeItem('description');

    dispatch({
      type: 'TICKET_LIST_RESET',
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTicket = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'TICKET_DELETE_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tickets/${id}`, config);

    dispatch({
      type: 'TICKET_DELETE_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_DELETE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const closeTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'TICKET_CLOSE_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${ticket._id}/close`,
      {},
      config
    );

    dispatch({
      type: 'TICKET_CLOSE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'TICKET_CLOSE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveTicketReply = (ticket, reply) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'REPLY_APPROVED_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tickets/${ticket._id}/reply/${reply}/approved`,
      {},
      config
    );

    dispatch({
      type: 'REPLY_APPROVED_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'REPLY_APPROVED_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const disapproveTicketReply = (ticket, reply) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: 'REPLY_DISAPPROVED_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/tickets/${ticket._id}/reply/${reply}`,
      config
    );

    dispatch({
      type: 'REPLY_DISAPPROVED_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'REPLY_DISAPPROVED_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
