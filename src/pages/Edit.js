import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);

    //이 함수는 window.confirm 메서드를 호출하며 반환값이 참이면 함수 onDelete를 호출하고 인수로 일기 id를 전달해 현재 수정 중인 일기를 삭제함
    //그리고 함수 nevigate를 호출해 Home페이지로 이동함
    //window.confirm은 사용자에게 인수로 전달한 텍스트와 함께 경고 대화상자를 출력하는 브라우저 메서드임
    //이 메서드는 경고 대화상자에서 사용자가 확인 버튼을 클릭하면 true를 반환함
    const onClickDelete = () => {
        if(window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")){
            onDelete(id);
            navigate("/", {replace: true});
        }
    };

    //Editor 컴포넌트에 Props로 전달함 함수 onSubmit을 만듬
    //이 함수는 매개변수 data로 사용자가 수정한 일기 데이터(날짜, 감정 이미지 번호, 일기) 객체를 받음
    //그리고 경고 대화상자를 띄워 일기를 정말 수정할지 사용자에게 물어봄
    //사용자가 확인 버튼을 클릭하면 함수 onUpdate를 호출해 일기를 업데이트함
    //그리고 함수 navigate를 호출해 Home 페이지로 이동함
    const onSubmit = (data) => {
        if (window.confirm("일기를 정말 수정할까요?")){
            const { date, content, emotionId} = data;
            onUpdate(id, date, content, emotionId);
            navigate("/", {replace: true});
        }
    };

    useEffect(() => {
        setPageTitle(`${id}번 일기 수정하기`);
    },[]);

    if(!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        return (
            <div>
                <Header 
                    title={"일기 수정하기"}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}
                    rightChild={<Button type={"negative"}
                    text={"삭제하기"}
                    onClick={onClickDelete} />}
                />
                <Editor initData={data} onSubmit={onSubmit}/>    
            </div>
        );
    }
};

export default Edit;