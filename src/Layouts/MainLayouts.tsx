import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Confetti from "react-confetti";
import { useState, useEffect, useContext } from "react";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Dialog } from 'primereact/dialog'; // Import Dialog from PrimeReact
import { AuthContext } from "../Provider/AuthProvider";

const MainLayouts = () => {
    const [pieces, setPieces] = useState(200);
    const [showConfetti, setShowConfetti] = useState(false);
    const [levelOne, SetLevelOne] = useState<boolean>();
    const [levelTwo, SetLevelTwo] = useState<boolean>();
    const [levelTop, SetLevelTop] = useState<boolean>();
    const [visible, setVisible] = useState<boolean>(false);
    const [allLengthQuestion, setLengthQuestion] = useState<number>();
    const authContext = useContext(AuthContext);

    console.log(levelOne, levelTwo, levelTop);

    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const triggerConfetti = () => {
        setShowConfetti(true);
        setVisible(true);

        const interval = setInterval(() => {
            setPieces(prev => Math.max(prev - 20, 0));
        }, 500);

        setTimeout(() => {
            clearInterval(interval);
            setShowConfetti(false);
        }, 8000);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!user?.email) return;
    
            try {
                const response = await fetch(`http://localhost:5000/single-user-all-questions/${user?.email}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const questionsData = await response.json();
                
                SetLevelOne(questionsData?.levelOne);
                SetLevelTwo(questionsData?.levelTwo);
                SetLevelTop(questionsData?.levelTop);
                setLengthQuestion(questionsData?.questions?.length);

            } catch (error) {
                console.error('Error fetching questions:', error);
                
            }
        };
    
        fetchQuestions();
    }, [user?.email]);    

    useEffect(() => {
        const milestoneCheck = () => {
            if (levelOne || levelTwo || levelTop) {
                triggerConfetti();
                setVisible(true);
            }
        };
        
        milestoneCheck();
    }, [levelOne, levelTwo, levelTop]);    

    const handleOkClick = async () => {
        try {
            const response = await fetch(`http://localhost:5000/update-level/${user?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    levelOne: false,
                    levelTwo: false,
                    levelTop: false
                }),
            });

            if (response.ok) {
                setVisible(false);
            } else {
                console.error('Failed to update user level');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />

            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={pieces}
                    gravity={0.1}
                    wind={0.01}
                    recycle={false}
                />
            )}

            {/* PrimeReact Dialog */}
            <Dialog header="Milestone Achieved!" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="flex flex-column align-items-center">
                    <p>Congratulations! You've reached a milestone!</p>
                    <button className="bg-button" onClick={handleOkClick}>Ok</button>
                </div>
            </Dialog>
        </>
    );
};

export default MainLayouts;
