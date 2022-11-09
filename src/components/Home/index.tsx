import { useState } from "react"
import { Problems } from "../Main"
import { Contest, Problem } from "../../utils/Contest"
import { Box, TextField, Button, Table, TableContainer, TableRow, TableHead, TableCell, AppBar, Typography, Toolbar, TableBody } from "@mui/material";
import  { cardBoxStyle, boxStyle, ButtonStyle, TableStyle } from './styles';

interface Props {
    problems: Problems | undefined;
}

const Home: React.FC<Props> = ({ problems }) => {
    const [contestProblems, setContestProblems] = useState<Array<Problem>>([]);

    var contest: Contest = new Contest(problems);

    const renderList = () => {
        return contestProblems.map((problem) => {
          return (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {problem.name}
              </TableCell>
              <TableCell align="right">{problem.contestId}</TableCell>
              <TableCell align="right">{problem.rating}</TableCell>
              <TableCell align="right">
                <a href={problem.link} target="_blank" style={{textDecoration: 'none'}}>
                    <Button 
                      size="small" 
                      color="primary"
                      variant="contained"
                    >
                      Link
                    </Button>
                  </a>
              </TableCell>
            </TableRow>
          );
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const handle = data.get('handle')?.toString();
      if (handle) {
        setContestProblems(await contest.generate(handle));
      }
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={cardBoxStyle}>
              <TextField
                id="handle"
                name="handle"
                label="Your CF handle"
                variant="outlined"
              />
              <Button
                sx={ButtonStyle}
                type="submit"
                variant="contained"
              >
              Generate Problemset
              </Button>
            </Box>
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
              <TableBody>
                {renderList()}
              </TableBody>
              </Table>
            </TableContainer>
        </Box>
      </div>
    );
}

export default Home;