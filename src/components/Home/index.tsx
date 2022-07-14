import { useState } from "react";
import { Problems } from "../Main";
import { Contest, Problem } from "../../utils/Contest"
import "./index.css";

interface Props {
    problems: Problems | undefined;
}

const Home: React.FC<Props> = ({ problems }) => {
    const [contestProblems, setContestProblems] = useState<Array<Problem>>([]);

    var contest: Contest = new Contest(problems);

    const renderList = () => {
        return contestProblems.map((problem) => {
          return (
            <div>
                <h3>{problem.name}</h3>
                <p>Contest Id: {problem.contestId}</p>
                <p>Rating: {problem.rating}</p>
                <a href={problem.link}>Link</a>
            </div>
          );
        });
    };

    const handleClick = () => {
      setContestProblems(contest.generate());
    };

    return (
        <div className="AddPattern">
          <ul>{renderList()}</ul>
          <button className="PatternBtn" onClick={handleClick}>
            Generate Contest
          </button>
        </div>
    );
}

export default Home;