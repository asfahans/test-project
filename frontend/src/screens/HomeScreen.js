import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const HomeScreen = ({ history }) => {
  const [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  useEffect(() => {
    fetchData(page);
  }, []);

  function fetchData(page) {
    fetch(`https://randomuser.me/api/?page=${page}&results=15`)
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
          });
        }
      })
      .then((res) => {
        if (page > 1) {
          let resultAr = [...data, ...res.results];
          setData(resultAr);
        } else {
          setData(res.results);
        }
        setLoader(false);
      })
      .catch((err) => console.log('Error, with message:', err.statusText));
  }

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);

      let bottom =
        e.target.documentElement.scrollHeight -
          e.target.documentElement.scrollTop -
          e.target.documentElement.clientHeight <
        50;

      if (bottom) {
        let page_ = page + 1;
        fetchData(page_);
        setLoader(true);
        setPage(page_);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  return (
    <>
      <Row>
        <Col className='d-flex align-items-end pl-0'>
          <h4 className='ml-3 mb-2'>Contacts</h4>
        </Col>
      </Row>
      <Row>
        <Card style={{ width: '100%', margin: '10px' }}>
          <ListGroup variant='flush'>
            {data.map((item, i) => {
              return (
                <ListGroup.Item action key={i}>
                  <Image
                    src={item.picture['thumbnail']}
                    roundedCircle
                    height='40'
                  />
                  <span className='ml-3' style={{ fontSize: '1.05rem' }}>
                    {item.name['first']}
                  </span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </Row>
      <Row>
        {loader && (
          <div className='spinner-border ml-4' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
