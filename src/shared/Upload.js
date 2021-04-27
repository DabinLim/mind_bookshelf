import React from 'react' 

import styled from 'styled-components'

import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {useDispatch, useSelector} from "react-redux";

const Upload = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user)
  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e.target.files)
    console.log(fileInput.current.files[0])
    props.setImage(fileInput.current.files[0])
    

    const reader = new FileReader();
    const file = fileInput.current.files[0]
    
    if (file === undefined){
      // dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      return
    }
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // dispatch(imageActions.setPreview(reader.result))
    }
  }


  return(
    <ImageLabel style={{backgroundImage:`url(${user_info.profileImg})`}} >
        
        <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile"
          onChange={selectFile} ref={fileInput}/>
          
    </ImageLabel>  
  )

}

const ImageLabel = styled.label`
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-position: center;
  background-size: cover;
  cursor:pointer;
`


export default Upload