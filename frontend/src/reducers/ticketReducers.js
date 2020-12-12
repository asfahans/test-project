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
        tickets: action.payload.tickets,
        pages: action.payload.pages,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
      };
    case 'TICKET_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_LIST_RESET':
      return {
        tickets: [],
      };
    default:
      return state;
  }
};

export const ticketMyListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case 'TICKET_MY_LIST_REQUEST':
      return {
        loading: true,
        tickets: [],
      };
    case 'TICKET_MY_LIST_SUCCESS':
      return {
        loading: false,
        tickets: action.payload.tickets,
        pages: action.payload.pages,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
      };
    case 'TICKET_MY_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_MY_LIST_RESET':
      return {
        tickets: [],
      };
    default:
      return state;
  }
};

export const ticketAllListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case 'TICKET_ALL_LIST_REQUEST':
      return {
        loading: true,
        tickets: [],
      };
    case 'TICKET_ALL_LIST_SUCCESS':
      return {
        loading: false,
        tickets: action.payload.tickets,
        pages: action.payload.pages,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        count: action.payload.count,
      };
    case 'TICKET_ALL_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_ALL_LIST_RESET':
      return {
        tickets: [],
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

export const ticketDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TICKET_DELETE_REQUEST':
      return {
        loading: true,
      };
    case 'TICKET_DELETE_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'TICKET_DELETE_FAIL':
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

export const ticketCloseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TICKET_CLOSE_REQUEST':
      return {
        loading: true,
      };
    case 'TICKET_CLOSE_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'TICKET_CLOSE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'TICKET_CLOSE_RESET':
      return {};
    default:
      return state;
  }
};

export const ticketReplyApprovedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REPLY_APPROVED_REQUEST':
      return {
        loading: true,
      };
    case 'REPLY_APPROVED_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'REPLY_APPROVED_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'REPLY_APPROVED_RESET':
      return {};
    default:
      return state;
  }
};

export const ticketReplyDisapprovedReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REPLY_DISAPPROVED_REQUEST':
      return {
        loading: true,
      };
    case 'REPLY_DISAPPROVED_SUCCESS':
      return {
        loading: false,
        success: true,
      };
    case 'REPLY_DISAPPROVED_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'REPLY_DISAPPROVED_RESET':
      return {};
    default:
      return state;
  }
};
