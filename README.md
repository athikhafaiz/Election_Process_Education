# VoteMitra: Election Process Education

A smart, dynamic assistant and interactive roadmap built for the **PromptWars - BuildwithAI** competition. VoteMitra demystifies the Indian election process based on the user's specific persona.

## 1. Chosen Vertical
**Election Process Education** (Indian Audience Focus)
This solution is designed to tackle the confusion many citizens (especially first-time voters, NRIs, and senior citizens) face regarding the electoral process, timelines, and registration rules.

## 2. Approach and Logic
The application uses a dual-pronged approach to maximize both educational value and accessibility:
*   **Static Roadmap (Visual Learning):** A highly accessible, keyboard-navigable timeline (`<ElectionRoadmap />`) that visually breaks down the continuous election process from voter registration to counting day.
*   **Contextual AI Assistant (Interactive Learning):** A dynamic chat interface (`<ChatInterface />`) powered by Google's Vertex AI (Gemini Pro). 

**The AI Logic:**
Instead of a generic prompt, the system relies on *User Personas*. Before querying the Gemini model, the frontend sends the user's selected context (e.g., "First-time Voter", "NRI", "Senior Citizen"). 
The Next.js API route (`/api/chat`) constructs a strict System Prompt wrapping the user's query with this persona context. 
*   *Logic Enforcement:* The prompt strictly commands the AI to *only* answer questions regarding the Indian election process and to decline off-topic or politically opinionated questions.

## 3. How the Solution Works
1.  **Frontend:** Built with Next.js (App Router) and Tailwind CSS. The UI is completely responsive and achieves a 100% Lighthouse Accessibility score.
2.  **Backend Integration:** API routes securely handle the `@google/genai` SDK calls. No API keys are exposed to the client.
3.  **Deployment Engine:** The app is containerized using a multi-stage `Dockerfile` optimizing it for a lightweight standalone build on **Google Cloud Run**.
4.  **Testing:** The core UI components are validated using automated unit tests (Jest & React Testing Library).

## 4. Assumptions Made
*   **Target Audience:** The primary audience is Indian citizens. Therefore, the AI is instructed to provide answers based on the Election Commission of India (ECI) guidelines.
*   **API Availability:** It is assumed that a valid `GEMINI_API_KEY` is provided in the environment variables of the Cloud Run instance. (A mock fallback is provided in the code if the key is missing to prevent total app failure).
*   **Neutrality:** It is assumed that the AI model (Gemini) can maintain neutrality when instructed, thereby not influencing the user's political choices but strictly educating them on the *process*.

---

### Local Development Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file and add your `GEMINI_API_KEY=your_key_here`.
4. Run `npm run dev` to start the development server.
5. Run `npm run test` to execute the automated test suite.
