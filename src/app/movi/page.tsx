// TODO: Luninha -> Iniciar tela de Movi

import styles from "./movi.module.css";
import { Nav } from '../components/nav';
import { SideBar } from '../components/side-bar';

export default function Movi() {
    return (
            <div className="global">
                <Nav/>
                <SideBar/>

                <main className={styles.container}>
                    <h1 className={styles.card}></h1>

                    <div className={styles.cardGrid}>
                        <div className={styles.card}>
                            <h2>POP SWING</h2>
                            <p>Pop Swing, você continua se movimentando para tirar a precisão de mira do seu oponente.</p>
                        </div>
                    <div className={styles.card}>
                        <h2>AD AD (A DEAD)</h2>
                        <p>Movimentação Lateral "Para um lado e para o outro" para dificultar o tiro do inimigo.</p>
                        </div>
                        <div className={styles.card}>
                            <h2>STRAFING</h2>
                            <p>Se mover lateralmente, mantendo um ritmo e precisão em seus movimentos.</p>
                        </div>
                    </div>
                </main>
        
            </div>
        );
}