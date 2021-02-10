import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionsState, Difficulty } from "./API";
import { Button, CssBaseline, styled, Typography } from "@material-ui/core";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <CssBaseline />
      <Wrapper>
        <Title variant="h1">REACT QUIZ</Title>

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <StyledButton onClick={startTrivia}>Start</StyledButton>
        ) : null}

        {!gameOver && <Score>Score: {score}</Score>}

        {loading ? <p>Loading Questions...</p> : null}

        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <StyledButton onClick={nextQuestion}>Next Question</StyledButton>
        ) : null}
      </Wrapper>
    </>
  );
};
const Title = styled(Typography)({
  fontFamily: "Fascinate, cursive",
  backgroundImage: "linear-gradient(180deg, #fff, #87f1ff)",
  fontWeight: 400,
  backgroundSize: "100%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  filter: "drop-shadow(2px 2px #0085a3)",
  fontSize: "70px",
  textAlign: "center",
  margin: "20px",
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background:
    "url(https://github.com/weibenfalk/react-quiz/blob/master/src/images/nattu-adnan-unsplash.jpg?raw=true)",
  backgroundSize: "cover",
  height: "100vh",

  "& > *": {
    fontFamily: "Catamaran, sans-serif",
  },
});

const Score = styled(Typography)({
  color: "#fff",
  fontSize: "2rem",
  margin: "0",
});

const StyledButton = styled(Button)({
  cursor: "pointer",
  background: "linear-gradient(180deg, #ffffff, #ffcc91)",
  border: "2px solid #d38558",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "10px",
  height: "40px",
  margin: "20px 0",
  padding: "0 40px",
});

export default App;
