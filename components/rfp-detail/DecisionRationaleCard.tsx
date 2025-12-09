import React from 'react';

interface DecisionRationaleCardProps {
  rfp: {
    rationale?: string;
    ai_summary?: string;
    decision_reason?: string;
    decision_rationale?: string;
    whySku?: string[];
    whyScenario?: string[];
    risks?: string[];
  };
}

// Parse markdown-style text and split into sections
const parseRationale = (text: string) => {
  if (!text) return [{ title: '', content: 'No rationale available.' }];

  // Combined pattern to match all section headings
  const sectionPattern = /\*\*((?:Decision Recommendation|Why|Win Probability and Key Risks|Competitor Reaction|One-Sentence Summary(?: for Non-Technical Buyer)?):?)\*\*/gi;
  
  const sections: Array<{ title: string; content: string }> = [];
  let lastIndex = 0;
  const matches: Array<{ index: number; title: string; fullMatch: string }> = [];
  
  // Find all section headings
  let match;
  while ((match = sectionPattern.exec(text)) !== null) {
    matches.push({
      index: match.index,
      title: match[1].replace(/:/g, '').trim(),
      fullMatch: match[0]
    });
  }

  // If no sections found, return the whole text as one section
  if (matches.length === 0) {
    return [{ title: '', content: text }];
  }

  // Process sections
  matches.forEach((match, i) => {
    // Add content before this section
    if (match.index > lastIndex) {
      const preContent = text.substring(lastIndex, match.index).trim();
      if (preContent) {
        sections.push({ title: '', content: preContent });
      }
    }

    // Extract content for this section
    const contentStart = match.index + match.fullMatch.length;
    const nextMatchIndex = i < matches.length - 1 ? matches[i + 1].index : text.length;
    const content = text.substring(contentStart, nextMatchIndex).trim();
    
    if (content) {
      sections.push({ title: match.title, content });
    }
    
    lastIndex = nextMatchIndex;
  });

  // Add any remaining content after last section
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex).trim();
    if (remaining) {
      sections.push({ title: '', content: remaining });
    }
  }

  return sections.length > 0 ? sections : [{ title: '', content: text }];
};

// Format text with markdown-style formatting
const formatText = (text: string) => {
  // Convert **bold** to <strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert * list items to <ul>
  const lines = formatted.split('\n');
  const result: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Check if line starts with * or - (list item)
    if (trimmed.match(/^[\*\-]\s+/)) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(trimmed.replace(/^[\*\-]\s+/, ''));
    } else {
      // End current list if exists
      if (inList) {
        result.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        inList = false;
        listItems = [];
      }
      
      // Add regular paragraph
      if (trimmed) {
        result.push(
          <p key={`p-${index}`} className="mb-3" dangerouslySetInnerHTML={{ __html: trimmed }} />
        );
      }
    }
  });

  // Close any remaining list
  if (inList && listItems.length > 0) {
    result.push(
      <ul key="list-final" className="list-disc list-inside space-y-1 my-2">
        {listItems.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    );
  }

  return result.length > 0 ? result : <p dangerouslySetInnerHTML={{ __html: formatted }} />;
};

const DecisionRationaleCard = ({ rfp }: DecisionRationaleCardProps) => {
  // Get rationale from various possible fields
  const rationaleText = rfp.decision_rationale || rfp.rationale || rfp.ai_summary || rfp.decision_reason || "No rationale available.";
  
  const sections = parseRationale(rationaleText);

  return (
    <div className="card-rfp lg:col-span-3">
      <h2 className="text-lg font-bold mb-4">Decision Rationale</h2>
      
      <div className="prose max-w-none text-sm leading-relaxed max-h-80 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index} className={index > 0 ? "mt-6" : ""}>
            {section.title && (
              <h4 className="font-semibold text-foreground mb-2 text-base">
                {section.title}
              </h4>
            )}
            <div className="text-muted-foreground">
              {formatText(section.content)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionRationaleCard;

