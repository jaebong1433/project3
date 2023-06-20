import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

//함수 getEmotionImgById의 매개변수 emotionId에는 페이지나 컴포넌트에서 전달된 감정 이미지 번호가 전달됨
export const getEmotionImgById = (emotionId) => {
    
    //emotionId가 문자열이 아닌 숫자로 제공될 수도 있기 때문에 String메서드를 이용해 명시적으로 형 변환함
    const targetEmotionId = String(emotionId);

    //switch문으로 번호와 일치하는 이미지를 찾아 반환
    switch (targetEmotionId){
        case "1" :
            return emotion1;
        case "2" :
            return emotion2;
        case "3" :
            return emotion3;
        case "4" :
            return emotion4;
        case "5" :
            return emotion5;
        default:
            return null;                    
    }
}

//targetDate라는 Date객체를 매개변수로 반환
//이 객체의 year, month, date를 구해 yyyy-mm-dd 형식의 문자열을 만들어 반환
//월과 일이 10 미만의 수라면 앞에 0을 붙여 두 자리 수로 만듬
export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if(month < 10){
        month = `0${month}`
    }
    if(date < 10){
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export const emotionList = [
    {
        id: 1,
        name: "완전 좋음",
        img: getEmotionImgById(1),
    },
    {
        id: 2,
        name: "좋음",
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: "그럭저럭",
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: "끔찍함",
        img: getEmotionImgById(5),
    },
       
]

//매개변수 date로 Date 객체에서 해당 월의 가장 빠른 시간과 가장 늦은 시간의 타임 스탬프 값을 구해 반환
export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59
        
    ).getTime();
    return {beginTimeStamp, endTimeStamp};
}