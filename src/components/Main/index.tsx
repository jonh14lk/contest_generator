import { useEffect, useState } from "react"
import Home from '../Home'
import api from '../../services/api'
import "./index.css"

export interface Problems {
    status: string;
    result: {
        problems: {
            contestId: number;
            index: string;
            name: string;
            rating: number;
        }[];
    };
}

const Main = () => {
    const [problems, setProblems] = useState<Problems>();
    
    useEffect(() => {
        const getProblems = () => {
            api.get("/problemset.problems").then((response) => {
                setProblems(response.data)
            })
            .catch((err) => {
                console.error(err);
            });
        }
        getProblems();
    }, []);

    return (
        <div>
          <Home problems={problems} ></Home>
        </div>
    );
}

export default Main;