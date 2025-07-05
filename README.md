🌠 Cosmic Calendar


An interactive and immersive space exploration web app built as part of the AstralWeb Innovate Hackathon 2025 🚀🌌
🚀 Live Site → https://cosmic-calendar-chi.vercel.app
💻 GitHub Repo → https://github.com/Harshitshyamsukha/cosmic-calendar
________________________________________
🔭 About the Project
Cosmic Calendar is a powerful, interactive full-stack web application designed to spark curiosity and learning about space and astronomy. Users can explore stunning NASA imagery, test their cosmic knowledge with quizzes, discover captivating facts, and interact with an intelligent AI space guide — all from one unified interface.
Crafted with cutting-edge technologies and a focus on user engagement, Cosmic Calendar transforms space learning into an immersive experience. Built specifically for AstralWeb Innovate, it highlights a blend of science, creativity, and user-centered design.
________________________________________
💡 Core Features
•	🖼 APOD Viewer: Browse NASA’s Astronomy Picture of the Day (APOD) by selecting any date
•	📅 Calendar Selector: Intuitively pick any day to discover space imagery from that time
•	🧠 Space Quiz: Answer 20 curated questions with real-time feedback, a visual progress bar, and final scorecard
•	🤖 AI Chatbot: Ask astronomy-related questions and receive insightful answers using HuggingFace and Transformers
•	🔖 Bookmarks: Save and revisit your favorite cosmic events using local storage
•	⏳ Countdown: Create personalized countdowns to events like rocket launches, eclipses, etc.
•	🌌 Cosmic Facts: Cycle through 20 mind-expanding facts about the universe
•	🎨 Theme Toggle: Instantly switch between dark and light themes for optimal viewing
•	📤 Social Sharing: Share the app or any page with a copyable link or Twitter integration
•	💬 Modern Chat UI: Chatbox styled like a support widget for seamless user interaction
•	✨ Smooth Animations: Transitions and fade-ins provide a polished and dynamic user feel
________________________________________
🛠️ Tech Stack
Frontend:
•	React (with Vite for blazing-fast build)
•	Tailwind CSS for styling
•	React Calendar component
APIs & Backend:
•	NASA APOD API for daily space imagery
•	HuggingFace Spaces (Gradio) for hosting the AI model
•	Transformers library powering FLAN-T5 Large
DevOps & Deployment:
•	GitHub for version control and collaboration
•	Vercel for serverless deployment, CI/CD, and preview builds
________________________________________
📸 Screenshots
(Add images to /screenshots directory and update below)
Homepage	Quiz Panel
	

AI Chatbot	Countdown Feature
	
________________________________________
🚀 Setup Instructions
To get this project running locally:
1.	Clone the repo:
git clone https://github.com/Harshitshyamsukha/cosmic-calendar.git
cd cosmic-calendar
2.	Install dependencies:
npm install
3.	Configure environment variables:
Create a .env file at the project root and add:
VITE_NASA_API_KEY=your_nasa_apod_key
VITE_CHATBOT_API_URL=https://<your-huggingface-username>.hf.space
4.	Start the dev server:
npm run dev
5.	Visit http://localhost:5173 to explore the app.
________________________________________
🧠 AI Chatbot Setup
This project features a Gradio-based chatbot hosted on HuggingFace Spaces. It’s powered by the google/flan-t5-large model with custom prompt tuning focused on astronomy.
Requirements:
•	HuggingFace account
•	Python, Transformers, and Gradio installed
Once hosted, simply use the Space’s public URL in your .env file. No token is needed for public deployments.
________________________________________
📚 Learnings & Takeaways
•	✅ Delivered a full-stack application with dynamic features under time constraints
•	✅ Integrated real-time external APIs (NASA & HuggingFace)
•	✅ Successfully deployed using Vercel’s CI/CD pipelines
•	✅ Practiced responsive and accessible UI development with Tailwind CSS
•	✅ Learned to structure modular React components for scalability
________________________________________
📄 License
This project is released under the MIT License.
________________________________________
👨‍🚀 Developed with passion and a love for the cosmos by Harshit Shyamsukha and Vivek for AstralWeb Innovate 2025 🌌
