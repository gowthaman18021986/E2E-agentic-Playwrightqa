# QA End-to-End Agentic Workflow Prompt

**Context:** You are an Autonomous QA Engineer. You must execute a 7-step workflow from requirements to code commit using the Playwright MCP and specialized agents.

---

## Step 1: Requirement Analysis & Summarization
* **Action:** Access and read the user story file at `./User_Stories/Checkout.md`.
* **Instructions:** Extract the application URL, test credentials, and every individual Acceptance Criteria (AC).
* **Expected Result:** A bulleted summary in the chat window of exactly what needs to be tested.

## Step 2: Autonomous Test Planning (Playwright Planner)
* **Action:** Invoke the **Playwright Test Planner Agent**.
* **Instructions:** Navigate to the URL, use the credentials provided in Step 1, and perform a deep scan of the DOM. 
* **Requirement:** Create a detailed Test Plan in Markdown format. Save it to `./specs/source_demo_checkout_test_plan.md`. 
* **Details:** The plan must include: Scenario Name, Steps, Expected Results, and unique CSS/Playwright locators found during exploration.

## Step 3: Manual-to-AI Exploratory Validation
* **Action:** Use the **Playwright Browser MCP tool**.
* **Instructions:** Execute the steps in the Test Plan manually (via the agent). Match actual results against expected.
* **Requirement:** Capture screenshots for the "Add to Cart" and "Checkout Complete" stages. Save notes on any dynamic elements that might cause flakiness.

## Step 4: Autonomous Script Generation (Test Generator)
* **Action:** Invoke the **Playwright Test Generator Agent**.
* **Instructions:** Review the Test Plan and the findings from Step 3. Generate a Playwright TypeScript suite. Generate the code using the Page Object Model pattern to ensure maintainability.
* **Folder Structure:** Create a sub-folder `./tests/source_demo_checkout/` and place the `.spec.ts` files there.
* **Coding Standards:** Use `Page Object Model (POM)`, `async/await`, and descriptive `test.step` blocks. Use `data-test` attributes for locators.

## Step 5: Test Execution & Self-Healing (Test Healer)
* **Action:** Invoke the **Playwright Test Healer Agent**.
* **Instructions:** Execute `npx playwright test`. 
* **Self-Healing Logic:** If a failure occurs, the Healer must re-examine the page DOM, identify the corrected locator or fix the timing issue, update the script file, and re-run until a 100% pass rate is achieved.

## Step 6: Executive Reporting
* **Action:** Use GitHub Copilot to compile a final report.
* **Requirement:** Save as `./reports/QA_Execution_Summary.md`.
* **Contents:** Executive summary, Pass/Fail count, detailed log of which tests were "Healed," and final coverage percentage.

## Step 7: GitHub Version Control (GitHub MCP)
* **Action:** Invoke the **GitHub MCP Server**.
* **Repo URL:** [https://github.com/gowthaman18021986/E2E-agentic-Playwrightqa.git]
* **Instructions:** 1. Initialize the repo if not present.
    2. Stage the following folders: `/user_stories`, `/specs`, `/tests`, `/reports`.
    3. Commit with the message: "feat: Completed Autonomous Agentic QA Workflow - Lesson 23".
    4. Push the code to the main branch.