import './GridItem.scss';
import {createRef, useEffect, useState} from "react";

interface Props {
    cord: {
        x: number,
        y: number,
    },
    children: string | JSX.Element,
}

export const GridItem = ({cord, children}: Props) => {
    const [{xc, yc}, setC] = useState<{xc: number, yc: number}>({xc: 1, yc: 1});

    const itemEl = createRef<HTMLDivElement>();

    useEffect(() => {
        const w: number = itemEl.current ? itemEl.current.getBoundingClientRect().x / 100  : 1;
        const h: number  = itemEl.current ? itemEl.current.getBoundingClientRect().y / 50  : 1;
        setC({xc: Math.ceil(w), yc: Math.ceil(h)});
    }, []);



    return <div className="grid__item"
                ref={itemEl}
                style={{transform: `translate3d(${((cord.x + xc)).toFixed(1)}%, 
                ${((cord.y - yc)).toFixed(1)}%, 0px) scale3d(1, 1, 1) 
                rotateX(${((cord.x - xc)).toFixed(1)}deg) 
                rotateY(${((cord.y - yc)).toFixed(1)}deg) 
                rotateZ(0deg) skew(0deg, 0deg)`}}>
        {children}
        <p>{xc} {yc}</p>
    </div>
}