import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/users/login`,
      { username, password },
      config
    );

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};

export const register = (
  username,
  password,
  title,
  name,
  designation,
  department,
  assignedVessels,
  isAdmin
) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/users`,
      {
        username,
        password,
        title,
        name,
        designation,
        department,
        assignedVessels,
        isAdmin,
      },
      config
    );

    dispatch({
      type: 'USER_REGISTER_SUCCESS',
      payload: data,
    });

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
