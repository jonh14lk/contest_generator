import { useEffect, useState } from "react";
import Home from '../Home'
import api from '../../services/api'
import "./index.css";

export interface ProblemsInterface {
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
    const [problems, setProblems] = useState<ProblemsInterface>();
    
    useEffect(() => {
        api
        .get("/problemset.problems")
        .then((response) => setProblems(response.data))
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div>
          <Home problems={problems} setProblems={setProblems}></Home>
        </div>
    );
}

export default Main;