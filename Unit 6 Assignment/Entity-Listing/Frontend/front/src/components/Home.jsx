import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router-dom';
import '../components/Home/Home.css';
export const Home = () => {

  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page') || 1;
  const pagesize = new URLSearchParams(search).get('pagesize') || 5;
  const filter = new URLSearchParams(search).get('filter') || 'all';
  const sort = new URLSearchParams(search).get('sort') || 1;
  const navigate = useNavigate();
    const [Data, setData] = useState([]);
    
    let pages = [];
    

  if (Data.length != 0) {
    for (var i = 1; i <= Data.total_pages; i++) {
      pages.push(i);
    }
  }
  useEffect(() => {
    getData();
  }, [page, filter, sort]);
 
  const getData = async () => {
    try {
      let res = await fetch(
        `http://localhost:8080/getproducts?page=${page}&pagesize=${pagesize}&filter=${filter}&sort=${sort}`
      );
        let data = await res.json();
       console.log('Data is:', Data.products);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="contained">Filter</Button>
      <select
        style={{height: '36px', marginLeft: '10px', marginRight: '10px'}}
        value={filter}
        onChange={(e) => {
          navigate(
            `/getproducts?page=1&pagesize=5&filter=${e.target.value}&sort=${sort}`
          );
        }}
      >
        <option value="all">All</option>
        <option value="company">Brand</option>
        <option value="price">Price</option>
      </select>
      <Button variant="contained">Sort</Button>
      <select
        style={{height: '36px', marginLeft: '10px', marginRight: '10px'}}
        value={sort}
        onChange={(e) =>
          navigate(
            `/getproducts?page=1&pagesize=5&filter=${filter}&sort=${e.target.value}`
          )
        }
      >
        <option value="1">Price(Ascending)</option>
        <option value="-1">Price(Decending)</option>
      </select>

      <div className="container">
        {Data.length != 0
          ? Data.products.map((ele) => {
              return (
                <div key={ele._id} className="inDiv">
                  <img src={ele.image_1} />
                  <p>{ele.title}</p>
                  <p>{ele.price}</p>
                  <p>{ele.company}</p>
                </div>
              );
            })
          : null}
      </div>
      <div>
        {pages.length != 0
          ? pages.map((e) => {
              return Number(page) === e ? (
                <Button key={e} variant="contained" disabled>
                  {e}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate(
                      `/getproducts?page=${e}&pagesize=5&filter=${filter}&sort=${sort}`
                    )
                  }
                  key={e}
                  variant="contained"
                >
                  {e}
                </Button>
              );
            })
          : null}
      </div>
    </div>
  );
};
