import React, { useReducer, useRef, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

//createContext 메서드를 호출해 일기 State값을 컴포넌트 트리에 공급할 Context를 만듬
//이때 이 Context를 다른 파일에서 불러올 수 있도록 export로 내보냄 
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function reducer(state, action){
  switch (action.type){
    //action.type이 CREATE면 action.data가 일기 State 배열 맨 앞에 추가된 새 일기 데이터가 반환됨
    //그리고 새로 작성한 data가 추가된 일기 State로 업데이트됨 
    case "CREATE": {
      return [action.data, ...state];
    }

    //action.type이 UPDATE면 내장 함수 map을 이용해 일기 아이템을 순회하면서 수정할 일기 id(action.data.id)와 일치하는 데이터를 찾음
    //찾으면 action.data의 값을 변경한느 새 일기 데이터를 반환하고 그렇지 않으면 기존 일기 아이템을 그대로 반환함
    //그 결과 id가 action.id인 일기 아이템의 정보만 수정됨
    case "UPDATE": {
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
    }
    
    //일기를 삭제할 때는 함수 reducer에서 삭제할 일기 아이템을 제외한 새 일기 데이터 배열을 반환 해야 함
    //따라서 filter메서드를 이용해 삭제할 일기 id와 일치하는 아이템은 빼고 새 일기 데이터 배열을 만들어 반환함
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }

    //action.data에 저장된 목 데이터로 일기 State를 업데이트 
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];



//Routes는 여러 Route를 감싸고 현재 URL 경로에 맞게 적절한 Route 컴포넌트를 페이지에 렌더링
function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //일기 데이터를 관리할 state 변수 data를 만듬
  //두 번째 인수로 빈 배열을 전달해 일기 데이터의 초기값을 설정  
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);
  //함수 onCreate는 Editor 컴포넌트에서 사용자가 선택한 날짜 정보, 입력한 일기, 선택한 감정 이미지 번호를 
  //매개변수 date, content, emotionId로 저장함
  const onCreate = (date, content, emotionId) => {

    //일기 State를 새 일기가 추가된 배열로 업데이트하기 위해 함수 dispatch를 호출함
    //이때 인수로 전달하는 action 객체의 type에는 생성을 의미하는 CREATE를,
    //date에는 새롭게 생성한 일기 아이템을 객체로 만들어 전달함
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    //idRef의 현잿값을 1늘려 다음 일기를 생성할 때 아이디가 중복되지 않도록 함 
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    //일기 수정을 위해 일기 State를 업데이트해야 하므로 함수 dispatch를 호출함
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>;
    
  } else { //isDataLoaded의 값이 true면 일기 State의 초기화가 완료되었으므로 자식 컴포넌트를 모두 렌더링함

  return (
    //아래의 컴포넌트들을 Props Drilling 없이 useContext를 이용해 일기 State를 꺼내 쓸 수 있음 
    <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
export default App;