import './Title.scss';

interface Props {
    children: string | JSX.Element;
}

export const Title = ({children}: Props) => {
    return <h1>{children}</h1>;
}