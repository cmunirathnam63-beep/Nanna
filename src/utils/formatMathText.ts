export function formatMathText(text: string | null | undefined): string {
  if (!text) return "";

  let formatted = text;

  // 1. Replace LaTeX fraction macro: \frac{a}{b} -> a/b
  formatted = formatted.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1/$2");

  // 2. Replace \text{...} -> ...
  formatted = formatted.replace(/\\text\{([^}]+)\}/g, "$1");

  // 3. Replace common LaTeX math symbols with clean Unicode
  formatted = formatted
    .replace(/\\cdot/g, "·")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\pi/g, "π")
    .replace(/\\theta/g, "θ")
    .replace(/\\degree/g, "°")
    .replace(/\\%|\\percent/g, "%")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\implies/g, "⇒");

  // 4. Strip single or double $ delimiters e.g. $y = k x$ -> y = k x, $x$ -> x, $3/4$ -> 3/4
  formatted = formatted.replace(/\$\$([^$]+)\$\$/g, "$1");
  formatted = formatted.replace(/\$([^$]+)\$/g, "$1");

  // 5. Clean up any leftover awkward topic injection phrases
  formatted = formatted.replace(/In mathematical models for\s*["'“”`]?[^"'“”`]*["'“”`]?,\s*/gi, "");

  return formatted;
}

export function cleanTopicTitle(rawTitle: string | null | undefined): string {
  if (!rawTitle) return "Topic";
  return rawTitle
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/^["'“”`]+|["'“”`]+$/g, '')
    .replace(/^Chapter\s*\d+:?\s*/i, '')
    .replace(/^Grade\s*\d+\s*[-:]?\s*/i, '')
    .replace(/Visual Explorer|Interactive Practice Hub/i, '')
    .trim();
}
