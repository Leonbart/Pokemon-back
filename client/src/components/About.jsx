import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const DivAbout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${'' /* margin: 1rem 0; */}
    margin: 2.5rem auto;
    padding: 2rem;
    background-color: rgb(115, 115, 115, 0.8);
    color: rgba(230, 230, 230, 1);
    width: 60%
`;

const PDescription = styled.p`
    text-align: justify; 
`;

const DivBtnHome = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
`;


export default function About() {
    const navigate = useNavigate();

    return (
        <DivAbout>
            <h1>Pokémon App</h1>
            <h3>With this App you will be able to display all Pokémons and their stats.<br></br> You can also search them, filter and order them by some characteristic, and even create new ones.</h3>
            <PDescription>Pokémon is an electronic game series from Nintendo that debuted in Japan in February 1996 as Pokémon Green and Pokémon Red. The franchise later became wildly popular in the United States and around the world. The series, originally produced for the company's Game Boy line of handheld consoles, was introduced in 1998 to the United States with two titles, known to fans as Red and Blue. In the games, players assume the role of Pokémon trainers, obtaining cartoon monsters and developing them to battle other Pokémon. Pokémon became one of the most successful video game franchises in the world.</PDescription>
            <p>Created by: Leonardo Alabart</p>
            <DivBtnHome>
                <Button
                    text='back'
                    onClick={() => navigate(-1)}
                />
            </DivBtnHome>
        </DivAbout>
    )
}