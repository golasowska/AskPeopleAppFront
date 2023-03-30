import './Title.scss';

interface Props {
    children: string;
}

export const Title = ({children}: Props) => {
    return <h1>{children}</h1>;
}