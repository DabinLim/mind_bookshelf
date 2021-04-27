import React, {useState} from 'react';  
import styled from  'styled-components';

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const onChange = (e) => {
    props.keyPress(e.target.value)
  }


  return(
    <React.Fragment>
      <SearchContainer>
        <SearchInput onChange={onChange} />
      </SearchContainer>
    </React.Fragment>
  )
}

const SearchContainer = styled.div`
  margin-right: 50px;
`

const SearchInput = styled.input`
  width: 300px;
  font-size: 20px;
  padding: 5px 8px;
  background: #FAFAFA;
`


export default Search