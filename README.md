# CareerFlow 🚀

CareerFlow is an AI-powered career management platform designed to help students and professionals optimize their resumes and bridge skill gaps.

## ✨ Features

- **Resume Analysis:** Real-time feedback and ATS optimization using Groq (Llama 3).
- **Skill Gap Detection:** Comprehensive analysis of missing skills compared to target roles via Google Gemini.
- **Interactive Dashboard:** Track your career progress, tasks, and interview readiness in one place.
- **Clean UI:** A modern, responsive interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
- **Backend:** FastAPI (Python), Groq API, Google Gemini API
- **Deployment:** [Add your deployment details here]

## 🚀 Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in the root directory and add your API keys:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload
```

## 📄 License
[Add License Details]
