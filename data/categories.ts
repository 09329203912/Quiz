import { Category } from "@/types/quiz";

export const categories: Category[] = [
  { id: "biology", name: "Biology", shortLabel: "Bio", glyph: "Bi", description: "Cells, genetics, and the systems of living things." },
  { id: "chemistry", name: "Chemistry", shortLabel: "Chem", glyph: "Ch", description: "Elements, reactions, and the rules matter follows." },
  { id: "physics", name: "Physics", shortLabel: "Phys", glyph: "Ph", description: "Motion, energy, and the forces behind them." },
  { id: "mathematics", name: "Mathematics", shortLabel: "Math", glyph: "Mt", description: "Numbers, logic, and problem-solving fundamentals." },
  { id: "computer-science", name: "Computer Science", shortLabel: "CS", glyph: "CS", description: "Algorithms, data structures, and how computers think." },
  { id: "programming", name: "Programming", shortLabel: "Prog", glyph: "Pg", description: "Core concepts that apply across every language." },
  { id: "web-development", name: "Web Development", shortLabel: "Web Dev", glyph: "Wd", description: "How the pieces of the web fit together." },
  { id: "javascript", name: "JavaScript", shortLabel: "JS", glyph: "Js", description: "The language that runs the web." },
  { id: "typescript", name: "TypeScript", shortLabel: "TS", glyph: "Ts", description: "Typed JavaScript for safer, clearer code." },
  { id: "react", name: "React", shortLabel: "React", glyph: "Rx", description: "Components, state, and building interactive UI." },
  { id: "nextjs", name: "Next.js", shortLabel: "Next", glyph: "Nx", description: "The React framework for production apps." },
  { id: "html", name: "HTML", shortLabel: "HTML", glyph: "Ht", description: "The markup that structures every web page." },
  { id: "css", name: "CSS", shortLabel: "CSS", glyph: "Cs", description: "Layout, style, and visual design on the web." },
  { id: "history", name: "History", shortLabel: "History", glyph: "Hi", description: "People and events that shaped the world." },
  { id: "geography", name: "Geography", shortLabel: "Geo", glyph: "Ge", description: "Places, maps, and the planet we live on." },
  { id: "general-knowledge", name: "General Knowledge", shortLabel: "GK", glyph: "GK", description: "A little bit of everything, tested." },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
