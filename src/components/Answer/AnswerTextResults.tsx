import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import {EffectCoverflow} from "swiper";

import {QuestionInterface} from "../../interfaces/question-interface";

import './AnswerTextResults.scss';

interface Props {
    formData: QuestionInterface;
}

export const AnswerTextResults = (props: Props) => {

    const {name, answers} = props.formData;

    return <div className="results__container">
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            pagination={false}
            modules={[EffectCoverflow]}
            className="swiper-answer"
            slidesPerView="auto"
            centeredSlides={true}

            coverflowEffect= {{
                rotate: 35,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false,
            }}
        >
            {answers.map(a => <SwiperSlide className="swiper-slide" key={a.id}>{a.text}</SwiperSlide>)}
        </Swiper>
    </div>
}