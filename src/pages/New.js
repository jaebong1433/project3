import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";

const New = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    //new 컴포넌트는 일기를 생성하는 역할만 하기 때문에 함수 onCreate만 필요함
    //구조분해 할당을 이용해 DiaryDispatchContext가 제공하는 객체에서 함수 onCreate만 꺼내 사용
    const {onCreate} = useContext(DiaryDispatchContext);

    //작성완료 버튼을 클릭하면 호출할 함수 
    //이 함수는 매개변수로 data를 저장하는데, 이 data는 현재 Editor 컴포넌트에서 사용자가 작성한 일기정보(날짜 정보, 감정 이미지 번호, 일기)를 담은 객체임
    //그리고 함수 onCreate를 호출하며 일기 정보를 인수로 전달함
    //함수 navigate를 호출해 Home 페이지로 이동함 
    //이때 작성 페이지로 돌아오지 못하도록 {replace : true}옵션도 함께 전달함
    const onSubmit = (data) => {
        const {date, content, emotionId} = data;
        onCreate(date, content, emotionId);
        navigate("/", {replace: true});
    };

    useEffect(() => {
        setPageTitle("새 일기 쓰기");
    },[]);
    
    return (
        <div>
            <Header 
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    );
};

export default New;