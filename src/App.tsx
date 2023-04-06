import React, {useState} from 'react';
import {Main} from "./components/layout/Main";
import {Route, Routes} from "react-router-dom";
import {QuestionForm} from "./components/Question/QuestionForm";
import {Header} from "./components/layout/Header";
import {AnswerView} from "./components/Answer/AnswerView";
import {NotFoundView} from "./components/layout/NotFoundView";
import {ThemeContext} from "./contexts/theme.context";

export const App = () => {
    const isBrowserDefaultDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState<string>(isBrowserDefaultDark() ? 'dark' : 'light');

  return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        <div className={`outer ${theme}`}>
            <Header/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/questions" element={<Main/>} />
                <Route path="/questions/add" element={<QuestionForm/>} />
                <Route path="/questions/:id" element={<AnswerView/>} />
                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </div>
      </ThemeContext.Provider>
  );
}

// 4/4 - 10 minuta
