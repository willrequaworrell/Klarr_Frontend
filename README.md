# Klarr (www.klarr.app)
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

Klarr makes tracking daily tasks beautifully simple. Intuitive drag and drop UX + customizable Bauhaus-inspired styling enables users to create their own experience and remove the pain points from productivity.



**See a demo <a href="https://youtu.be/XO2wxNqiY30" target="_blank">here</a>**
## Contents
* [Inspiration](#inspiration)
* [Usage](#usage)
* [Technologies](#technologies)
## Inspiration

Small tasks add up through the work day, and for me, _if it doesn't get written down, it doesn't get done_. In search of the best solution, I tried countless productivity apps. Some were too feature-heavy and just made things more complicated, while others were simple, but lacked essential functions and were uninspiring to use. 

Despite my efforts, I found myself returning again and again to the basic list I kept in a OneNote page, where I would highlight my tasks based on their urgency: Red for tasks due today, Yellow for tasks with an upcoming due date, and Green for optional tasks with no due date (see below). Throughout the day, I would add, change, or delete tasks from the list and update the highlight colors accordingly.

![transformation](https://github.com/user-attachments/assets/53e730e0-1b68-4bc0-b16c-9f528716b058)



From a productivity standpoint, this system worked very well, but using it was quite tedious and visually abrasive. I knew that the method was good, but I wanted an app that would remove friction from the process and provide a more visually compelling backdrop to my work day--so I built one.


## Usage

### Creating a **Today** Task

><img src="https://github.com/user-attachments/assets/9e6ecbb8-9aaf-4782-b843-a273fd1c54e3" width="600" />
>
> * Create a task by clicking the + button in a given section. Submit by pressing "Add" or Command/Ctrl + Enter on the keyboard
> * Today tasks automatically have a due date of the current day.


### Editing a task


><img src="https://github.com/user-attachments/assets/0c040ce6-c874-4011-967b-5a5df2a35d65" width="600" />
>
> * Edit a task by double clicking on its description, making your change, and pressing Enter to submit.



### Creating an Upcoming Task

><img src="https://github.com/user-attachments/assets/27f653bd-8570-44d7-85ef-c7ec913b4855" width="600" />
>
> * Creating Upcoming tasks is just like creating Today tasks, but a due date in the future is required.
> * Tasks in the Upcoming section will be automatically sorted by due date.



### Editing an Upcoming Task Due Date

><img src="https://github.com/user-attachments/assets/a1fa60b0-7a1c-40fe-bb0b-270e8198e4cf" width="600" />
>
> * To update the due date of an Upcoming task, click on the due date to bring up the date picker.
> * If you want to make the due date today, you'll need to drag it into the Today section (more on that later).



### Create Optional Task
><img src="https://github.com/user-attachments/assets/5b327477-79cb-4e87-8231-cda728fb2a41" width="600" />
>
> * Creating an Optional task is identical to creating a Today task, except optional tasks have no due date.



### Reorder Tasks

><img src="https://github.com/user-attachments/assets/3feaa9d9-ac43-46c2-bfeb-eda3ad1fbdaf" width="600" />
>
> * When you have more than one task in a section, you can drag to reorder them.



### Move Task Between Sections

><img src="https://github.com/user-attachments/assets/6571ee39-7421-41e8-869c-387bf56c7272" width="600" />
>
> * Tasks can also be dragged between sections.
> * If you drag a task into the Upcoming section, a due date will be required.



### Update Theme

><img src="https://github.com/user-attachments/assets/63bd8a50-466e-4b09-bbaa-274d0e2a7660" width="600" />
>
> * If you're not a fan of the primary colors, open the settings to choose whatever palette you want.
> * These settings will be saved to your profile.
> * You can reset theme back at any time by clicking the "Reset" button in settings.


### Complete & Delete Tasks

><img src="https://github.com/user-attachments/assets/308bf23c-48da-4ca0-afc0-9eaa742b7d2d" width="600" />
>
> * To complete or delete tasks, drag them to the checkmark area or trash can area respectively.

## Technologies

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>

The frontend was written in TypeScript and built with React and Tailwind CSS. Authentication and User identity is handled by Firebase and integrated through custom React hooks. The backend is written in JavaScript and built with Express.js (Node.js) and connects to a MongoDB Atlas cluster which utilizes Atlas triggers for CRON updates to records.
