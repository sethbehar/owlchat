import styles from './Nav.module.css'
import { UserAuth } from "./AuthContext";
import Image from 'next/image';


export default function NavMenu() {
    const { user, googleSignIn, logOut } = UserAuth();

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (err) {
            console.log("Error during sign-in:", err.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log("Error during sign-out:", err.message);
        }
    };

    return (
        <nav className={styles.main}>
            <Image className={styles.owl} alt="owl" src={'owl.svg'} width={10} height={10}/>
            <h1 className={styles.title}>
                Owl Chat
            </h1>
            {user === null ? <button className={styles.btn} onClick={handleSignIn}>
                sign in
            </button>
                : <button className={styles.btn} onClick={handleSignOut}>
                    sign out
                </button>}
        </nav>
    )
}