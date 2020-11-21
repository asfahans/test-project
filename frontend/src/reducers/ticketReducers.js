export const ticketListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case 'TICKET_LIST_REQUEST':
      return {
        loading: true,
        tickets: [],
      };
    case 'TICKET_LIST_SUCCESS':
      return {
        loading: false,
        tickets: action.payload,
      };
    case 'TICKET_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ticketDetailsReducer = (
  state = { ticket: { replies: [] } },
  action
) => {
  switch (action.type) {
    case 'TICKET_DETAILS_REQUEST':
      return {
        loading: true,
        ...state,
      };
    case 'TICKET_DETAILS_SUCCESS':
      return {
        loading: false,
        ticket: action.payload,
      };
    case 'TICKET_DETAILS_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ticketReplyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TICKET_CREATE_REPLY_REQUEST':
      return {
        loading: true,
      };
    case 'TICKET_CREATE_REPLY_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'TICKET_CREATE_REPLY_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_CREATE_REPLY_RESET':
      return {};
    default:
      return state;
  }
};

export const ticketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TICKET_CREATE_REQUEST':
      return {
        loading: true,
      };
    case 'TICKET_CREATE_SUCCESS':
      return {
        loading: false,
        success: true,
        ticket: action.payload,
      };
    case 'TICKET_CREATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_CREATE_RESET':
      return {};
    default:
      return state;
  }
};
