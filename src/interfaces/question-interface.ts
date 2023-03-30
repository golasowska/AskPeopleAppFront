import {Answer} from "./answer-interface";

export interface QuestionInterface {
    name: string,
    type: "open" | "radio" | "checkbox",
    answers: Answer[];
}