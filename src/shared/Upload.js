import React from 'react' 
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {setPreview} from '../redux/modules/user'
import swal from "sweetalert";

const Upload = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user)
  const preview = useSelector((state) => state.user.preview)
  const image = preview? preview : user_info.profileImg
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0]
    const type = file.type.split('/')
    if (type[0] !=="image"){
      swal({
        title: "업로드에 실패하였습니다. 😅",
        text: "이미지만 업로드 할 수 있습니다.",
        icon: "error"
      })
      return
    }
    props.setImage(file)
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setPreview(reader.result))
    }


  }


  return(
    <ImageLabel style={{backgroundImage:`url(${image})`}} >
        <ImageIcon src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-512.png" />
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

const ImageIcon = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 110px;
  right: 12px;
  border-radius: 30px;
  background: white;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 6px #00000029;
`;

export default Upload