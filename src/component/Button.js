import "./Button.css"

const Button = ({text, type, onClick}) => {
    //요소가 positive, negative인 배열에서 전달 type에 이 요소가 있는지 includes 메서드로 확인함
    //전달 type이 positive 또는 negative라면 해당 값을 그대로 변수 btnType에 저장함
    //그렇지 않으면 오타 등의 이유로 정상적인 type이 전달되지 않았으므로 default를 변수 btnType에 저장
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    //className을 복수로 지정하기 위해 배열과 join 메서드를 이용함
    //className을 두 개로 지정하는 이유는 positive,negative처럼 type을 결정하는 내용에 따라 스타일을 변경하기 위함
    //템플릿 리터럴을 이용해 변수 btnType에 저장한 값을 className으로 추가함
    //따라서 Props(type)가 positive라면 변수 btnType은 Button_positive가 되고,
    //전체 className은 Button Button_positive가 됨 
    return (
        <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>{text}</button>
    );
};

//아무런 type도 Props로 전달하지 않을 때를 대비해 defaultProps를 지정함
//type을 지정하지 않으면 Props에는 default가 기본값으로 설정
Button.defaultProps = {
    type : "default",
};

export default Button;