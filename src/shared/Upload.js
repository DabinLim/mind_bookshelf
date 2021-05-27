import React from 'react' 
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {setPreview} from '../redux/modules/user'
import swal from "sweetalert";
import heic2any from "heic2any"

const Upload = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user)
  const preview = useSelector((state) => state.user.preview)
  const image = preview? preview : user_info.profileImg
  const fileInput = React.useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    let file = fileInput.current.files[0]
    // console.log(file)
    if(file.name.split('.')[1] === 'heic'){
      let blob = fileInput.current.files[0];
      // blob에다가 변환 시키고 싶은 file값을 value로 놓는다.
			// toType에다가는 heic를 변환시키고싶은 이미지 타입을 넣는다.
      heic2any({blob : blob, toType : "image/jpeg"})
      .then(function (resultBlob) {
        //file에 새로운 파일 데이터를 씌웁니다.
        file = new File([resultBlob], file.name.split('.')[0]+".jpg",{type:"image/jpeg", lastModified:new Date().getTime()});
        props.setImage(file)
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        dispatch(setPreview(reader.result))
    }
      })
      .catch(function (x){
        console.log(x)
      })
    } else{
      const type = file.type.split('/')
      if (type[0] !=="image"){
        swal({
          title: "업로드에 실패하였습니다.",
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
  width: 110px;
  height: 110px;
  border-radius: 75px;
  background-position: center;
  background-size: cover;
  cursor:pointer;
  @media (max-width: 500px) {
    width: 90px;
  height: 90px;
  } ;
`

const ImageIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 78px;
  right: 6px;
  border-radius: 30px;
  background: white;
  padding: 3px;
  cursor: pointer;
  box-shadow: 0px 0px 6px #00000029;
  @media (max-width: 500px) {
    width: 30px;
    height: 30px;
    top: 60px;
    right: 0px;
    padding: 3px;
  } ;
`;

export default Upload