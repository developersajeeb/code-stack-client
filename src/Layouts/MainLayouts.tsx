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
import { Button } from "primereact/button";
import { useQuery } from "@tanstack/react-query";

const MainLayouts = () => {
    const [pieces, setPieces] = useState(200);
    const [showConfetti, setShowConfetti] = useState(false);
    const [manualLevelUpdate, setManualLevelUpdate] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [allLengthQuestion, setLengthQuestion] = useState<number>();
    const authContext = useContext(AuthContext);
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

    const fetchQuestions = async (email: string | null | undefined) => {
        const response = await fetch(`http://localhost:5000/single-user-all-questions/${email}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const { data: questionsData = {} } = useQuery(
        ['userQuestions', user?.email],
        () => fetchQuestions(user?.email),
        {
            enabled: !!user?.email,
            refetchInterval: 5000,
            refetchOnWindowFocus: true,
        }
    );

    useEffect(() => {
        if (questionsData) {
            setLengthQuestion(questionsData.questionCount);
            setManualLevelUpdate(questionsData.manualLevelUpdate);
        }
    }, [questionsData]);

    useEffect(() => {
        if (manualLevelUpdate && [5, 10, 20].includes(allLengthQuestion)) {
            triggerConfetti();
        }
    }, [manualLevelUpdate, allLengthQuestion]);

    const handleOkClick = async () => {
        setButtonLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/update-level/${user?.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                setButtonLoading(false);
                setVisible(false);
            } else {
                console.error('Failed to update milestone status');
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
            <Dialog header="Level Achieved! 👏" visible={visible} onHide={() => setVisible(false)} closable={false} className="!max-w-[400px] !mx-4">
                <div>
                    <p><span className="font-medium word-break">Congratulations! 🎉</span> You've reached a Level! Please check your profile dashboard.</p>

                    <div className={`mt-7 relative ${buttonLoading ? 'max-w-[193px]' : 'max-w-[169px]'} mx-auto`}>
                        <div className="absolute h-3 w-3 z-10 -top-1 -right-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#269782] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#269782]"></span>
                            </span>
                        </div>
                        <Button
                            label="Make as read"
                            className="cs-button whitespace-nowrap"
                            onClick={handleOkClick}
                            disabled={buttonLoading}
                            loading={buttonLoading}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default MainLayouts;
