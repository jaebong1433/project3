import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate } from "../util";
import Viewer from "../component/Viewer";
import { useEffect } from "react";
import { setPageTitle } from "../util";

const Diary = () => {
    //브라우저에서 URL을 입력하면 이 경로에 포함된 URL 파라미터를 객체 형태로 반환함
    const {id} = useParams();
    
    //커스텀 훅 useDiary를 호출하고 인수로 URL 파라미터로 받은 일기 id를 전달함
    const data = useDiary(id);

    const navigate = useNavigate();
    
    //뒤로 가기 버튼의 클릭 이벤트 핸들러 함수 navigate를 호출하고 인수로 -1을 전달하여 뒤로가기 이벤트가 발생
    const goBack = () => {
        navigate(-1);
    };

    //수정하기 버튼의 클릭 이벤트 핸들러를 만듬
    //함수 navigate를 호출하고 인수로 /edit/${id}를 전달해 Edit 페이지로 이동함
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };
    
    useEffect(() => {
        setPageTitle(`${id}번 일기`);
    },[]);

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>;
    } else {
        const {date, emotionId, content} = data;
        
        //템플릿 리터럴과 함수 getFormatted를 이용해 헤더의 정중앙에 위치할 'yyyy-mm-dd 기록' 형식의 제목 문자열을 만듬
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
        
    return (
        <div>
            <Header
                title={title}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}
                rightChild={<Button text={"수정하기"} onClick={goEdit}/>}
            />
            
            <Viewer content={content} emotionId={emotionId} />
        </div>
        );
    }
};

export default Diary;