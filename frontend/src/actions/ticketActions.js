import axios from 'axios';

export const listTickets = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/tickets`, config);

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

export const createTicket = () => async (dispatch, getState) => {
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

    const { data } = await axios.post(`/api/tickets`, {}, config);

    dispatch({
      type: 'TICKET_CREATE_SUCCESS',
      payload: data,
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
