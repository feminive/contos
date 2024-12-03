import { useState, useEffect } from "react";


  useEffect(() => {
    const fetchVisitCount = async () => {
      if (!pageId) {
        console.error("Invalid pageId:", pageId);
        return;
      }

      const encodedPageId = encodeURIComponent(pageId);
      const url = `${process.env.NEXT_PRIVATE_URL}/api/visitors/${encodedPageId}/count`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.warn(
            `Failed to fetch visit count for pageId: ${pageId}, status: ${response.status}`
          );
          return;
        }

        const data = await response.json();

        if (data && typeof data.count === "number") {
          setVisitCount(data.count);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching visit count:", error.message);
      }
    };

    fetchVisitCount();
  }, [pageId]);

  return <>{visitCount}</>;
};

export default Counter;
