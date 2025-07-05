import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Client } from "@gradio/client"; 

const quizQuestions = [
  { question: "What is the age of the universe?", options: ["13.8 billion years", "4.5 billion years", "10 million years"], answer: "13.8 billion years" },
  { question: "Which galaxy do we live in?", options: ["Andromeda", "Milky Way", "Whirlpool"], answer: "Milky Way" },
  { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn"], answer: "Jupiter" },
  { question: "What is the closest star to Earth?", options: ["Alpha Centauri", "The Sun", "Sirius"], answer: "The Sun" },
  { question: "What is the hottest planet in our solar system?", options: ["Venus", "Mercury", "Mars"], answer: "Venus" },
  { question: "Which planet is known for its rings?", options: ["Saturn", "Jupiter", "Uranus"], answer: "Saturn" },
  { question: "What is the name of our solar system?", options: ["Sol System", "Alpha System", "Orion System"], answer: "Sol System" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Mercury"], answer: "Mars" },
  { question: "What is the densest planet in our solar system?", options: ["Earth", "Saturn", "Venus"], answer: "Earth" },
  { question: "What is the coldest planet in the solar system?", options: ["Neptune", "Uranus", "Pluto"], answer: "Uranus" },
  { question: "Which planet has the longest day?", options: ["Venus", "Mercury", "Mars"], answer: "Venus" },
  { question: "What is the most volcanic body in the solar system?", options: ["Io", "Europa", "Mars"], answer: "Io" },
  { question: "Which planet is tilted on its side?", options: ["Uranus", "Neptune", "Saturn"], answer: "Uranus" },
  { question: "What is the brightest object in the night sky after the Moon?", options: ["Venus", "Jupiter", "Mars"], answer: "Venus" },
  { question: "Which planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth"], answer: "Mercury" },
  { question: "What is the largest moon in the solar system?", options: ["Ganymede", "Titan", "Callisto"], answer: "Ganymede" },
  { question: "Which planet has the Great Red Spot?", options: ["Jupiter", "Saturn", "Neptune"], answer: "Jupiter" },
  { question: "What is the smallest planet in the solar system?", options: ["Mercury", "Mars", "Pluto"], answer: "Mercury" },
  { question: "Which planet is known as the Morning Star?", options: ["Venus", "Mars", "Jupiter"], answer: "Venus" },
  { question: "What is the farthest planet from the Sun?", options: ["Neptune", "Uranus", "Pluto"], answer: "Neptune" }
];

const cosmicFacts = [
  "The universe is 13.8 billion years old.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Neutron stars can spin 600 times per second.",
  "A day on Venus is longer than a year on Venus.",
  "Jupiter has at least 95 moons.",
  "The largest volcano in the solar system is Olympus Mons on Mars.",
  "Saturn could float in water because it's mostly gas.",
  "The Milky Way has a supermassive black hole at its center.",
  "The Sun is actually white, but appears yellow from Earth.",
  "Mercury has no atmosphere to retain heat.",
  "A spoonful of neutron star matter would weigh billions of tons.",
  "Footprints on the Moon could last millions of years.",
  "Jupiter's Great Red Spot is a 400-year-old storm.",
  "Black holes warp space and time.",
  "There is ice at Mercury’s poles.",
  "The largest canyon in the solar system is Valles Marineris on Mars.",
  "Venus rotates in the opposite direction to most planets.",
  "Pluto is smaller than Earth’s Moon.",
  "The Moon is slowly moving away from Earth.",
  "The first confirmed exoplanet was discovered in 1992."
];

const App = () => {
  const [date, setDate] = useState(new Date());
  const [background, setBackground] = useState("");
  const [explanation, setExplanation] = useState("");
  const [activePanel, setActivePanel] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("cosmicBookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [factIndex, setFactIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [showChat, setShowChat] = useState(false);
  const [countdownDate, setCountdownDate] = useState(new Date(Date.now() + 1000 * 60 * 60 * 24)); // default 1 day later
  const [timeLeft, setTimeLeft] = useState("");

  const fetchBackground = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&date=${formattedDate}`
      );
      const data = await response.json();
      setBackground(data.url);
      setExplanation(data.explanation);
    } catch {
      setExplanation("No event data available for this date.");
    }
  };

const fetchAIResponse = async () => {
  try {
    setAiResponse("Generating response...");
    const client = await Client.connect("Pebbszz/cosmic-chatbot");
    const result = await client.predict("/predict", {
      prompt: userInput,
    });
    setAiResponse(result.data || "No response");
    setUserInput(""); // Clear input field after successful fetch
  } catch (error) {
    console.error("AI fetch error:", error);
    setAiResponse("Error fetching AI response.");
  }
};


  const addBookmark = () => {
    const newBookmarks = [...bookmarks, { date: date.toDateString(), background }];
    setBookmarks(newBookmarks);
    localStorage.setItem("cosmicBookmarks", JSON.stringify(newBookmarks));
  };

  const rotateFact = () => {
    setFactIndex((prev) => (prev + 1) % cosmicFacts.length);
  };

  const handleQuizAnswer = () => {
    const currentQuestion = quizQuestions[quizIndex];
    if (selectedOption === currentQuestion.answer) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback("Incorrect.");
    }
  };

  const nextQuizQuestion = () => {
    setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
    setSelectedOption("");
    setFeedback("");
  };

  const handlePanelToggle = (panelName) => {
    setActivePanel(activePanel === panelName ? "" : panelName);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    fetchBackground(date);
  }, [date]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = countdownDate - now;
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Countdown Complete!");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownDate]);

  return (
    <div className={`min-h-screen bg-cover bg-center font-bahnschrift ${theme === "dark" ? "text-white" : "text-black"}`} style={{ backgroundImage: `url(${background})` }}>
      <div className={`p-4 flex flex-col items-center ${theme === "dark" ? "bg-black bg-opacity-50 text-white" : "bg-white bg-opacity-30 text-black"}`}>
        <h1 className="text-3xl font-bold mb-2 text-center">Cosmic Calendar</h1>
        <div className="space-x-2">
          {["Quiz", "Bookmarks", "Countdown", "Share", "Fact", "Settings"].map((btn) => (
            <button
              key={btn}
              className="bg-white bg-opacity-20 hover:bg-opacity-40 px-3 py-1 rounded"
              onClick={() => handlePanelToggle(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className={`calendar-wrapper ${theme === 'dark' ? 'calendar-dark' : 'calendar-light'}`}>
          <Calendar onChange={setDate} value={date} className="rounded-lg shadow-lg" />
          <div className={`mt-4 px-4 py-2 rounded shadow-md ${theme === "dark" ? "bg-black bg-opacity-30 text-white" : "bg-white bg-opacity-30 text-black"}`}>
            <p className="text-lg font-medium">Selected Date: {date.toDateString()}</p>
          </div>
          <button
            onClick={addBookmark}
            className={`mt-2 px-3 py-1 rounded ${
              theme === 'dark'
                ? 'bg-black bg-opacity-20 text-white hover:bg-opacity-40'
                : 'bg-white bg-opacity-20 text-black hover:bg-opacity-30'
            }`}
          >
            Bookmark This Day
          </button>
        </div>

        <div className={`max-w-xl mx-auto mt-6 p-4 rounded ${theme === "dark" ? "bg-black bg-opacity-60 text-white" : "bg-white bg-opacity-30 text-black"}`}>
          <h2 className="text-xl font-semibold mb-2">{explanation ? explanation.split(".")[0] : "Loading..."}</h2>
          <p>{explanation}</p>
        </div>

        {activePanel && (
          <div className={`absolute top-40 left-1/2 transform -translate-x-1/2 p-4 rounded-lg w-11/12 max-w-lg ${theme === "dark" ? "bg-black bg-opacity-50 text-white" : "bg-white bg-opacity-40 text-black"}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{activePanel}</h2>
              <button onClick={() => setActivePanel('')}>✕</button>
            </div>

            {activePanel === 'Quiz' && (
              <div className="animate-fadeIn transition-all duration-500">
                {quizIndex >= quizQuestions.length ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                    <p className="text-lg mb-2">Your Score: {score} / {quizQuestions.length}</p>
                    <button
                      className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded"
                      onClick={() => {
                        setQuizIndex(0);
                        setScore(0);
                        setSelectedOption("");
                        setFeedback("");
                      }}
                    >
                      Restart Quiz
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold">Question {quizIndex + 1} of {quizQuestions.length}</p>
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-2">{quizQuestions[quizIndex].question}</p>
                    <ul className="mt-2 space-y-1">
                      {quizQuestions[quizIndex].options.map((opt, idx) => (
                        <li key={idx}>
                          <label>
                            <input
                              type="radio"
                              name="quiz"
                              value={opt}
                              checked={selectedOption === opt}
                              onChange={(e) => setSelectedOption(e.target.value)}
                            /> {opt}
                          </label>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded" onClick={handleQuizAnswer}>Submit Answer</button>
                    <p className="mt-2">{feedback}</p>
                    <button className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded" onClick={nextQuizQuestion}>Next Question</button>
                  </div>
                )}
              </div>
            )}
            {activePanel === 'Bookmarks' && (
              <div className="animate-fadeIn transition-all duration-500">
                {bookmarks.length === 0 ? <p>No bookmarks yet.</p> : (
                  <ul>
                    {bookmarks.map((b, i) => (
                      <li key={i}>{b.date}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activePanel === 'Countdown' && (
              <div className="animate-fadeIn transition-all duration-500">
                <input
                  type="datetime-local"
                  className="text-black p-1 rounded"
                  onChange={(e) => setCountdownDate(new Date(e.target.value))}
                />
                <p className="mt-2 text-lg">{timeLeft}</p>
              </div>
            )}

            {activePanel === 'Share' && (
              <div className="animate-fadeIn transition-all duration-500">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out this cosmic event: ${window.location.href}`, '_blank')}>Share on Twitter</button>
              </div>
            )}

            {activePanel === 'Fact' && (
              <div className="animate-fadeIn transition-all duration-500">
                <p>{cosmicFacts[factIndex]}</p>
                <button className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded" onClick={rotateFact}>Next Fact</button>
              </div>
            )}

            {activePanel === 'Settings' && (
              <div className="animate-fadeIn transition-all duration-500">
                <button className="bg-white bg-opacity-30 px-3 py-1 rounded" onClick={toggleTheme}>Toggle Theme</button>
              </div>
            )}
          </div>
        )}

        <div className="fixed bottom-4 right-4">
          <button className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700" onClick={() => setShowChat(!showChat)}>💬</button>
        </div>

        {showChat && (
          <div className="fixed bottom-20 right-4 bg-black bg-opacity-80 p-4 rounded-lg w-72 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Chatbot</h2>
              <button onClick={() => setShowChat(false)}>✕</button>
            </div>
            <input
              className="w-full p-2 rounded text-black"
              placeholder="Ask something about space..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded" onClick={fetchAIResponse}>Submit</button>
            <p className="mt-2">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
