import React from 'react' 
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {api as userActions} from '../redux/modules/user'
import swal from "sweetalert";

const Upload = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user)
  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e.target.files)
    console.log(fileInput.current.files[0])    
    const file = fileInput.current.files[0]
    const type = file.type.split('/')
    console.log(type)
    if (type[0] !=="image"){
      swal({
        title: "업로드에 실패하였습니다. 😅",
        text: "이미지만 업로드 할 수 있습니다.",
        icon: "error"
      })
    }
    if (file === undefined){
      return
    }
    dispatch(userActions.UpdateProfileImgAX(file))


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