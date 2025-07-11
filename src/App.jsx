import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Client } from "@gradio/client"; 
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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

const zodiacSigns = [
  {
    name: "Aries",
    symbol: "♈",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Aries_constellation_map.svg",
    traits: "Energetic, courageous, determined."
  },
  {
    name: "Taurus",
    symbol: "♉",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Taurus_constellation_map.svg",
    traits: "Reliable, patient, practical."
  },
  {
    name: "Gemini",
    symbol: "♊",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gemini_constellation_map.svg",
    traits: "Adaptable, outgoing, intelligent."
  },
  {
    name: "Cancer",
    symbol: "♋",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Cancer_constellation_map.svg",
    traits: "Emotional, nurturing, protective."
  },
  {
    name: "Leo",
    symbol: "♌",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Leo_constellation_map.svg",
    traits: "Confident, ambitious, charismatic."
  },
  {
    name: "Virgo",
    symbol: "♍",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Virgo_constellation_map.svg",
    traits: "Analytical, kind, hardworking."
  },
  {
    name: "Libra",
    symbol: "♎",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Libra_constellation_map.svg",
    traits: "Diplomatic, fair, social."
  },
  {
    name: "Scorpio",
    symbol: "♏",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/3/35/Scorpius_constellation_map.svg",
    traits: "Passionate, brave, resourceful."
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Sagittarius_constellation_map.svg",
    traits: "Optimistic, honest, curious."
  },
  {
    name: "Capricorn",
    symbol: "♑",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Capricornus_constellation_map.svg",
    traits: "Disciplined, responsible, serious."
  },
  {
    name: "Aquarius",
    symbol: "♒",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Aquarius_constellation_map.svg",
    traits: "Innovative, independent, humanitarian."
  },
  {
    name: "Pisces",
    symbol: "♓",
    constellationUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Pisces_constellation_map.svg",
    traits: "Empathetic, artistic, intuitive."
  }
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
   const panelRef = useRef(null);  // ✅ Move inside
  const chatRef = useRef(null);   // ✅ Move inside
  const [viewMode, setViewMode] = useState("event"); // "event" or "constellation"
  const [zodiacIndex, setZodiacIndex] = useState(0);
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

// Load theme from localStorage when app starts
useEffect(() => {
  const saved = localStorage.getItem("cosmicTheme");
  if (saved) setTheme(saved);
}, []);

// Save theme to localStorage when it changes
useEffect(() => {
  localStorage.setItem("cosmicTheme", theme);
}, [theme]);

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
  const dateString = date.toDateString();
  const alreadyBookmarked = bookmarks.some((b) => b.date === dateString);

  if (alreadyBookmarked) {
    alert("You've already bookmarked this date.");
    return;
  }

  // 🧠 Extract summary safely
  const summary = explanation?.split(".")[0] || "No summary available";

  const newBookmarks = [...bookmarks, { date: dateString, background, summary }];
  setBookmarks(newBookmarks);
  localStorage.setItem("cosmicBookmarks", JSON.stringify(newBookmarks));
};

  const deleteBookmark = (index) => {
  const updated = bookmarks.filter((_, i) => i !== index);
  setBookmarks(updated);
  localStorage.setItem("cosmicBookmarks", JSON.stringify(updated));
};

  const rotateFact = () => {
    setFactIndex((prev) => (prev + 1) % cosmicFacts.length);
  };

 // Panel click outside
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

