import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

//커스텀 훅 useDiary는 매개변수로 일기 id를 저장함
const useDiary = (id) => {
    //변수 useContext를 호출하고 인수로 DiaryStateContext를 전달함
    //반환된 일기 데이터는 변수 data에 저장
    const data = useContext(DiaryStateContext);

    //매개변수로 저장한 id와 일치하는 일기를 저장할 State를 만듬
    const [diary, setDiary] = useState();

    const navigate = useNavigate();

    //useEffect를 이용해 id나 data의 값이 변경될 때마다 일기 데이터에서 매개변수 id와 일치하는 일기를 찾아 State값 diary를 업데이트 
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if(matchDiary){
            setDiary(matchDiary);
            //id나 data의 값이 변할 때 해당 id의 일기가 없으면 사용자가 잘못된 경로로 접근한 것이므로 경고 대화상자를 출력하고
            //함수 navigate를 호출해 Home 페이지로 되돌려 보냄 이때 함수 navigate의 두 번째 인수로 옵션 객체를 전달함
            //이 객체에서 replace 속성을 true로 하면, 페이지를 이동한 후 다시 돌아올 수 없도록 뒤로 가기 아이콘이 비활성화됨
        } else {
            alert("일기가 존재하지 않습니다!");
            navigate("/", {replace: true});
        }
    }, [id, data]);

    return diary;
};

export default useDiary;