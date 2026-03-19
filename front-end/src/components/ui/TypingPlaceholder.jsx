import { useState, useEffect, memo } from "react";

const TypingPlaceholder = memo(({ words = [] }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i] || "";

      setDisplayText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 70 : 150);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, words]);

  if (!words || words.length === 0) return null;

  return <span>{displayText}|</span>;
});

export default TypingPlaceholder;