// Chat click outside
useEffect(() => {
  const handleChatClickOutside = (event) => {
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      setShowChat(false);
    }
  };

  if (showChat) {
    document.addEventListener("mousedown", handleChatClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleChatClickOutside);
  };
}, [showChat]);

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

  // Extract background image logic to a variable for clarity and to avoid nested ternary.
  let bgImage = "";
  if (viewMode === "event") {
    bgImage = `url(${background})`;
  } else if (viewMode === "constellation") {
    bgImage = `url("https://upload.wikimedia.org/wikipedia/commons/3/37/Constellations_equirectangular.png")`;
  } else {
    bgImage = `url(${zodiacSigns[zodiacIndex].constellationUrl})`;
  }
  window._cosmicBgImage = bgImage; // for debugging

  return (
    <>
      <div
        className={`min-h-screen bg-cover bg-center font-bahnschrift ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-4 bg-black bg-opacity-50 text-center">
          <h1 className="text-3xl font-bold mb-4">Cosmic Calendar</h1>
          <div className="space-x-2">
            {["event", "constellation", "zodiac"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-full font-semibold capitalize ${
                  viewMode === mode
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          {viewMode === "event" && (
            <div className="p-4 md:flex md:space-x-8">
              <div className="bg-black bg-opacity-60 p-4 rounded-lg mb-4 md:mb-0">
                <Calendar onChange={setDate} value={date} />
                <p className="mt-2">Selected Date: {date.toDateString()}</p>
                <button
                  className="mt-2 bg-white text-black px-2 py-1 rounded"
                  onClick={() => setFactIndex((prev) => (prev + 1) % quizQuestions.length)}
                >
                  Next Fact
                </button>
              </div>
              <div className="flex-1 bg-black bg-opacity-60 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">
                  {explanation ? explanation.split(".")[0] : "Loading..."}
                </h2>
                <p>{explanation}</p>
              </div>
            </div>
          )}

          {viewMode === "constellation" && (
            <div className="w-full flex justify-center mt-8">
              <iframe
                title="Virtual Sky Constellation Viewer"
                src={`https://virtualsky.lco.global/embed/index.html?longitude=77.6&latitude=12.9&constellations=true&cardinalpoints=true&clock=true&date=${date.toISOString()}`}
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-lg max-w-4xl"
              ></iframe>
            </div>
          )}

          {viewMode === "zodiac" && (
            <div className="animate-fadeIn transition-all duration-500 text-center p-4 mt-8 bg-black bg-opacity-50 rounded-lg max-w-md mx-auto">
              <div className="flex justify-between mb-4">
                <button
                  className="bg-white bg-opacity-30 px-3 py-1 rounded"
                  onClick={() =>
                    setZodiacIndex(
                      (zodiacIndex - 1 + zodiacSigns.length) % zodiacSigns.length
                    )
                  }
                >
                  ◀️ Prev
                </button>
                <button
                  className="bg-white bg-opacity-30 px-3 py-1 rounded"
                  onClick={() =>
                    setZodiacIndex((zodiacIndex + 1) % zodiacSigns.length)
                  }
                >
                  Next ▶️
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {zodiacSigns[zodiacIndex].name} {zodiacSigns[zodiacIndex].symbol}
              </h2>
              <img
                src={zodiacSigns[zodiacIndex].constellationUrl}
                alt={`${zodiacSigns[zodiacIndex].name} Constellation`}
                className="mx-auto w-full max-w-xs mb-4 rounded-lg shadow-md"
              />
              <p className="italic text-lg">{zodiacSigns[zodiacIndex].traits}</p>
            </div>
          )}

          <div className="space-x-2 mt-4 text-center">
            {["Quiz", "Bookmarks", "Countdown", "Share", "Settings"].map(
              (btn) => (
                <button
                  key={btn}
                  className="bg-white bg-opacity-20 hover:bg-opacity-40 px-3 py-1 rounded"
                  onClick={() => handlePanelToggle(btn)}
                >
                  {btn}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full px-4 md:px-16 mt-8 gap-8">
        {/* Left Column: Calendar, Date, Bookmark */}
        <div className="flex flex-col items-start gap-4">
          <div className={`${theme === 'light' ? 'light' : ''}`}>
            <Calendar onChange={setDate} value={date} className="rounded-lg shadow-lg" />
          </div>

          <div className={`px-4 py-2 rounded shadow-md ${theme === "dark" ? "bg-black bg-opacity-60 text-white" : "bg-white bg-opacity-30 text-black"}`}>
            <p className="text-lg font-medium">Selected Date: {date.toDateString()}</p>
          </div>

          <button
            onClick={addBookmark}
            className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-black bg-opacity-40 text-white' : 'bg-white bg-opacity-40 text-black'}`}
          >
            Bookmark This Day
          </button>
        </div>

        {/* Right Column: Fact Info */}
        <div className={`flex-1 bg-opacity-60 p-6 rounded self-start ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`} style={{ minHeight: "400px" }}>
          <h2 className="text-xl font-semibold mb-2">{explanation ? explanation.split(".")[0] : "Loading..."}</h2>
          <p>{explanation}</p>
          <div className={`mt-4 p-3 rounded-lg ${theme === "dark" ? "bg-black bg-opacity-60 text-white" : "bg-white bg-opacity-30 text-black"}`}>
            <h3 className="text-lg font-semibold mb-2">Did You Know?</h3>
            <p>{cosmicFacts[factIndex]}</p>
            <button className="mt-2 bg-white bg-opacity-20 px-3 py-1 rounded" onClick={rotateFact}>Next Fact</button>
          </div>
        </div>
      </div>
      {viewMode === "constellation" && (
        <div className="w-full flex justify-center mt-8">
          <iframe
            title="Virtual Sky Constellation Viewer 2"
            src={`https://virtualsky.lco.global/embed/index.html?longitude=77.6&latitude=12.9&constellations=true&cardinalpoints=true&clock=true&date=${date.toISOString()}`}
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg max-w-4xl"
          ></iframe>
        </div>
      )}
      {activePanel && (
        <div ref={panelRef} className={`absolute top-40 left-1/2 transform -translate-x-1/2 p-4 rounded-lg w-11/12 max-w-lg ${theme === "dark" ? "bg-black bg-opacity-50 text-white" : "bg-white bg-opacity-40 text-black"}`}>
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
                    {quizQuestions[quizIndex].options.map((opt) => (
                      <li key={opt}>
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
                  <button
                    className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded"
                    onClick={handleQuizAnswer}
                  >
                    Submit Answer
                  </button>

                  {feedback && (
                    <>
                      <p className="mt-2">{feedback}</p>
                      <button
                        className="mt-2 bg-white bg-opacity-30 px-3 py-1 rounded"
                        onClick={nextQuizQuestion}
                      >
                        Next Question
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
          {activePanel === 'Bookmarks' && (
            <div className="animate-fadeIn transition-all duration-500">
              {bookmarks.length === 0 ? (
                <p>No bookmarks yet.</p>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    className="mb-2 p-1 rounded w-full text-black"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <ul className="space-y-2">
                    {bookmarks
                      .filter((b) =>
                        b.date.toLowerCase().includes(userInput.toLowerCase()) ||
                        (b.summary && b.summary.toLowerCase().includes(userInput.toLowerCase()))
                      )
                      .map((b, i) => (
                        <li
                          key={b.date}
                          className="flex justify-between items-center bg-white bg-opacity-20 p-2 rounded"
                        >
                          <div>
                            <span className="font-semibold">{b.date}</span>
                            {b.summary && (
                              <span className={`ml-2 text-sm italic ${theme === "dark" ? "text-white/80" : "text-black/70"}`}>
                                – {b.summary}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (confirm("Delete this bookmark?")) deleteBookmark(i);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                  </ul>
                </>
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
            <div className="animate-fadeIn transition-all duration-500 space-y-2">
              <button
                className="bg-purple-500 text-white px-3 py-1 rounded w-full"
                onClick={() => {
                  const confirmed = window.confirm(
                    "This image is sourced from NASA’s Astronomy Picture of the Day. Please credit NASA if shared or published."
                  );
                  if (confirmed) {
                    const link = document.createElement("a");
                    link.href = background;
                    link.download = `cosmic-event-${date.toISOString().split("T")[0]}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
                📥 Download Image
              </button>

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded w-full"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                📋 Copy Link
              </button>

              <button
                className="bg-green-600 text-white px-3 py-1 rounded w-full"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=Check out this cosmic event: ${window.location.href}`,
                    "_blank"
                  )
                }
              >
                🐦 Share on Twitter
              </button>

              <button
                className="bg-green-500 text-white px-3 py-1 rounded w-full"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=Check out this cosmic event: ${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  )
                }
              >
                💬 Share on WhatsApp
              </button>

              <button
                className="bg-blue-400 text-white px-3 py-1 rounded w-full"
                onClick={() =>
                  window.open(
                    `sms:?body=Check out this cosmic event: ${window.location.href}`,
                    "_blank"
                  )
                }
              >
                📱 Share via SMS
              </button>

              <button
                className="bg-pink-500 text-white px-3 py-1 rounded w-full"
                onClick={() =>
                  window.open("https://www.instagram.com/", "_blank")
                }
              >
                📸 Share on Instagram (via profile)
              </button>
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
        <div ref={chatRef} className="fixed bottom-20 right-4 bg-black bg-opacity-80 p-4 rounded-lg w-72 text-white">
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

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
