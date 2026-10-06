import { Data, Effect, Schema } from 'effect';

const CourseSchema = Schema.Struct({
  slug: Schema.String,
  name: Schema.String,
  group: Schema.Literal('Board preparation', 'Entrance exams', 'Computer science'),
  level: Schema.String,
  description: Schema.String,
  subjects: Schema.Array(Schema.String),
  focus: Schema.Array(Schema.Struct({ title: Schema.String, description: Schema.String })),
  icon: Schema.Literal('school', 'college', 'medical', 'engineering', 'exam', 'code'),
  shortName: Schema.String,
  audience: Schema.String,
});

export type Course = typeof CourseSchema.Type;

const courses: unknown = [
  {
    slug: 'ssc', shortName: 'SSC', audience: 'Class 10', name: 'SSC', group: 'Board preparation', level: 'Class 10 · Maharashtra Board', icon: 'school',
    description: 'Build a strong foundation for your board exams, one subject and one chapter at a time.',
    subjects: ['Mathematics', 'Science', 'Board subjects'],
    focus: [
      { title: 'Understand the foundations', description: 'Start with the ideas behind each chapter, rather than memorising an answer without understanding it.' },
      { title: 'Prepare for board questions', description: 'Explore the question formats and written preparation that matter for the Maharashtra SSC examination.' },
      { title: 'Plan your next step', description: 'Speak to the team about your current subjects, preparation needs and the right batch for you.' },
    ],
  },
  {
    slug: 'hsc', shortName: 'HSC', audience: 'Classes 11 & 12', name: 'HSC', group: 'Board preparation', level: 'Classes 11 & 12 · Science', icon: 'college',
    description: 'Make your higher secondary years count with focused preparation for HSC science.',
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology'],
    focus: [
      { title: 'A stronger science foundation', description: 'Connect the principles you learn in Class 11 with the depth required in Class 12.' },
      { title: 'Your subject combination', description: 'Discuss your mathematics or biology pathway and the board subjects you need support with.' },
      { title: 'Computer Science too', description: 'HSC Computer Science is also offered. Ask the team about combining it with your HSC preparation.' },
    ],
  },
  {
    slug: 'neet', shortName: 'NEET', audience: 'Medical', name: 'NEET', group: 'Entrance exams', level: 'Medical entrance preparation', icon: 'medical',
    description: 'Work towards a future in medicine with preparation across physics, chemistry and biology.',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    focus: [
      { title: 'Biology with understanding', description: 'Organise your preparation around the concepts and connections across biology topics.' },
      { title: 'Physics and chemistry matter', description: 'Build your approach to the numerical and conceptual questions across both subjects.' },
      { title: 'Find your preparation route', description: 'Speak to the team about your class, target exam year and current preparation before choosing a batch.' },
    ],
  },
  {
    slug: 'jee', shortName: 'JEE', audience: 'Engineering', name: 'JEE', group: 'Entrance exams', level: 'Engineering entrance preparation', icon: 'engineering',
    description: 'Build the concepts and problem-solving approach behind your engineering ambitions.',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    focus: [
      { title: 'Understand, then apply', description: 'Move from understanding a concept to recognising where and how to use it in a problem.' },
      { title: 'Connect your PCM preparation', description: 'Give physics, chemistry and mathematics their place in a balanced preparation plan.' },
      { title: 'Discuss your target', description: 'Confirm the exam coverage, batch schedule and suitability with the institute before enrolling.' },
    ],
  },
  {
    slug: 'mht-cet', shortName: 'MHT-CET', audience: 'Maharashtra CET', name: 'MHT-CET', group: 'Entrance exams', level: 'Maharashtra entrance preparation', icon: 'exam',
    description: 'Prepare for your next step in Maharashtra with a dedicated entrance-exam pathway.',
    subjects: ['Physics', 'Chemistry', 'Mathematics / Biology'],
    focus: [
      { title: 'Choose your subject pathway', description: 'Discuss PCM or PCB preparation based on the course you want to pursue.' },
      { title: 'Build on your HSC learning', description: 'Connect your science foundations with the demands of entrance-exam questions.' },
      { title: 'Keep track of official notices', description: 'Follow the Maharashtra CET Cell for application dates, eligibility and the final examination schedule.' },
    ],
  },
  {
    slug: 'hsc-computer-science', shortName: 'HSC CS', audience: 'Classes 11 & 12', name: 'Computer Science', group: 'Computer science', level: 'HSC · Classes 11 & 12', icon: 'code',
    description: 'Give Computer Science the attention it deserves alongside your HSC subjects.',
    subjects: ['Programming', 'Computer systems', 'HSC syllabus'],
    focus: [
      { title: 'Think through the logic', description: 'Develop a clearer understanding of programming and the reasoning behind your code.' },
      { title: 'Connect theory and practice', description: 'Explore computer systems and the practical side of your HSC Computer Science subject.' },
      { title: 'Plan alongside HSC', description: 'Ask the team about subject coverage and the timetable that works with your other classes.' },
    ],
  },
];

export const getCourses = Schema.decodeUnknown(Schema.Array(CourseSchema))(courses);

const ResultSchema = Schema.Struct({
  exam: Schema.Literal('SSC', 'HSC', 'NEET', 'JEE', 'MHT-CET'),
  student: Schema.String,
  score: Schema.String,
  year: Schema.Number,
});

export type Result = typeof ResultSchema.Type;
export const resultExams = ['SSC', 'HSC', 'NEET', 'JEE', 'MHT-CET'] as const;

const results: unknown = [];

export const getResults = Schema.decodeUnknown(Schema.Array(ResultSchema))(results);

export class CourseNotFound extends Data.TaggedError('CourseNotFound')<{ slug: string }> {}

export const findCourse = (slug: string) => Effect.flatMap(getCourses, (catalog) => {
  const course = catalog.find((entry) => entry.slug === slug);
  return course ? Effect.succeed(course) : Effect.fail(new CourseNotFound({ slug }));
});

export const socialLinks = {
  sscInstagram: 'https://www.instagram.com/worksmarttutorial/',
  hscInstagram: 'https://www.instagram.com/worksmart.hsc/',
  sscYoutube: 'https://www.youtube.com/@WorkSmartSSC',
  hscYoutube: 'https://www.youtube.com/@WorkSmartHSC',
} as const;
