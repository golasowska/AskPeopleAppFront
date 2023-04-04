import React from "react";

import './Hero.scss';
import {Arrow} from "../common/Arrow";

export const Hero = () => {
    return (
        <main>
            <h2>
                ask
                <span>
                    Got a dilemma?  Ask a question and see how others answer it.
                </span>
            </h2>
            <h2>a question</h2>
            <h2>
                answer
                <span>answer the questions that others have asked, help others find the answer.</span>
            </h2>
            <Arrow/>
        </main>
    )
}