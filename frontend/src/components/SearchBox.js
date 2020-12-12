import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history, url, searchKeyword }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/${url}/${keyword}`);
    } else {
      history.push(`/${url}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={searchKeyword ? searchKeyword : 'Search tickets...'}
        className='mt-sm-2 mr-sm-2'
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-primary'
        className='mt-sm-2 px-3 py-2 btn-sm'
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
