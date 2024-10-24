import React from 'react';

const highlightText = (text: string, query: string) => {
  if (!query) return <span>{text}</span>;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const key = part.toLowerCase() === query.toLowerCase()
      ? `highlight-${index}`
      : `normal-${index}`;

    return part.toLowerCase() === query.toLowerCase() ? (
      <span key={key} className="bg-yellow-300">
        {part}
      </span>
    ) : (
      <span key={key}>{part}</span>
    );
  });
};

export default highlightText;
