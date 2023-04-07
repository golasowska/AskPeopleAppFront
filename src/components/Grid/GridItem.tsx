import './GridItem.scss';

interface Props {
    children: string | JSX.Element;
    classProp: 'open' | 'radio' | 'checkbox' | 'new';
}

export const GridItem = ({ children, classProp}: Props) => {
    return <div className={`grid__item grid__item--${classProp}`}>{children}</div>
}