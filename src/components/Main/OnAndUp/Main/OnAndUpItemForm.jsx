import React from "react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import component from "./TabComponent";
import "./css/itemForm.css";
import { useEffect } from "react";
import { headerGnbOpcity } from "../../../../app/headerStateSlice";

function OnAndUpItemForm() {
  var { state, pathname } = useLocation(0);
  const [tabIndex, setTabIndex] = useState();
  const dispatch = useDispatch();

  const [item, setItem] = useState([]);
  const [tmpState, setTmpState] = useState([]);
  const [tmpStateDep, setTmpStateDep] = useState([]);
  const onAndUpMenuData = "/db/onAndUpMenuData.json";

  useEffect(() => {
    (async () => {
      const response = await fetch(onAndUpMenuData);
      const json = await response.json();
      setItem(json);
    })();

  }, []);

  var tmp = [];
  console.log(pathname)
  useEffect(() => {
    if(state == null) {
      
      item.map((el) => {
        console.log('pathname',pathname,'el.onAndUpItemAddress',el.onAndUpItemAddress)
        if(pathname.indexOf(el.onAndUpItemAddress) > 0) {
          console.log('el',el)
          setTmpState(el);
          setTmpStateDep(el.dep);
        }
      })
      console.log(tmp)
    }
    else {
      console.log('state',state)
    }
  },[item]);


  function currentIndex(index) {
    setTabIndex(index);
  }
  useEffect(() => {
    dispatch(headerGnbOpcity("1"));
  });
  useEffect(() => {
    console.log('tmpState',tmpState)
  },[tmpState])


  return (
    <div className="item-form">
      <div className="item-inner">
        <div className="item-location">
          {
            state?
              tabIndex === undefined
                ? `Chemiverse On&Up ▶ ${state.menu} ▶ ${state.dep[0]} `
                : `Chemiverse On&Up ▶ ${state.menu} ▶ ${state.dep[tabIndex]} `
              :
              null
          }
        </div>
        <div className="item-title">{ state? state.menu : null }</div>
        <div className="item-contents">{ state? state.explanation : null }</div>
        <ul className="item-btn-area">
          {
            state ? 
              state.dep.map((item, index) => (
                <li
                  key={index}
                  className="item-btn"
                  onClick={() => currentIndex(index)}
                >
                  {item}
                </li>
                ))
              : 
              tmpStateDep.map((item, index) => (
                <li
                  key={index}
                  className="item-btn"
                  onClick={() => currentIndex(index)}
                >
                  {item}
                </li>
                ))
            }
        </ul>
        <div className="item-box">
          {
            state ? 
              tabIndex === undefined
              ? component[state.id].content[0]
              : component[state.id].content[tabIndex]
            :
            tabIndex === undefined
              ? component[tmpState.id] && component[tmpState.id].content[0]
              : component[tmpState.id] && component[tmpState.id].content[tabIndex]
            }
        </div>
      </div>
    </div>
  );
}

export default OnAndUpItemForm;