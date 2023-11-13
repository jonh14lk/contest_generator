import api from "../services/api";
import { Problem } from "./Contest";

export interface Submissions {
  status: string;
  result: {
    contestId: string;
    verdict: string;
    problem: {
      index: string;
    };
  }[];
}

export class User {
  submissions: Submissions;
  handle: string;
  problemsAccepted: Set<string>;

  constructor(handle: string) {
    this.handle = handle;
    this.problemsAccepted = new Set();
    this.submissions = {
      status: "NOT OK",
      result: [],
    };
  }

  setup = async () => {
    if (!this.handle.length) {
      return;
    }

    this.submissions = await this.getSubmissions(this.handle);

    this.submissions.result.forEach((submission) => {
      if (submission.verdict === "OK") {
        this.problemsAccepted.add(
          submission.contestId + submission.problem.index
        );
      }
    });
  };

  getSubmissions = async (handle: string): Promise<Submissions> => {
    var url = "/user.status?handle=" + handle;
    try {
      var response = await api.get(url);
      return response.data;
    } catch (err) {
      return {
        status: "NOT OK",
        result: [],
      };
    }
  };

  solved = (problem: Problem): boolean => {
    var id = problem.contestId + problem.index;
    return this.problemsAccepted.has(id);
  };
}
