import { useParams } from "react-router-dom";
const Diary = () => {
    //브라우저에서 URL을 입력하면 이 경로에 포함된 URL 파라미터를 객체 형태로 반환함
    const {id} = useParams();

    return (
        <div>
            <div>{id}번 일기</div>
            <div>Diary 페이지입니다</div>
        </div>
    );
};

export default Diary;