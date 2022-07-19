import { useState } from "react"
import { Problems } from "../Main"
import { Contest, Problem } from "../../utils/Contest"
import AddHandle from "../AddHandle"
import "./index.css"

interface Props {
    problems: Problems | undefined;
}

export interface Handle {
  name: string;
}

const Home: React.FC<Props> = ({ problems }) => {
    const [contestProblems, setContestProblems] = useState<Array<Problem>>([]);
    const [handle, setHandle] = useState<Handle>({ name: "" });

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

    const handleClick = async () => {
      setContestProblems(await contest.generate(handle.name));
    };

    return (
        <div>
          <ul>{renderList()}</ul>
          <AddHandle handle={handle} setHandle={setHandle}/>
          <button onClick={handleClick}>
            Generate Problemset
          </button>
        </div>
    );
}

export default Home;