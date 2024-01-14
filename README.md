# 4-Keyes-Challenge, The JavaScript Quiz Game

Weclome to the Quiz Game! This game has the user answer a series of questions and returns a score based off of how many questions are answered correctly.

## Description

This quiz game is a single-page application that runs in the web browser. Users will go through a series of questions and answer within a set time limit. The score is based on the number of correct answers.

## Features

- A countdown timer that gives the user 60 seconds to complete the quiz.
- A score tracking system that increases the score with each correct answer.
- Time penalty for incorrect answers, reducing the remaining time by 10 seconds.
- High score tracking that saves and displays the user's initials with their score.

### How to Play

- Click the "Start Quiz" button to begin.
- Answer the questions by clicking on your choice. 
- Your score and the remaining time will be displayed at the top.
- Once all questions have been answered or time runs out, the game ends.
- Enter your initials to save your score to the high score list.

## High Score Functionality

High scores are saved in the browser's local storage, so they persist across sessions. The top scores will be displayed in a list, sorted from highest to lowest.

### Technologies Used

- HTML
- CSS
- JavaScript
- Local Storage API for saving high scores
