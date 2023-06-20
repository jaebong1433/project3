import "./Viewer.css";
import { emotionList } from "../util";

//일기 상세 페이지를 보여주는 기능
//부모 컴포넌트인 Diary에서 content와 emotionId를 Props로 받음
const Viewer = ({content, emotionId}) => {

    //find 메서드를 이용해 emotionList에서 id가 emotionId와 일치하는 데이터를 찾아 변수 emotionItem에 저장
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    
    return (
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div
                 className={[
                    "emotion_img_wrapper",
                    `emotion_img_wrapper_${emotionId}`,
                 ].join(" ")}
                 >
                    <img alt={emotionItem.name} src={emotionItem.img} />
                    <div className="emotion_descript">{emotionItem.name}</div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
        );
};

export default Viewer;