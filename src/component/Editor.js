import "./Editor.css";
import { useEffect, useState } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({initData, onSubmit}) => {
    const [state, setState] = useState({
        //state.date 프로퍼티의 초기값을 함수 getFormattedDate의 반환값으로 설정함
        //인수로 new Date()를 전달해 state.date의 초기값이 yyyy-mm-dd형식의 오늘 날짜가 되도록 설정
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    //사용자가 입력한 날짜를 변경하면 호출되어 State를 업데이트
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    //글상자의 onChange 이벤트 핸들러 handleChangeContent를 만듬
    //이 함수에서 사용자가 작성한 일기 데이터를 state.content 프로퍼티에 저장함
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value, 
        });
    };

    //<작성완료> 버튼을 클릭하면 호출할 이벤트 핸들러 handleSubmit을 만듬 이 함수는
    //Props로 받은 onSubmit을 호출하며, 인수로 현재 Editor 컴포넌트의 State값을 전달함
    const handleSubmit = () => {
        onSubmit(state);
    };

    //useNavigate를 호출하면 클라이언트 사이드 렌더링 방식으로 페이지를 이동하는 함수를 변환함
    //이때 인수로는 아무것도 전달하지 않아도 됨
    //useNavigate를 호출해 함수 navigate를 생성하면 페이지 간의 이동을 간편하게 구현
    const navigate = useNavigate();
    const handleOnGoBack = () => {
        //인수로 -1을 전달하면 뒤로가기 이벤트가 동작함
        navigate(-1);
    };
    
    //감정 이미지를 클릭하면 호출할 이벤트 핸들러를 만듬
    //이 함수는 감정 이미지 선택 섹션에서 클릭한 이미지 번호를 매개변수 emotionId에 저장함
    //그리고 이 번호로 현재 State의 emotionId 값을 업데이트
    const handleChagneEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId,
        });
    };
    
    //useEffect에 첫 번째 인수로 전달한 콜백 함수는 initDate 값이 변경될 때마다 실행됨
    useEffect(() => {
        //useEffect의 콜백 함수가 실행될 때 initDate가 falsy한 값이라면 부모 컴포넌트에서 정상적인 initDate를 받지 못한 경우이므로
        //아무 일도 일어나지 않음. 그러나 truthy한 값이라면 if문을 수행
        if(initData){
            //State를 업데이트 이때 ...initDate로 받은 content, emotionId 프로퍼티 값은 initDate와 동명의 프로퍼티 값으로 설정함
            //그다음 state.date 프로퍼티는 타임 스탬프 형식의 initDate.date를 Date 객체로 변환한 다음, 
            //이를 다시 yyyy-mm-dd 형식의 문자열로 변환해 설정함
            //이때 Date 객체를 yyyy-mm-dd 형식으로 변환하기에 앞서 util.js에서 만들었던 함수 getFormattedDate를 사용함 
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);
    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date}
                        onChange={handleChangeDate}></input>
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it)=> (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleChagneEmotion}
                            isSelected={state.emotionId === it.id}
                            />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요"
                        value={state.content}
                        onChange={handleChangeContent}
                        ></textarea>
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text={"취소하기"} onClick={handleOnGoBack}/> 
                <Button text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
                
            </div>
        </div>
    );
};

export default Editor;