import { ProblemsInterface } from "../Main";
import "./index.css";

interface Props {
    problems: ProblemsInterface | undefined;
    setProblems: React.Dispatch<React.SetStateAction<ProblemsInterface | undefined>>;
}

const Home: React.FC<Props> = ({ problems, setProblems }) => {
    const renderList = () => {
        return problems?.result.problems.map((problem) => {
          return (
            <div>
                <h1>{problem.name}</h1>
                <p>Contest Id: {problem.contestId}</p>
                <p>Index: {problem.index}</p>
                <p>Rating: {problem.rating}</p>
            </div>
          );
        });
      };

    return (
        <ul>{renderList()}</ul>
    );
}

export default Home;