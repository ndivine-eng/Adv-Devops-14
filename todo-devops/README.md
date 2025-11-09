# 📝 To-Do DevOps Application

This repository contains a simple **To-Do application** that integrates all requirements of the **Haraka project**, focusing on **containerization** and **continuous integration (CI)** using **Docker** and **GitHub Actions**.

---

## 🚀 Project Overview

This project builds on the Formative 1 repository by adding:
- **Containerization** using Docker and Docker Compose  
- **Continuous Integration (CI)** using GitHub Actions  

### Why This Matters
Containerization ensures that the application runs consistently across different environments. CI automates testing and validation, helping catch bugs early and ensuring code quality before deployment.

---

## 🧱 Project Structure

```
.
├── todoapp/              # Main To-Do Application source code
├── Dockerfile            # Docker configuration for containerization
├── docker-compose.yml    # Compose file for local development
├── .dockerignore         # Excludes unnecessary files from the build context
├── .github/
│   └── workflows/
│       └── ci.yml        # CI pipeline configuration
└── README.md             # Project documentation
```

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites
Make sure you have these installed:  
- [Docker Desktop](https://www.docker.com/products/docker-desktop)  
- [Git](https://git-scm.com/)  
- (Optional) Node.js or Python depending on your app’s stack  

---

## 🐳 Run the Application with Docker Compose

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd <repo-name>
   ```

2. **Build and Run the Containers**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Docker image using your `Dockerfile`
   - Start the application service defined in `docker-compose.yml`

3. **Access the Application**
   Once running, open your browser and visit:  
   👉 [http://localhost:5000](http://localhost:5000) *(or your app’s default port)*  

4. **Stop the Application**
   Press `Ctrl + C` in the terminal, then run:  
   ```bash
   docker-compose down
   ```

---

## 🧰 Continuous Integration (CI)

This project uses **GitHub Actions** to automatically build, lint, test, and validate the Docker image on each push or pull request.

### 📄 CI Workflow Summary
The CI pipeline:
- Triggers on:
  - Pushes to any branch (except `main`)
  - Pull requests targeting `main`
- Steps:
  - Checkout repository
  - Set up the environment
  - Install dependencies
  - Run linting and tests
  - Build the Docker image

💡 **CI will fail automatically** if linting, tests, or Docker builds fail — ensuring high code quality.

---

## 🧑‍💻 Team Collaboration & Integration

- The repository includes branch protection rules requiring CI checks to pass before merging.  
- Team members collaborate through branches and pull requests.  
- Code reviews and discussions take place in PRs to ensure shared learning and accountability.  

---

## 🧩 Assignment Progress Report

**Main Challenges:**  
Learning how to correctly structure Dockerfiles and configure CI workflows was challenging, especially ensuring builds passed in GitHub Actions.  

**Key Learnings:**  
- Understood how Docker ensures consistent environments.  
- Learned how CI pipelines automate code quality checks and testing.  
- Gained confidence in setting up `ci.yml` and debugging failed workflows.  

**Changes from Formative 1:**  
- Added Dockerfile, docker-compose.yml, and .dockerignore files.  
- Integrated a GitHub Actions CI pipeline for automated testing and builds.  
- Improved collaboration through PR reviews and CI enforcement.  

---

## 📎 Repository Submission

- **GitHub Repository URL:** `<Insert your repo URL here>`  
- **Commit SHA / Tag for F2 Submission:** `milestone-1-submission`  
- **Number of Successful CI Runs:** 3+  
- **At least one failed run (then fixed):** ✅  
- **At least one reviewed PR:** ✅  

---

### 🧠 AI & Collaboration Policy Reminder
You are allowed to use AI tools (e.g., GitHub Copilot, ChatGPT) for application code, but **all DevOps configuration files (Dockerfile, docker-compose.yml, ci.yml)** must be **written by you** as per assignment policy.
