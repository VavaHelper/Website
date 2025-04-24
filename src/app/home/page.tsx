import { Nav } from "../components/nav";
import { SideBar } from "../components/side-bar";
import { CardProps, Card } from "./components/card";

const cards: Array<CardProps> = [
    { title: "Agents", imagePath: "https://placehold.co/600x400", information: "Testando 1", informationText: " Sejam Bem Vindos ao VavaHelper!" },
    { title: "Pixel", imagePath: "https://placehold.co/600x400", information: "Testando 2", informationText: " Sejam Bem Vindos ao VavaHelper!" },
    { title: "Move", imagePath: "https://placehold.co/600x400", information: "Testando 3", informationText: " Sejam Bem Vindos ao VavaHelper!" }
]

export default function Home(){
    return (
        <main>
            <Nav/> 
            <SideBar/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-1/2 flex gap-20">
                {cards.map((card) => (
                    <Card key={card.title} title={card.title} imagePath={card.imagePath} width="300px" information={card.information} informationText={card.informationText}/>
                ))}
            </div>
        </main>
    )
}