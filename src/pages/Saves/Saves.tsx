import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

interface SavesData {
    _id: string;
    questionID: '';
    userEmail: '';
}

const Saves = () => {
    const [allSaves, setAllSaves] = useState<SavesData[]>([]);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    useEffect(() => {
        fetch(`http://localhost:5000/saves/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllSaves(data)
                // setTimeout(() => {
                //     setIsLoading(false);
                // }, 1000);
            })
    }, [])
    console.log(allSaves);

    return (
        <main>
            
        </main>
    );
};

export default Saves;