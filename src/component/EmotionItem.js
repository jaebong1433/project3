import React from "react";
import "./EmotionItem.css";

const EmotionItem = ({id, img, name, onClick, isSelected}) => {
    const handleOnClick = () => {
        onClick(id);
    };
    return (
        //isSelected의 값에 따라 EmotionItem에 다른 스타일을 적용하기 위해 <div> 태그의 className을 동적으로 설정함
        //삼항 연산자를 이용해 EmotionItem 컴포넌트를 랜더링하는 <div>태그의 className을 isSelected가 true면 
        //EmotionItem EmotionItem_on_{id}, false면 EmotionItem EmotionItem_off로 설정
        <div className={[
            "EmotionItem",
            isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`,
            ].join(" ")} onClick={handleOnClick}>
            <img alt={`emotion${id}`} src={img} />
            <span>{name}</span>
        </div>
    );
}

export default EmotionItem;