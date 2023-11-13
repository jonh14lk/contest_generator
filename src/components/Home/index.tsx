import { ChangeEvent, useState } from "react";
import { Problems } from "../Main";
import { Contest, Problem } from "../../utils/Contest";
import {
  Box,
  TextField,
  Button,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  AppBar,
  Typography,
  Toolbar,
  TableBody,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from "@mui/material";
import { cardBoxStyle, boxStyle, ButtonStyle, TableStyle } from "./styles";

interface Props {
  problems: Problems | undefined;
}

const Home: React.FC<Props> = ({ problems }) => {
  const INF_RATING = 100000;
  const IS_INTEGER_REGEX = /^[0-9\b]+$/;
  const CF_LOGO_PATH = "./../../../assets/cf.png";

  const [contestProblems, setContestProblems] = useState<Array<Problem>>([]);
  const [lowerBoundInputValue, setLowerBoundInputValue] = useState<string>("");
  const [upperBoundInputValue, setUpperBoundInputValue] = useState<string>("");
  const [numberOfProblems, setNumberOfProblems] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);

  var contest: Contest = new Contest(problems);

  const renderList = () => {
    return contestProblems.map((problem) => {
      return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            {problem.name}
          </TableCell>
          <TableCell align="right">{problem.contestId}</TableCell>
          <TableCell align="right">{problem.rating}</TableCell>
          <TableCell align="right">
            <a
              href={problem.link}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button size="small" color="primary" variant="contained">
                Link
              </Button>
            </a>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderContest = () => {
    if (!init) {
      return;
    } else if (isLoading) {
      return (
        <Box sx={{ display: "flex", m: 20 }}>
          <CircularProgress />
        </Box>
      );
    } else if (!contestProblems?.length) {
      return (
        <Alert severity="error" sx={{ display: "flex", m: 20 }}>
          Cannot create contest.
        </Alert>
      );
    }

    return (
      <TableContainer>
        <Table sx={TableStyle}>
          <TableHead>
            <TableRow>
              <TableCell>Problem Name</TableCell>
              <TableCell align="right">ContestId</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderList()}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const handle = data.get("handle")?.toString() ?? "";
    const ratingLowerBound =
      lowerBoundInputValue.length == 0 ? 0 : parseInt(lowerBoundInputValue, 10);
    const ratingUpperBound =
      upperBoundInputValue.length == 0
        ? INF_RATING
        : parseInt(upperBoundInputValue, 10);
    const ProblemsNumber = parseInt(numberOfProblems, 10);
    setContestProblems(
      await contest.generate(
        handle,
        ratingLowerBound,
        ratingUpperBound,
        ProblemsNumber
      )
    );
    setInit(true);
    setIsLoading(false);
  };

  const isNumeric = (number: string) => {
    return number.length === 0 || IS_INTEGER_REGEX.test(number);
  };

  const handleLowerBoundInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (isNumeric(event.target.value)) {
      setLowerBoundInputValue(event.target.value);
    }
  };

  const handleUpperBoundInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (isNumeric(event.target.value)) {
      setUpperBoundInputValue(event.target.value);
    }
  };

  const handleNumberOfProblemsChange = (event: SelectChangeEvent) => {
    setNumberOfProblems(event.target.value);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Contest Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={boxStyle}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={cardBoxStyle}
        >
          <TextField
            id="handle"
            name="handle"
            label="Your CF handle"
            variant="outlined"
          />
          <TextField
            id="lower_bound_rating"
            name="lower_bound_rating"
            label="From Rating"
            variant="outlined"
            onChange={handleLowerBoundInputChange}
            value={lowerBoundInputValue}
          />
          <TextField
            id="upper_bound_rating"
            name="upper_bound_rating"
            label="To Rating"
            variant="outlined"
            onChange={handleUpperBoundInputChange}
            value={upperBoundInputValue}
          />
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            label="To Rating"
            value={numberOfProblems}
            onChange={handleNumberOfProblemsChange}
          >
            <MenuItem value={1}>1 problem</MenuItem>
            <MenuItem value={2}>2 problems</MenuItem>
            <MenuItem value={3}>3 problems</MenuItem>
            <MenuItem value={4}>4 problems</MenuItem>
            <MenuItem value={5}>5 problems</MenuItem>
            <MenuItem value={6}>6 problems</MenuItem>
            <MenuItem value={7}>7 problems</MenuItem>
            <MenuItem value={8}>8 problems</MenuItem>
          </Select>
          <Button sx={ButtonStyle} type="submit" variant="contained">
            Generate Problemset
          </Button>
        </Box>
        {renderContest()}
      </Box>
    </div>
  );
};

export default Home;
