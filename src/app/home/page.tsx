import { span } from "motion/react-client";
import { Nav } from "../components/nav";
import { SideBar } from "../components/side-bar";
import { CardProps, Card } from "./components/card";

const cards: Array<CardProps> = [
    { 
        title: "Agents", 
        imagePath: "https://placehold.co/600x400", 
        informationText: " Sejam Bem Vindos ao VavaHelper!" 
    },
    { 
        title: "Pixel", 
        imagePath: "/imgs/molotov-lineup.png", 
        informationText: " Sejam Bem Vindos ao VavaHelper!" 
    },
    
    {   
        title: "Movi", 
        imagePath: "/imgs/movi.gif", 
        informationText: (
            <>
                Aqui você irá aprender tudo sobre como executar a movimentação perfeita de Valorant com cada agente, seja para jogar sozinho ou em equipe. Aprenderá também a realizar o famoso <span className="text-[#FF5252]">"</span>AD<span className="text-[#FF5252]">"</span> em seus adversários!
            </>
        )
    }
]

export default function Home(){
    return (
        <main>
            <Nav/> 
            <SideBar/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 flex gap-20">
                {cards.map((card) => (
                    <Card key={card.title} title={card.title} imagePath={card.imagePath} width="300px" informationText={card.informationText}/>
                ))}
            </div>
        </main>
    )
}