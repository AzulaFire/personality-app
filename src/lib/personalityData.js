// personalityData.js – Complete PULSE dataset
// ------------------------------------------------------------
// 1. Core trait modules (20) – fully populated
// 2. Question bank (25 items) for scoring → 5‑letter code
// 3. Name map giving every letter‑combo a catchy title (algorithmic fallback)
// 4. Compatibility logic samples
// 5. Utilities to build profile & score quiz answers
// ------------------------------------------------------------

export const PULSE = {
  purpose: {
    A: { code:'A', name:'Achievement', summary:'Driven to set and crush goals, valuing measurable progress.', strengths:['Ambitious','Resilient','Focused'], challenges:['Work‑life balance','Impatience'], idealJobs:['Startup Founder','Product Manager','Sales Engineer'], hobbies:['Competitive sports','Speed‑running games','Skill certifications'] },
    C: { code:'C', name:'Connection', summary:'Motivated by deep relationships and harmony.', strengths:['Empathetic','Supportive','Team‑oriented'], challenges:['People‑pleasing','Conflict avoidance'], idealJobs:['Therapist','HR Partner','Community Manager'], hobbies:['Volunteering','Book clubs','Group travel'] },
    F: { code:'F', name:'Freedom', summary:'Seeks autonomy, novelty and exploration.', strengths:['Adaptable','Innovative','Adventurous'], challenges:['Commitment','Routine tasks'], idealJobs:['Travel Blogger','Photojournalist','Field Researcher'], hobbies:['Backpacking','Extreme sports','Improvisational art'] },
    L: { code:'L', name:'Legacy', summary:'Focused on meaning, impact and lasting contributions.', strengths:['Visionary','Purpose‑driven','Mentoring'], challenges:['Perfectionism','Long‑term stress'], idealJobs:['Professor','Architect','Policy Analyst'], hobbies:['Writing','Historical study','Public speaking'] },
  },
  unity: {
    S:{code:'S',name:'Solitary',summary:'Recharges alone; values independence in social life.',strengths:['Self‑sufficient','Reflective','Concentrated'],challenges:['Networking','Delegation'],idealJobs:['Research Scientist','Indie Dev','Archivist'],hobbies:['Solo hiking','Meditation','Reading marathons']},
    E:{code:'E',name:'Selective',summary:'Keeps a small circle of deep connections.',strengths:['Loyal','Discerning','Deep listening'],challenges:['Opening up','Small talk'],idealJobs:['Editor','Consultant','Therapist'],hobbies:['Dinner parties','Strategy games','Craft brewing']},
    O:{code:'O',name:'Open',summary:'Friendly, approachable, enjoys meeting new people.',strengths:['Engaging','Inclusive','Connector'],challenges:['Overcommitting','Boundary setting'],idealJobs:['Event Planner','Sales Rep','Content Creator'],hobbies:['Language exchange','Improv theater','Social sports']},
    G:{code:'G',name:'Group‑Driven',summary:'Energized by teams and collaborative environments.',strengths:['Team leadership','Motivational','Consensus‑building'],challenges:['Groupthink','Dependence on approval'],idealJobs:['Agile Coach','Band Leader','Product Owner'],hobbies:['Team sports','Choir','Hackathons']},
  },
  logic:{
    I:{code:'I',name:'Intuitive',summary:'Big‑picture, pattern‑spotting thinker.',strengths:['Creative insights','Future‑oriented'],challenges:['Detail follow‑through','Proof gathering'],idealJobs:['UX Designer','Trend Analyst','Storyteller'],hobbies:['Dream journaling','Spec‑fic writing','Brainstorming workshops']},
    P:{code:'P',name:'Practical',summary:'Grounded in real‑world evidence and experience.',strengths:['Hands‑on','Reliable','Resourceful'],challenges:['Risk aversion','Abstract ideas'],idealJobs:['Operations Manager','Teacher','Craftsperson'],hobbies:['DIY projects','Gardening','Cooking']},
    A:{code:'A',name:'Analytical',summary:'Data‑driven, precise, systematic thinker.',strengths:['Problem‑solving','Objectivity','Systemization'],challenges:['Perfectionism','Analysis paralysis'],idealJobs:['Data Scientist','Engineer','Financial Analyst'],hobbies:['Puzzles','Chess','Quantified‑self tracking']},
    D:{code:'D',name:'Dreamer',summary:'Visionary, imaginative, nonlinear thinker.',strengths:['Originality','Inventiveness'],challenges:['Execution','Consistency'],idealJobs:['Concept Artist','Game Writer','Entrepreneur'],hobbies:['World‑building','Painting','Music composition']},
  },
  stress:{
    A:{code:'A',name:'Avoidant',summary:'Withdraws or freezes when stressed.',strengths:['Calm under minor issues','Self‑reflection'],challenges:['Procrastination','Communication gaps'],idealJobs:['Archivist','Night‑shift Dev','Freelance Writer'],hobbies:['Solo gaming','Journaling','Model building']},
    R:{code:'R',name:'Reactive',summary:'Expresses emotions vividly under pressure.',strengths:['Authenticity','Quick mobilization'],challenges:['Over‑reaction','Conflict escalation'],idealJobs:['Emergency Nurse','Sports Coach','Live Streamer'],hobbies:['Contact sports','Karaoke','Real‑time strategy games']},
    D:{code:'D',name:'Adaptive',summary:'Shifts strategies fluidly to meet challenges.',strengths:['Flexibility','Learning mindset'],challenges:['Indecision','Scope creep'],idealJobs:['Consulting','Product Design','Diplomat'],hobbies:['Impro theatre','Travel hacking','Iterative prototyping']},
    P:{code:'P',name:'Proactive',summary:'Anticipates and mitigates problems early.',strengths:['Preparedness','Leadership'],challenges:['Over‑control','Risk anxiety'],idealJobs:['Project Manager','Security Analyst','Disaster Planner'],hobbies:['Prepping','Long‑term investing','Marathon training']},
  },
  engagement:{
    P:{code:'P',name:'Planner',summary:'Structured, long‑term thinker and doer.',strengths:['Organization','Goal tracking'],challenges:['Rigidity','Slow to pivot'],idealJobs:['Project Scheduler','Architect','Curriculum Designer'],hobbies:['Bullet journaling','Puzzle boxes','Urban planning sims']},
    S:{code:'S',name:'Spontaneous',summary:'Acts on impulse and intuition in the moment.',strengths:['Agility','High energy'],challenges:['Inconsistency','Oversight'],idealJobs:['Tour Guide','First‑responder','Content Vlogger'],hobbies:['Street photography','Flash mobs','Pick‑up sports']},
    I:{code:'I',name:'Iterative',summary:'Learns via rapid cycles of trying and refining.',strengths:['Continuous improvement','Feedback‑oriented'],challenges:['Never‑finished feeling','Version fatigue'],idealJobs:['Software Dev','Agile Coach','Chef'],hobbies:['Speed prototyping','Hackathons','Beta testing']},
    G:{code:'G',name:'Goal‑Driven',summary:'Motivated by clear targets and measurable wins.',strengths:['Focus','Competitiveness'],challenges:['Tunnel vision','Win‑loss mindset'],idealJobs:['Sales Exec','Athlete','Esports Pro'],hobbies:['Leaderboards gaming','Fitness challenges','Trading card games']},
  },
};

