import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Client } from "@gradio/client";
import { motion, AnimatePresence } from "framer-motion";

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
{ question: "What is the coldest planet in the solar system?", options: ["Neptune", "Uranus", "Pluto"], answer: "Uranus" }
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
"Mercury has no atmosphere to retain heat."
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
const [countdownDate, setCountdownDate] = useState(new Date(Date.now() + 1000 * 60 * 60 * 24));
const [timeLeft, setTimeLeft] = useState("");

const panelRef = useRef(null);

const fetchBackground = async (selectedDate) => {
const formattedDate = selectedDate.toISOString().split("T")[0];
try {
const response = await fetch(
https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}&date=${formattedDate}
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
setUserInput("");
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

const handlePanelToggle = (panelName) => {
setActivePanel(activePanel === panelName ? "" : panelName);
};

const toggleTheme = () => {
setTheme(theme === "dark" ? "light" : "dark");
};

useEffect(() => {
const handleClickOutside = (event) => {
if (panelRef.current && !panelRef.current.contains(event.target)) {
setActivePanel("");
}
};
if (activePanel) {
document.addEventListener("mousedown", handleClickOutside);
}
return () => {
document.removeEventListener("mousedown", handleClickOutside);
};
}, [activePanel]);

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
setTimeLeft(${days}d ${hours}h ${minutes}m ${seconds}s);
} else {
setTimeLeft("Countdown Complete!");
}
}, 1000);
return () => clearInterval(timer);
}, [countdownDate]);

return (
<div className={min-h-screen bg-cover bg-center ${theme === "dark" ? "text-white" : "text-black"}} style={{ backgroundImage: url(${background}) }}>
<div className={p-4 flex flex-col items-center ${theme === "dark" ? "bg-black bg-opacity-50" : "bg-white bg-opacity-90"}}>
<h1 className="text-3xl font-bold mb-2 text-center">Cosmic Calendar</h1>
<div className="space-x-2">
{["Quiz", "Bookmarks", "Countdown", "Share", "Fact", "Settings"].map((btn) => (
<button key={btn} className="bg-white bg-opacity-20 hover:bg-opacity-40 px-3 py-1 rounded" onClick={() => handlePanelToggle(btn)}>
{btn}
</button>
))}
</div>
</div>

php-template
Copy
Edit
  <div className="flex flex-col items-center mt-8">
    <Calendar onChange={setDate} value={date} className="rounded-lg shadow-lg" />
    <div className={`mt-4 px-4 py-2 rounded shadow-md ${theme === "dark" ? "bg-black bg-opacity-60" : "bg-white bg-opacity-90"}`}>
      <p className="text-lg font-medium">Selected Date: {date.toDateString()}</p>
    </div>
    <button onClick={addBookmark} className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded">Bookmark This Day</button>
  </div>

  <div className={`max-w-xl mx-auto mt-6 p-4 rounded ${theme === "dark" ? "bg-black bg-opacity-60" : "bg-white bg-opacity-90"}`}>
    <h2 className="text-xl font-semibold mb-2">{explanation ? explanation.split(".")[0] : "Loading..."}</h2>
    <p>{explanation}</p>
  </div>

  {activePanel && (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className={`absolute top-32 left-1/2 transform -translate-x-1/2 p-4 rounded-lg w-11/12 max-w-lg shadow-md ${theme === "dark" ? "bg-black bg-opacity-80" : "bg-white bg-opacity-90 text-black"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{activePanel}</h2>
        <button onClick={() => setActivePanel('')}>✕</button>
      </div>
      <div className="text-sm">Panel content for {activePanel}</div>
    </motion.div>
  )}

  <div className="fixed bottom-4 right-4">
    <button className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700" onClick={() => setShowChat(!showChat)}>💬</button>
  </div>

  <AnimatePresence>
    {showChat && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className={`fixed bottom-20 right-4 ${theme === "dark" ? "bg-black bg-opacity-80 text-white" : "bg-white bg-opacity-90 text-black"} p-4 rounded-lg w-72`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <button onClick={() => setShowChat(false)}>✕</button>
        </div>
        <input className="w-full p-2 rounded text-black" placeholder="Ask something about space..." value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded" onClick={fetchAIResponse}>Submit</button>
        <p className="mt-2">{aiResponse}</p>
      </motion.div>
    )}
  </AnimatePresence>
</div>
);
};
