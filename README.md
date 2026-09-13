# Assignment-05: React Simple Project
Project Name: Dev Stack Builder

Description:
A responsive web application that helps developers explore technologies and build their ideal development stack by selecting one technology from each category.

Technologies Used:
React, TypeScript, Vite, CSS, React-Toastify, and JSON.

3 Key Features:

Technology Catalog: Browse 12 technologies with icons, descriptions, categories, difficulty levels, badges, and sample ratings.
Interactive Stack Builder: Add technologies, remove individual selections, or clear the entire stack, with duplicate protection and toast notifications.
Responsive Design: Mobile, tablet, and desktop layouts with a sticky navbar, hamburger menu, and loading/error states.


1. What is JSX, and why is it used in React?
JSX lets us write HTML-like markup inside JavaScript. It makes UI code easier to read and lets us include JavaScript expressions.

2. What is the difference between props and state?
Props are read-only data passed from a parent to a child. State is data a component remembers and updates to change the UI.

3. What does useState do, and where did you use it?
useState lets a component remember and update data. I used it for selected technologies, loading/error messages, and the mobile menu.

4. What does useEffect do, and why use it for JSON data?
useEffect runs side effects after rendering. I used it to fetch technologies.json when the component mounts and when the user retries loading.

5. Why does a .map() list need unique keys?
Keys help React identify items when a list changes. I used key={technology.id}, which stays stable and is unique among sibling items.

6. What is conditional rendering? Where did you use it?
Conditional rendering displays UI based on a condition. In StackPanel.tsx, an empty stack displays “Your stack is empty.” A simplified example is:

{stack.length === 0 && <div>Your stack is empty.</div>}
How do parent and child components communicate?
Parents pass data and callback functions through props. App passes technology and onAdd to TechnologyCard. The card calls onAdd(technology), and the parent updates the stack.
