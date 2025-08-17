// TODO: Escolher alguém para realizar tela

import styles from "./pixel.module.css";
import { Nav } from '@/app/components/nav';
import { SideBar } from '@/app/components/side-bar';

export default function Movi() {
    return (
            <div className="global">
                <Nav/>
                <SideBar/>

                <main className={styles.container}>

                </main>        
            </div>
        );
}