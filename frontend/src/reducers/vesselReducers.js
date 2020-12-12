export const vesselListReducer = (state = { vessels: [] }, action) => {
  switch (action.type) {
    case 'VESSEL_LIST_REQUEST':
      return {
        loading: true,
        vessels: [],
      };
    case 'VESSEL_LIST_SUCCESS':
      return {
        loading: false,
        vessels: action.payload,
      };
    case 'VESSEL_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
