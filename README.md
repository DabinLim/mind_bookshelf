# 📔 ThinkNote **- Doodle your thoughts and Share with Others**

![image](https://user-images.githubusercontent.com/67696504/119813221-f92a6d80-bf23-11eb-8a56-1d2ecea3cd16.png)

[**Website link**](https://thinknote.us/) / [**YouTube link**](https://www.youtube.com/watch?v=UEY_Fpl8zn4)

**Beta version:** 05.13.2021 (MVP launching) ~ Implementing user feedback and still in the process of refinement

**Development duration:** 04.25.2021 ~ 05.12.2021

## 📌 Table of Contents

1. [Project Overview](#Project-Overview)
2. [Tools](#Tools)
3. [Core Functions Info](#Core-Functions-Info)
4. [What We Have Learned](#What-We-Have-Learned)


## 🔑 Project Overview

This website enables users to share their thoughts and to have them like how we store books on the bookshelf.

- Users can respond to the three randomly assigned questions and accumulate their stories on their bookshelf as well as share them in the community.

**🎯 Target**

- Women in their 10s & their 20s, who like writing a journal and actively share their stories and thoughts with others on a social media platform

### **👨‍👩‍👧‍👧 Team**

[**Our Team Notion**](https://www.notion.so/e70b704cf035444b805dd95942f6e8ce) <br/>
**Front-end(React.js):** Daeho Lee, Dabin Lim, Hyungseok Cho <br/>
**Back-end(Node.js):**  Chongmyeong Lee, Sanggyun Cho, Taejin Kang ([Github Repo](https://github.com/Lee-ChongMyeong/ThinkNote)) <br/>
**Designer:** Jiwon Sung ([Web](https://xd.adobe.com/view/c892e36d-df02-4835-b99f-cc191129a465-9dc1/), [Mobile wireframe](https://xd.adobe.com/view/81d74061-14d9-4d79-ad0e-06d3fecc701a-d484/))

<br/>

## **🛠 Tools**

```
- View (React with JavaScript, React-Router, antd, Material-UI, Styled-components)
- State Management (Redux-Toolkit)
- Build Tool (Create React App)
- Code Quality Tool (ESLint, Prettier)
- Infrastructure (AWS S3, Route 53, Amazon CloudFront)
- Design Tool (Adobe XD)
- Collaboration Tools (Git, Github, Notion, Slack, etc.)
```

<br/>

## **🕹 Core Functions Info**

### **1. Social Login**

- Enables a one-click social login function by authorizing users with Google/NAVER/KAKAO ID.

### 2. Infinite Scroll

- Implements the infinite scroll on a modal, a component, and a page through writing reusable codes that we applied a branch processing based on circumstances.

### 3. Card Detail

- Basically, this component acts as a modal that has detailed information of a response card on the web. However, it is displayed as a page on mobile devices.
- On this component or page, users can interact with others through leaving comments, pressing a like button on it or on a comment that they like, and tagging other users by inserting "@" in front of their nicknames.
- Users can see a list of people who like the response by clicking the number of people who pressed the like button.

### 4. Alarm

- By implementing this alarm function, users immediately know whether someone likes their posts, leaves a comment, tags them, follows them, and even register a response to their custom questions.
- Even when users are not logged in, they still get notifications that are indicated by a red alarm badge.

### 5. [Google Extension](https://chrome.google.com/webstore/detail/%EC%83%9D%EA%B0%81%EB%82%99%EC%84%9C/bjjoklgeipleefnllgkcmacojnmbplga)

- By creating a google extension for this website, users can see the community page and go to the actual website by clicking a "more view" button placed right next to a question.

---

**Sorted by page from now on**

### 1. Main

- Loads three random questions from the server on a daily basis
- Users can write their responses (restricted to 1000 letters) and submit them.
- Users can set their responses private through clicking a toggle button so that others cannot access to them.
- Users can access others' bookshelves by clicking their profile images & nicknames.
- Users can see more responses by clicking a string that indicates how many people have responded to the same question.

### 2. Bookshelf

- Displays a collection of a user's responses that are contained in a book-shaped item, which are sorted by date.
- Users can modify and update their profile information such as profile image, nickname, status message, and preferred topics (love, friendship, relationship, goals, identity, and value) that are distinguished by unique colors.
- Users can create their own custom questions which may be loaded on others' main pages and view the number of responses to the specific question.

### 3. Friends' Feed

- Users can access their friends' feed and view their friends' various responses. If a user does not have a single friend, he or she will see a page only with invitation to the community page to encourage them to surf and get to meet others.
- Users can press a like button, and the heart icon will be filled with color accordingly.

### 4. Community

- Displays two random questions with card(s) that store a user and content information.
- Here, a newly signed-up user can see colorful ways of responses so that he or she can get access to their profiles and follow them if he or she wants.
- There is a refresh button if a user wants to see other types of questions.
- If the number of responses to a certain question is equal to or more than 4, a "more view" button is activated so that uses can enjoy more responses to the question. Once they get to the more view page, there are different responses a user can sort by date, popularity, and his or her friends.

### 5. Topic Page

- Regardless of where a user is, if he or she clicks a certain topic, the website shows him or her a topic page where there are responses to the corresponding questions.
- This page shows response cards where a user can sort by date and the number of responses.

<br/>

## **🔎 What We Have Learned**

### 1. **From card modal issue**

- **Problem:** After the initial publishment of our website, we faced a critical error when it comes to converting from the web view to the mobile view. We found out that when users utilized our website on their mobile devices, they confused on their current location once they clicked the back button. 
Whereas we could easily close a modal off on the web to see the previous view by clicking the outside area of it, mobile users could not go back to the previous view after they clicked the back button, which used to be the only way to get out of a modal on mobile devices.
- **Solution:** So Dabin approached with a different way that is to show a page instead of a modal for mobile users. He set a page conversion point which is the max screen width of 750px, using the window.innerWidth. When the value is equal to or less than 750px, a page conversion occurs. Otherwise, a normal modal pops out. By this approach, the back button works well both on the web and mobile devices.

### 2. From writing codes matched the design

- **Problems:**

    (1) First time working with a designer; so we struggled with structuring views according to the given design. Moreover, we were not used to getting all the details when it comes to creating views; however, the designer requested a perfect matched outcome with what she drew on the wireframe.

    (2) After receiving user feedbacks ever since the first publishment, we focused on the negative feedbacks that would lead to improving certain functions in our product and triggering to change the initial design format.

- **Solution:** We all knew that there was only one way to get through this: to WORK HARD. Further, we did not cease to communicate with the designer to discuss a better way to display the views. Also, we kept receiving user feedback to check to see if there have been things improved, compared to the previous publishment. The collective feedback became gradually positive over time, and so did our product.
