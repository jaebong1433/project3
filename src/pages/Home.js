import Button from "../component/Button";
import Header from "../component/Header";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App"
import { getMonthRangeByDate, setPageTitle } from "../util";
import DiaryList from "../component/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    
    //pivotDate의 값을 한달 뒤로 업데이트 하는 함수
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1));
    };

    //pivotDate의 값을 한달 전으로 업데이트 하는 함수
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
    }

    //템플릿 리터럴로 pivotDate에 저장된 Date 객체를 'yyyy년 mm월'형식의 문자열로 만들어 변수 headerTitle에 저장
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
    
    useEffect(() => {
        if(data.length >= 1){
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    //useEffect를 한 번 더 호출함 useEffect에서는 Home 컴포넌트를 마운트할 때, 함수 setPageTitle을 호출하고 인수로 페이지 제목을 전달함
    useEffect(() => {
        setPageTitle("재봉이의 감정 일기장");
    },[]);

    return (
        <div>
            <Header
            title={headerTitle}
            leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
            rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
            
            <DiaryList data={filteredData} />    
        </div>
    );
};

export default Home;