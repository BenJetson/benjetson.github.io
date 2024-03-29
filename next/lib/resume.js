export const resumeData = {
  name: "Ben Godfrey",
  tagline: "Full Stack Developer",
  location: "Greenville, SC",
  show_photo: false,
  download_urls: {
    pages: "https://link.bengodfrey.net/resume-apple-pages",
    word: "https://link.bengodfrey.net/resume-ms-word",
    pdf: "https://link.bengodfrey.net/resume-pdf",
  },
  objective: null,
  education: [
    // TODO master's degree
    //
    // {
    //   "institution": "Clemson University",
    //   "location": "Clemson, SC",
    //   "degree": "Computer Science, M.S.",
    //   "gpa": null,
    //   "term": {
    //     "start": "January 2022",
    //     "end": null,
    //     "in_progress": true
    //   },
    //   "logo": "https://live.staticflickr.com/65535/51210648772_2e277669d4_m.jpg"
    // },
    {
      institution: "Clemson University",
      location: "Clemson, SC",
      degree: "Computer Science, B.S.",
      gpa: "3.97",
      term: {
        start: "August 2018",
        end: "December 2021",
        in_progress: false,
      },
      logo: "https://live.staticflickr.com/65535/51210648772_2e277669d4_m.jpg",
    },
  ],
  jobs: [
    {
      employer: "Clemson University",
      location: "Clemson, SC",
      job_title: "Mobile Application Developer",
      term: { start: "December 2021", end: null },
      logo: "https://live.staticflickr.com/65535/51210648772_2e277669d4_m.jpg",
      accomplishments: null,
    },
    {
      employer: "Clemson University",
      location: "Clemson, SC",
      job_title: "Mobile Team Intern",
      term: { start: "January 2019", end: "December 2021" },
      logo: "https://live.staticflickr.com/65535/51210648772_2e277669d4_m.jpg",
      accomplishments: [
        "Maintained legacy my.Clemson 1.0 with a team of other interns and developers, an app used by more than 120k unique users per month!",
        "Implement new features for and maintain the Clemson University Alexa Skill",
        "Build RESTful backend APIs and React web frontends for my.Clemson 2.0",
        "Develop a suite of tools as part of the COVID-19 team to help the university respond to the pandemic",
        "Collaborate across teams within CCIT to design cohesive sofware integrations",
        "Communicate with project managers to meet stakeholder requirements",
        "Redesign software with input from Quality Assurance and Accessibility teams",
        "Assist and guide other interns when they get stuck",
      ],
    },
    {
      employer: "SC Governor's School for the Arts",
      location: "Greenville, SC",
      job_title: "IT Intern",
      term: { start: "June 2018", end: "August 2018" },
      logo: "https://live.staticflickr.com/65535/51211352931_a44432ab0a_m.jpg",
      accomplishments: [
        "Troubleshooting technology issues with end users",
        "Deployment and imaging of new Windows workstations",
        "Designing shell scripts to expedite setup of macOS workstations",
        "Reimaging and reporting condition of a fleet of student iPads",
        "Conceptualize and implement spreadsheet macros using Google App Scripts",
      ],
    },
    {
      employer: "SC Governor's School for the Arts",
      location: "Greenville, SC",
      job_title: "IT Intern",
      term: { start: "June 2017", end: "August 2017" },
      logo: "https://live.staticflickr.com/65535/51211352931_a44432ab0a_m.jpg",
      accomplishments: [
        "Collaborate with other departments to inventory technology resources",
        "Appraise and wipe a fleet of older iPads to prepare them for surplus",
        "Manage and prepare a fleet of new iPads using ZuluDesk MDM",
        "Develop a web portal to help users install the school's root certificate",
        "Configure and secure Cisco network switches and reorganize patch panels",
      ],
    },
  ],
  skills: {
    levels: [
      {
        value: 1,
        description: "Expert",
        class: "skill-bar-level-one",
      },
      {
        value: 2,
        description: "Proficient",
        class: "skill-bar-level-two",
      },
      {
        value: 3,
        description: "Competent",
        class: "skill-bar-level-three",
      },
      {
        value: 4,
        description: "Novice",
        class: "skill-bar-level-four",
      },
    ],
    clusters: [
      {
        title: "Programming Languages",
        items: [
          { skill: "Golang", level: 1 },
          { skill: "PHP", level: 2 },
          { skill: "Python", level: 2 },
          { skill: "HTML", level: 1 },
          { skill: "CSS", level: 2 },
          { skill: "JavaScript", level: 1 },
          { skill: "Java", level: 2 },
          { skill: "C", level: 3 },
          { skill: "C++", level: 3 },
        ],
      },
      {
        title: "Frameworks",
        items: [
          { skill: "ReactJS", level: 1 },
          { skill: "Bootstrap", level: 1 },
          { skill: "MaterialUI", level: 1 },
          { skill: "AngularJS", level: 4 },
          { skill: "Alexa Skills Kit", level: 3 },
        ],
      },
      {
        title: "Other Skills",
        items: [
          { skill: "Agile", level: 2 },
          { skill: "Linux", level: 2 },
          { skill: "Git", level: 2 },
        ],
      },
    ],
  },
  awards: [
    {
      title: "President's List",
      project: "4.0 GPA",
      from: "Clemson University",

      // XXX using the line breaks here since none of the other awards have multiple
      // dates. If others need this, probably should write an abstraction.
      // FIXME this will not work in React since it has XSS protection. Worked
      // in Jekyll because of how Liquid templates work.
      // TODO write an abstraction for this ... lol. Use a list. Maybe detect if
      // value of date is string or array.
      date:
        "<br />" +
        [
          "Fall 2018",
          "Spring 2019",
          "Fall 2019",
          "Spring 2020",
          "Fall 2021",
        ].join("<br />") +
        "\n",
      image_url:
        "https://live.staticflickr.com/65535/51210648772_2e277669d4_m.jpg",
      more_url: "https://meritpages.com/bengodfrey",
    },
    {
      title: "Best Project Using Domain.com",
      project: "CUparkit",
      from: "CUhackit",
      date: "January 27th, 2019",
      image_url:
        "https://live.staticflickr.com/65535/51217790839_b0d904c837_q.jpg",
      more_url: "https://devpost.com/software/cuparkit",
    },
    {
      title: "Best Software Hack",
      project: "Tiger Dining Alexa Skill",
      from: "CUhackit Hello World",
      date: "October 13th, 2018",
      image_url:
        "https://live.staticflickr.com/65535/49692245241_a2b4aec229_q.jpg",
      more_url: "https://devpost.com/software/clemson-dining-alexa-skill",
    },
  ],

  // Currently, there are none of these.
  // Just thinking about future sections.
  publications: [{ title: "XXX", date: "XXX" }],
};
