// 쿠기에 값을 저장, 삭제, 조회

// 쿠키 저장
const setCookie = (name, value) => {
  let date = new Date();
  // 만료 시간 5시간
  date.setTime(date.getTime() + 1 * 1000 * 60 * 60 * 24 * 30);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

// 쿠키 삭제
const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);

  document.cookie = name+"=; expires="+date;

};
// 쿠키 조회
const getCookie = (name) => {
  let value = "; "+document.cookie;

  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

export { setCookie, deleteCookie, getCookie };