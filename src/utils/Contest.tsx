import { Problems } from "../components/Main";
import arrayShuffle from 'array-shuffle';

export interface HashMap<Number, T2> {
    [Key: number]: T2;
}

export interface Problem {
    contestId: number;
    index: string;
    name: string;
    rating: number;
    link: string;
}

export class Contest {
    by_index: HashMap<number, Array<Problem>>;
    ratings:  Set<number>;

    constructor(allProblems?: Problems) {
        this.by_index = {};
        this.ratings = new Set();

        if (allProblems) {
            allProblems?.result.problems.forEach((problem) => {
                if (problem.rating) {
                    this.by_index[problem.rating] = [];
                    this.ratings.add(problem.rating)
                }
            });
            allProblems?.result.problems.forEach((problem) => {
                if (problem.rating) {
                    this.by_index[problem.rating].push({
                        contestId: problem.contestId,
                        name: problem.name,
                        rating: problem.rating,
                        index: problem.index,
                        link: "https://codeforces.com/contest/" + problem.contestId +  "/problem/" + problem.index
                    });
                }
            });
        }
    }

    generate = (): Array<Problem> => {
        var contestProblems: Array<Problem> = [];
        var contestRatings: Array<number> = [];

        this.ratings.forEach((rating) => {
            contestRatings.push(rating)
        });

        contestRatings = arrayShuffle(contestRatings);

        while(contestRatings.length > 6) {
            contestRatings.pop();
        }
        
        contestRatings.sort((a, b) => a - b);
        
        contestRatings.forEach((rating) => {
            if (this.by_index[rating] !== undefined) {
                var randomIndex = Math.floor(Math.random() * this.by_index[rating].length)
                contestProblems.push(this.by_index[rating][randomIndex]);
            }
        });

        return contestProblems;
    }


}