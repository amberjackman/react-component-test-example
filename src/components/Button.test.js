import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Button from "./Button";

describe('Button component (@testing-library/react)', () => {
  it('컴포넌트가 정상생성된다.', () => {
    const button = render(<Button />) ;
    expect(button).not.toBe(null);
  });
  
  it('"button" 이라고 씌인 엘리먼트는 HTMLButtonElement이다', () => {
    const { getByText } = render(<Button />)

    const buttonElement = screen.getByText("button");

    expect(buttonElement).toBeInstanceOf(HTMLButtonElement)
  });

  it('버튼을 클릭하면, p 태그 안에"버튼이 방금 눌렸다" 라고 쓰인다', () =>{
    const { getByText } = render(<Button />)

    const buttonElement = screen.getByText("button");

    fireEvent.click(buttonElement);

    const p = getByText("버튼이 방금 눌렸다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it('버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.', () => {
    const { getByText } = render(<Button />);

    const p = getByText("버튼이 눌리지 않았다.")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it('버튼을 클릭하고 5초뒤, p 태그안에 버튼이 눌리지 않았다', () => {
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    jest.useFakeTimers();

    const { getByText } = render(<Button />)

    const buttonElement = screen.getByText("button");

    fireEvent.click(buttonElement);
    
    jest.advanceTimersByTime(5000)

    const p = getByText("버튼이 방금 눌렸다")
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(HTMLParagraphElement);
  });

  it('버튼 클릭시 ,5초간 버튼 비활성화', ()=>{
   
    jest.useFakeTimers();

    const { getByText } = render(<Button />)

    const buttonElement = screen.getByText("button");

    fireEvent.click(buttonElement);

//비활성화
    expect(buttonElement.disabled).toBeTruthy();

//5초 흐른다
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    
    jest.advanceTimersByTime(5000)

    //활성화

    expect(buttonElement.disabled).toBeFalsy();
  });
});