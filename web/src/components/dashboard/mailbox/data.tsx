export const mails =[
  {
    "id": "1f4b2c73-834d-4f3e-8b2a-34f6c1e7d123",
    "name": "SkyzoX",
    "email": "skyzoxcodes@gmail.com",
    "subject": "Late-Night Coding Session",
    "text": "Hey everyone! 🌟\nJust wanted to drop by and share a little project I’ve been working on. It’s a task management app that’s fully customizable and built with Next.js and Tailwind. If anyone’s curious or has ideas to make it cooler, hit me up!\n\nAlso, who’s down for some late-night coding sessions? Let’s turn some caffeine into code magic! ☕💻",
    "date": "2023-09-12T21:45:00",
    "read": false,
    "labels": ["development", "personal"]
  },
  {
    "id": "3a2d4c98-7625-4e8a-bd47-94f1b5a7c531",
    "name": "Aayan",
    "email": "aayan.trader@example.com",
    "subject": "Stock Market Discussion",
    "text": "Yo team! 📈\nHad a killer day on the market today. Managed to close a few deals that worked out better than expected! Thinking of organizing a chill session where we can share some trading tips and insights—maybe next week?\n\nHit me up if you’re in. Let’s keep crushing it together. 💼💪",
    "date": "2023-09-13T16:10:00",
    "read": false,
    "labels": ["business", "trading"]
  },
  {
    "id": "8f9c5b82-a45f-4237-912b-6e92b5a4f789",
    "name": "Maya Harper",
    "email": "maya.harper@example.com",
    "subject": "Weekend Art Jam",
    "text": "Hey folks! 🎨\nI’ve been itching to do some creative work with friends. Thinking of hosting a weekend art jam at my place! Bring your sketchbooks, paints, or whatever medium you love, and let’s create something amazing together.\n\nSnacks and coffee are on me! Let me know if you’re interested. 🌟",
    "date": "2023-09-15T10:00:00",
    "read": false,
    "labels": ["art", "personal"]
  }
]

  
  export type Mail = (typeof mails)[number]
  
  export const accounts = [
    {
      label: "Alicia Koch",
      email: "alicia@example.com",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Vercel</title>
          <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Alicia Koch",
      email: "alicia@gmail.com",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Gmail</title>
          <path
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Alicia Koch",
      email: "alicia@me.com",
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>iCloud</title>
          <path
            d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ]
  
  export type Account = (typeof accounts)[number]
  
  export const contacts = [
    {
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
    },
    {
      name: "Liam Wilson",
      email: "liam.wilson@example.com",
    },
    {
      name: "Olivia Davis",
      email: "olivia.davis@example.com",
    },
    {
      name: "Noah Martinez",
      email: "noah.martinez@example.com",
    },
    {
      name: "Ava Taylor",
      email: "ava.taylor@example.com",
    },
    {
      name: "Lucas Brown",
      email: "lucas.brown@example.com",
    },
    {
      name: "Sophia Smith",
      email: "sophia.smith@example.com",
    },
    {
      name: "Ethan Wilson",
      email: "ethan.wilson@example.com",
    },
    {
      name: "Isabella Jackson",
      email: "isabella.jackson@example.com",
    },
    {
      name: "Mia Clark",
      email: "mia.clark@example.com",
    },
    {
      name: "Mason Lee",
      email: "mason.lee@example.com",
    },
    {
      name: "Layla Harris",
      email: "layla.harris@example.com",
    },
    {
      name: "William Anderson",
      email: "william.anderson@example.com",
    },
    {
      name: "Ella White",
      email: "ella.white@example.com",
    },
    {
      name: "James Thomas",
      email: "james.thomas@example.com",
    },
    {
      name: "Harper Lewis",
      email: "harper.lewis@example.com",
    },
    {
      name: "Benjamin Moore",
      email: "benjamin.moore@example.com",
    },
    {
      name: "Aria Hall",
      email: "aria.hall@example.com",
    },
    {
      name: "Henry Turner",
      email: "henry.turner@example.com",
    },
    {
      name: "Scarlett Adams",
      email: "scarlett.adams@example.com",
    },
  ]
  
  export type Contact = (typeof contacts)[number]