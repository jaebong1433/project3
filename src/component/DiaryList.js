import "./DiaryList.css";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]
//DiaryList 컴포넌트는 일기 리스트를 렌더링하기 위해 부모인 Home에서 필터링된 일기를 Props로 받음
const DiaryList = ({data}) => {
    //useState를 호출해 사용자가 선택한 정렬 기준을 저장할 State로 sortType을 만듬
    //이때 인수로 'latest'를 전달해 State의 초기값을 '최신순'으로 설정
    const [sortType, setSortType] = useState("latest");

    //정렬 기준이 변경되면 새 기준으로 sortType을 업데이트할 이벤트 핸들러를 만듬
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
      };

    const navigate = useNavigate();

    //새 일기 쓰기 버튼을 클릭하면 New페이지로 이동하는 함수
    const onClickNew = () => {
        navigate("/new");
      };

    //useState를 호출해 정렬된 일기 데이터를 저장할 State 변수를 만듬
    //인수로 빈 배열을 전달해 State의 초기값 설정
    const [sortedData, setSortedData] = useState([]);

    //useEffect를 호출하고 두 번째 인수인 의존성 배열에 data와 sortType을 저장함
    //결국 일기 데이터나 정렬 기준이 바뀌면 첫 번째 인수로 전달한 콜백 함수를 다시 실행
    useEffect(() => {
        //객체 형태의 배열인 data를 최신순 또는 오래된 순으로 정렬하기 위해 별도의 비교 함수를 만듬
        //만약 sortType이 latest라면 최신순으로 정렬해야 하므로 일기 객체의 date를 내림차순으로 정렬함
        //data값이 문자열이므로 Number메서드를 이용해 명시적으로 형 변환한 후 정렬
        const compare = (a, b) => {
            if (sortType === "latest") {
              return Number(b.date) - Number(a.date);
            } else {
              return Number(a.date) - Number(b.date);
            }
          };
        //내장 함수를 사용해 동일한 요소로 배열을 복사해 copyList에 저장
        const copyList = JSON.parse(JSON.stringify(data));
        
        //copyList에 저장된 일기 데이터를 정렬
        copyList.sort(compare);
        
        //sortedDate를 정렬된 일기 데이터로 업데이트
        setSortedData(copyList);
    }, [data, sortType]);

    return (
        <div className="DiaryList">
          <div className="menu_wrapper">
            <div className="left_col">
              <select value={sortType} onChange={onChangeSortType}>
                {sortOptionList.map((it, idx) => (
                  <option key={idx} value={it.value}>
                    {it.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="right_col">
              <Button
                type={"positive"}
                text={"새 일기 쓰기"}
                onClick={onClickNew}
              />
            </div>
          </div>
          <div className="list_wrapper">
            {sortedData.map((it) => (
              <DiaryItem key={it.id} {...it} />
            ))}
          </div>
        </div>
      );
};

export default DiaryList;