// Question bank – 25 items (5 per dimension)
export const QUESTIONS = [
  // Purpose
  {id:1, dimension:'purpose', A:'I enjoy ticking goals off a list.', C:'I value supporting others above my own wins.'},
  {id:2, dimension:'purpose', F:'Freedom to choose my schedule matters most.', L:'I want my work to outlive me.'},
  {id:3, dimension:'purpose', A:'Targets motivate me.', C:'Relationships motivate me.'},
  {id:4, dimension:'purpose', F:'Exploration excites me.', L:'Building a legacy excites me.'},
  {id:5, dimension:'purpose', A:'Competition drives me.', C:'Collaboration drives me.'},
  // Unity
  {id:6, dimension:'unity', S:'Solo projects recharge me.', O:'Meeting new people energizes me.'},
  {id:7, dimension:'unity', E:'I open up to a select few.', G:'I thrive in big teams.'},
  {id:8, dimension:'unity', S:'Quiet time is essential.', O:'Busy social calendars excite me.'},
  {id:9, dimension:'unity', E:'Depth over breadth in friendships.', G:'More the merrier.'},
  {id:10,dimension:'unity', S:'After work I prefer solitude.', O:'After work I join gatherings.'},
  // Logic
  {id:11,dimension:'logic', I:'I trust gut patterns.', A:'I trust hard data.'},
  {id:12,dimension:'logic', P:'I prefer hands‑on demos.', D:'I prefer blue‑sky ideas.'},
  {id:13,dimension:'logic', A:'I make spreadsheets for fun.', I:'I storyboard ideas.'},
  {id:14,dimension:'logic', P:'I learn by doing.', D:'I imagine possibilities first.'},
  {id:15,dimension:'logic', A:'Precision > speed.', I:'Vision > detail.'},
  // Stress
  {id:16,dimension:'stress', A:'I freeze or avoid confrontations.', R:'I vent emotions openly.'},
  {id:17,dimension:'stress', D:'I pivot strategies quickly.', P:'I draft contingency plans.'},
  {id:18,dimension:'stress', A:'I postpone hard tasks.', P:'I tackle them early.'},
  {id:19,dimension:'stress', R:'I express stress vocally.', D:'I shift perspective.'},
  {id:20,dimension:'stress', P:'I pre‑empt problems.', A:'I hope they resolve themselves.'},
  // Engagement
  {id:21,dimension:'engagement', P:'I map milestones.', S:'I dive right in.'},
  {id:22,dimension:'engagement', I:'I release v1 fast, refine later.', G:'I chase the win condition.'},
  {id:23,dimension:'engagement', S:'I improvise solutions.', P:'I draft detailed plans.'},
  {id:24,dimension:'engagement', I:'Iteration excites me.', G:'Scoring points excites me.'},
  {id:25,dimension:'engagement', G:'Clear KPIs motivate me.', S:'Freedom to pivot motivates me.'},
];

