import React from 'react';
import {Main} from "./components/layout/Main";
import {Route, Routes} from "react-router-dom";
import {QuestionForm} from "./components/Question/QuestionForm";
import {Header} from "./components/layout/Header";
import {AnswerView} from "./components/Answer/AnswerView";

export const App = () => {

  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/add" element={<QuestionForm/>} />
            <Route path="/:id" element={<AnswerView/>} />
        </Routes>
    </>
  );
}

// 4/4 - 10 minuta
