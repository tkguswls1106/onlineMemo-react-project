import React, { useState, useEffect, useRef } from "react";

function useDetectDropdown(initialValue) {  // 드롭다운 부분 클릭 감지하는 커스텀 훅
    // 조건 1: 드롭다운 메뉴 열려있는데 드롭다운 클릭시 -> 드롭다운 닫기 (toggleHandler 이용)
    // 조건 2: 드롭다운 메뉴 닫혀있는데 드롭다운 클릭시 -> 드롭다운 열기 (toggleHandler 이용)
    // 조건 3: 드롭다운 메뉴 이외의 공간 클릭시 -> 드롭다운 닫기 (useEffect 부분 이용)

    const [isOpen, setIsOpen] = useState(initialValue);  // isOpen은 드롭다운메뉴가 열려있는가라는 의미로 작성한 이름이다.
    const dropdownRef = useRef(null);  // 나중에 외부컴포넌트에서 태그안에 props속성값으로 드롭다운 메뉴를 지정하여 dropdownRef의 초기값을 넣어줌으로써, 드롭다운 메뉴를 참조하게 한다.

    const toggleHandler = () => {  // 드롭다운 메뉴 열린 상태: 닫기로 변경, 드롭다운 메뉴 닫힌 상태: 열기로 변경.
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const onClick = (event) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(event.target)) {  // 화면내에서 '드롭다운 메뉴' 이외의 해당사항 없는 공간 클릭할시에
                // event.target 은 이벤트가 발생한, 즉, 클릭한 부분을 의미한다.
                // 그러므로, '참조로 지정한 드롭다운 메뉴가 존재하며 && 현재 클릭한 부분이 참조한 부분이 아닐때'라는 if조건문이 된다.
                // 즉, 드롭다운 메뉴의 클릭은 event.target과 dropdownRef.current가 같아지는 때이다.
                setIsOpen(!isOpen)  // 드롭다운 세부메뉴 펼쳐져있는거 다시 접어서 해제시킴.
            }
        };

        if (isOpen) {  // isOpen == true 일시에 (즉, 드롭다운 메뉴가 클릭되었을때)
            window.addEventListener("click", onClick);  // 마우스클릭시, onClick 이벤트함수 실행하도록 조건 add.
            // 참고로 window 객체는 모든 객체들의 조상이므로, 그냥 보이는 화면내 전부라고 생각해도 좋다.
        }

        return () => {
            window.removeEventListener("click", onClick);  // 마우스 클릭 조건에 add해두었던 onClick 이벤트함수를, 컴포넌트 언마운트(사망) 직전에 조건 제거함.
            // 참고로 window 객체는 모든 객체들의 조상이므로, 그냥 보이는 화면내 전부라고 생각해도 좋다.
        };
    }, [isOpen]);

    return [isOpen, dropdownRef, toggleHandler];  // 나중에 외부컴포넌트에서 태그안에 props속성값으로 이 세가지를 직접 사용하거나 값을 넣어주어야한다.
}

export default useDetectDropdown;