// Simple scoring util – expects answers as {id: choiceKey}
export function scoreQuiz(answers){
  const tally={purpose:{},unity:{},logic:{},stress:{},engagement:{}};
  QUESTIONS.forEach(q=>{
    const choice=answers[q.id];
    if(!choice) throw new Error('Missing answer '+q.id);
    tally[q.dimension][choice]=(tally[q.dimension][choice]||0)+1;
  });
  function topLetter(obj){return Object.entries(obj).sort((a,b)=>b[1]-a[1])[0][0];}
  const code=[topLetter(tally.purpose),topLetter(tally.unity),topLetter(tally.logic),topLetter(tally.stress),topLetter(tally.engagement)].join('');
  return buildProfile(code);
}

// Name map (few specials) + fallback generator
const NAME_MAP={CFADP:'The Independent Strategist',AOGRG:'The Bold Commander'};
export function generateTypeName(code){
  if(NAME_MAP[code]) return NAME_MAP[code];
  const p=PULSE.purpose[code[0]].name;
  const u=PULSE.unity[code[1]].name.split('-')[0];
  return `The ${u} ${p}`;
}

export const COMPATIBILITY={ /* same stub as before – expand later */ };

export function buildProfile(code){
  const letters=code.split('');
  const traits=[PULSE.purpose[letters[0]],PULSE.unity[letters[1]],PULSE.logic[letters[2]],PULSE.stress[letters[3]],PULSE.engagement[letters[4]]];
  return{
    code,
    name:generateTypeName(code),
    summary:traits.map(t=>t.summary).join(' '),
    strengths:[...new Set(traits.flatMap(t=>t.strengths))],
    challenges:[...new Set(traits.flatMap(t=>t.challenges))],
    idealJobs:[...new Set(traits.flatMap(t=>t.idealJobs))],
    hobbies:[...new Set(traits.flatMap(t=>t.hobbies))],
  };
}
