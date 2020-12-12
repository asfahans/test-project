import axios from 'axios';

export const listVessels = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'VESSEL_LIST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/vessels`, config);

    dispatch({
      type: 'VESSEL_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'VESSEL_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
