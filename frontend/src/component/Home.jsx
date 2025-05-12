/**
 * 
 * 
 * 
 * 1. Tagline + Introduction
Welcome to <re/code>! Your all-in-one coding platform for quick code execution, learning, and practice. Whether you're a beginner or an expert, <re/code> provides you with the tools to write, compile, and test code in real-time. Improve your skills with interactive coding quizzes and solve challenges in various programming languages.

One-Line Code Compilation: Instantly compile and run your code in a single line.
Coding Quizzes: Test your knowledge and compete with others.
Practice Questions: Master coding problems and enhance your problem-solving skills.
Start coding and learning today with <re/code>!

2. For Aspiring Developers
Learn. Practice. Compete. At <re/code>, we believe in learning through practice. Whether you’re preparing for interviews or just trying to sharpen your coding skills, our platform provides the best tools for both quick code compilation and interactive learning.

Instant Code Execution: Write your code and see the output immediately—no setup needed.
Practice Coding Challenges: Thousands of problems in various difficulty levels to help you improve.
Take Quizzes: Engage with quizzes to evaluate your understanding and track your progress.
Join <re/code> now and take the next step towards becoming a coding master!

3. Interactive Learning and Coding
Elevate Your Coding Skills with <re/code> Learn to code at your own pace with interactive coding quizzes and hands-on practice problems. Instantly compile and test your code in any language you prefer. <re/code> is perfect for beginners, professionals, and coding enthusiasts who want to improve their coding skills or test their knowledge.

Real-Time Code Compilation: Write and run code in a single line.
Coding Quizzes: Fun and challenging quizzes for all levels.
Practice Coding Questions: From easy to expert-level challenges.
Start coding now and become a better developer with <re/code>!

4. Engage and Improve Your Coding
Master Coding with Quick Feedback Boost your coding skills with <re/code>. We provide a real-time coding environment where you can write, compile, and test your code on the fly. Need more practice? Dive into our extensive library of coding questions and quizzes to evaluate your progress.

One-Line Code Compilation: Instantly compile code and get results with ease.
Practice Questions: Solve coding challenges designed for all skill levels.
Interactive Quizzes: Learn, test, and improve your skills in real-time.
Join the coding community at <re/code> and start your journey today!

5. For Learners and Developers
Practice. Code. Learn. Whether you're a coding newbie or a seasoned developer, <re/code> is the perfect platform to practice coding problems, take quizzes, and compile your code instantly. Learn by doing with real-time feedback and challenges to help you grow.

One-Line Code Compilation: Quickly test your code and see the results instantly.
Coding Quizzes: A wide range of quizzes to test your programming knowledge.
Practice Problems: Improve your problem-solving skills with challenges designed for every level.
Start coding now and take your skills to the next level with <re/code>!

6. Your Coding Playground
Where Coding Meets Fun At <re/code>, we make coding fun and engaging. Instantly compile code with just one line of input and enhance your coding abilities with our interactive quizzes and coding challenges. From beginner-friendly quizzes to complex coding problems, we have it all.

One-Line Code Compilation: Compile your code instantly and get feedback in seconds.
Take Coding Quizzes: Test your knowledge and earn points as you learn.
Practice Coding Questions: Solve problems across different difficulty levels and languages.
Join the <re/code> community and start practicing today!

7. Code, Test, and Improve
Perfect Your Coding Skills with <re/code> Improve your coding with real-time code compilation and interactive quizzes. Whether you’re a beginner or a professional, <re/code> offers an exciting platform to practice, test, and improve your programming skills.

Quick Code Execution: Test and compile code instantly with a one-line compiler.
Practice Coding Questions: Build your problem-solving skills with new challenges.
Quizzes to Test Your Knowledge: Take coding quizzes and challenge yourself with new concepts.
Get started now with <re/code> and become the coder you always wanted to be!

8. Start Coding in Seconds
Instant Code Compilation & Practice Coding made easy with <re/code>. Write and compile code in one line, practice solving coding problems, and take quizzes to test your knowledge. Our platform is designed for quick learning and fast feedback to help you grow as a developer.

Instant Code Compilation: See results in seconds with a one-line compiler.
Coding Quizzes: Interactive quizzes for all levels.
Practice Questions: Thousands of coding challenges to master your skills.
Start coding today with <re/code> and improve your development skills in real-time!

9. Start Coding with <re/code>
Build, Compile, and Learn Welcome to <re/code>, your go-to platform for learning to code. Write, compile, and test code instantly. Take coding quizzes to improve your knowledge and practice programming with real-world challenges.

One-Line Code Compilation: Fast, real-time code execution.
Quizzes: Learn new concepts and test your skills with interactive quizzes.
Coding Challenges: Practice questions to improve your coding proficiency.
Ready to code? Join <re/code> and get started today!









*/

import styled from "styled-components";
import homePageBg from "../assets/Welcome to recode.png";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <HomeWrapper>
      {" "}
      <header>
        <h1>Welcome to {"<re/code>"}</h1>
        <p>
          Your all-in-one coding platform for quick code execution, coding
          quizzes, and practice challenges
        </p>
      </header>
      <section className="features">
        <div className="feature">
          <h3>One-Line Code Compilation</h3>
          <p>
            Instantly write and run your code in a single line, with no setup
            required. Perfect for quick testing and debugging.
          </p>
        </div>
        <div className="feature">
          <h3>Coding Quizzes</h3>
          <p>
            Take interactive quizzes to test your programming knowledge and
            improve your coding skills. Compete with others and track your
            progress!
          </p>
        </div>
        <div className="feature">
          <h3>Practice Coding Questions</h3>
          <p>
            Enhance your problem-solving skills with thousands of coding
            challenges, ranging from beginner to expert level.
          </p>
        </div>
      </section>
      <section className="cta">
        <h2>Ready to Start Coding?</h2>
        <p>
          Join {"<re/code>"} today and take your coding skills to the next
          level!
        </p>
        <NavLink to={`/editor`}>
          <button>Start Coding Now</button>
        </NavLink>
      </section>
      <footer>
        {/* <p style="text-align: center; padding: 20px; background-color: #0d47a1; color: white;">&copy; 2024 {"<re/code>"}. All Rights Reserved.</p> */}
      </footer>
    </HomeWrapper>
  );
};
const HomeWrapper = styled.div`
  header {
    /* background-color: #0d47a1; */
    background-image: url(${homePageBg});
    background-repeat: no-repeat;
    object-fit: cover;
    background-size: 100%;
    color: #01010a;
    padding: 60px 0;
    text-align: center;
  }

  header h1 {
    font-size: 3rem;
    font-family: "Dancing Script", cursive;
  }

  header p {
    font-size: 1.2rem;
  }

  .features {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding: 50px;
    text-align: center;
    margin: 10px;
  }

  .feature {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: 0.3s ease;
  }

  .feature:hover {
    transform: translateY(-10px);
  }

  .feature h3 {
    color: #0d47a1;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .feature p {
    color: #555;
  }

  .cta {
    text-align: center;
    margin-top: 40px;
  }

  .cta button {
    background-color: #0d47a1;
    color: white;
    padding: 15px 30px;
    margin: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .cta button:hover {
    background-color: #1565c0;
  }

  @media (max-width: 768px) {
    .features {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .features {
      grid-template-columns: 1fr;
    }
  }
`;
export default Home;
