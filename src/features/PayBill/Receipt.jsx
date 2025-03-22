import { createWorker } from "tesseract.js";
import { useState, useEffect } from "react";

function extractLastTotalAmount(text) {
  // Various regex patterns to match common total formats on receipts
  const patterns = [
    /TOTAL:[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
    /Total:[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
    /Total[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
    /Amount[\s]*due:?[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
    /Grand[\s]*total:?[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
    /Sum[\s]*total:?[\s]*[\$£€¥]?[\s]*(\d+[.,]?\d*)/gi,
  ];

  // Find all matches for all patterns
  let allMatches = [];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      // Store the match with its position in the text
      allMatches.push({
        value: match[1].replace(",", "."),
        position: match.index,
      });
    }
  }

  // Sort matches by their position in the text (later in the text = later in the receipt)
  allMatches.sort((a, b) => a.position - b.position);

  console.log("All total matches:", allMatches);

  // Return the last match (the final total) if any matches were found
  if (allMatches.length > 0) {
    return allMatches[allMatches.length - 1].value;
  }

  // Try a generic currency pattern as fallback
  const genericCurrencyPattern = /[\$£€¥][\s]*(\d+[.,]?\d*)/g;
  let currencyMatches = [];
  let currencyMatch;

  while ((currencyMatch = genericCurrencyPattern.exec(text)) !== null) {
    currencyMatches.push({
      value: currencyMatch[1].replace(",", "."),
      position: currencyMatch.index,
    });
  }

  if (currencyMatches.length > 0) {
    // Sort by position and return the last one
    currencyMatches.sort((a, b) => a.position - b.position);
    return currencyMatches[currencyMatches.length - 1].value;
  }

  return null; // No total found
}

export default function Receipt() {
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function processReceipt() {
      try {
        const worker = await createWorker("eng");
        const ret = await worker.recognize("/receipt4.jpg");
        const text = ret.data.text;
        console.log("Extracted text:", text);

        const total = extractLastTotalAmount(text);
        if (total) {
          console.log("Final total amount:", total);
          setTotalAmount(total);
        } else {
          console.log("Could not find total amount in the receipt");
          setError("Could not find total amount");
        }

        await worker.terminate();
      } catch (err) {
        console.error("Error processing receipt:", err);
        setError("Error processing receipt: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }

    processReceipt();
  }, []);

  return (
    <div>
      {isLoading && <p>Processing receipt...</p>}
      {totalAmount && !isLoading && <p>Final Total: {totalAmount}</p>}
      {error && !isLoading && <p>Error: {error}</p>}
    </div>
  );
}
