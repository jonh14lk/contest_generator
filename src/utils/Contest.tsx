import { Problems } from "../components/Main";
import { User } from "../utils/User";
import arrayShuffle from "array-shuffle";

export interface Problem {
  contestId: number;
  index: string;
  name: string;
  rating: number;
  link: string;
}

export class Contest {
  problems: Array<Problem>;

  constructor(allProblems?: Problems) {
    this.problems = [];

    allProblems?.result.problems.forEach((problem) => {
      if (problem.rating) {
        this.problems.push({
          contestId: problem.contestId,
          name: problem.name,
          rating: problem.rating,
          index: problem.index,
          link:
            "https://codeforces.com/contest/" +
            problem.contestId +
            "/problem/" +
            problem.index,
        });
      }
    });

    this.problems.sort((a, b) => a.rating - b.rating);
  }

  findFirstWithRatingAtLeastX = (x: number) => {
    if (
      !this.problems.length ||
      this.problems[this.problems.length - 1].rating < x
    ) {
      return -1;
    }

    let left = 0,
      right = this.problems.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.problems[mid].rating >= x) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };

  findLastWithRatingAtMostX = (x: number) => {
    if (!this.problems.length || this.problems[0].rating > x) {
      return -1;
    }

    let left = 0,
      right = this.problems.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right + 1) / 2);
      if (this.problems[mid].rating <= x) {
        left = mid;
      } else {
        right = mid - 1;
      }
    }

    return left;
  };

  generate = async (
    handle: string,
    ratingLowerBound: number,
    ratingUpperBound: number,
    ProblemsNumber: number
  ): Promise<Array<Problem>> => {
    var user: User = new User(handle);
    await user.setup();

    var left_index = this.findFirstWithRatingAtLeastX(ratingLowerBound);
    var right_index = this.findLastWithRatingAtMostX(ratingUpperBound);
    var len = right_index - left_index + 1;

    if (left_index == -1 || right_index == -1) {
      return [];
    }

    var validProblems: Array<Problem> = [];

    while (left_index < right_index) {
      if (!user.solved(this.problems[left_index])) {
        validProblems.push(this.problems[left_index]);
      }
      left_index++;
    }

    if (validProblems.length < ProblemsNumber) {
      return [];
    }

    return arrayShuffle(validProblems)
      .slice(0, ProblemsNumber)
      .sort((a, b) => a.rating - b.rating);
  };
}
