/*
 * Learning log — one object per day of work. Newest can go anywhere; the page sorts.
 *   date:  "YYYY-MM-DD"            to: optional end date for a multi-day block
 *   track: "lld" | "hld" | "dsa" | "genai"
 *   lc:    LeetCode problems as [number, "slug", "Name"]
 *   link:  optional { href, label }
 */
window.LEARNING_LOG = [
  // ---------- GenAI ----------
  { date: "2026-08-02", track: "genai",
    title: "Schema Intelligence Assistant — hybrid RAG retrieval and an agent",
    note: "Hybrid retrieval pipeline with a recall eval, an exact-match LLM response cache, and a conversational agent that routes deterministically first and falls back to the LLM.",
    link: { href: "https://github.com/mukundcs1611/schema_intelligence_assistant", label: "Repo" } },
  { date: "2026-08-03", track: "genai",
    title: "Testing LLM output quality",
    note: "Added an AI output-quality test suite, a reviewer CLI that promotes LLM-suggested detection rules only after human review, and an honest list of known limitations.",
    link: { href: "https://github.com/mukundcs1611/schema_intelligence_assistant", label: "Repo" } },
  { date: "2026-08-04", track: "genai",
    title: "Architecture write-up for the assistant",
    note: "System HLD plus LLDs for the PII detector and the RAG pipeline. Everything runs on local models through Ollama.",
    link: { href: "https://github.com/mukundcs1611/schema_intelligence_assistant", label: "Repo" } },
  { date: "2026-10-05", track: "genai",
    title: "Transformers → GenAI course",
    note: "Working through a transformers-to-GenAI video course a few hours a day, from attention fundamentals up to modern LLM applications." },

  // ---------- LLD ----------
  { date: "2026-08-16", to: "2026-08-17", track: "lld",
    title: "Parking lot billing engine",
    note: "Charges the cheapest applicable of several pricing policies. Strategy pattern so a new policy is one class; half-open time windows; peak-hour multipliers per block; JUnit 5 tests.",
    link: { href: "https://github.com/mukundcs1611/ParkingLot", label: "Repo" } },
  { date: "2026-10-15", track: "lld",
    title: "Employee time-clock",
    note: "Clock in/out, list who's clocked in, hours logged over the last 7 days. Lesson: settle the shift data model first, because the reporting query drives it." },
  { date: "2026-10-16", track: "lld",
    title: "Mock project: Spring Boot & Hibernate lab (consent management)",
    note: "Eleven predict-run-explain experiments against real Postgres, Redis and Kafka: bean lifecycle, auto-configuration, AOP proxy traps, transaction propagation and rollback rules, N+1 and fetching, entity states and dirty checking, optimistic locking, Redis cache-aside, Kafka retry topics + DLT, transactional outbox with Debezium CDC." },
  { date: "2026-10-18", track: "lld",
    title: "Hibernate deep-dive — proxies and fetching",
    note: "Self-invocation and final methods silently bypass @Transactional proxies. Fixed N+1 with JOIN FETCH, @EntityGraph and batch fetching, instead of re-enabling open-in-view." },
  { date: "2026-10-19", track: "lld",
    title: "Mock project: privacy-governance workflow (data-subject requests)",
    note: "One delete/access request fans out into a task per downstream system (CRM, billing, analytics). Bidirectional one-to-many mapping with justified cascade and fetch choices, fetch-join without the pagination trap, an atomic PENDING → DONE update, and the tricky part: two systems finishing the last tasks at the same moment." },

  // ---------- HLD ----------
  { date: "2026-10-06", track: "hld",
    title: "Live cricket scores (Cricbuzz-style)",
    note: "CDN with an origin shield and request collapsing; tiered TTLs (a few seconds for live scores, ~1 min for scorecards, ~1 h for finished matches); poll through the CDN for small matches, switch to SSE above a viewer threshold. 99.99% ≈ 52 min of downtime a year." },

  { date: "2026-10-09", track: "hld",
    title: "Mock project: CloudFront video-delivery lab",
    note: "Packaged a source video into HLS with three bitrate renditions, 4-second segments and a master playlist, as the origin for CloudFront delivery. It's the hands-on half of the video-streaming design." },

  // ---------- DSA ----------
  { date: "2026-09-28", track: "dsa",
    title: "Pattern-recognition sheet",
    note: "Twelve patterns with how to spot each: two pointers, sliding window, fast/slow, intervals, binary search, DFS, BFS, DP, backtracking, greedy, heap, hashing." },
  { date: "2026-09-28", to: "2026-10-06", track: "dsa",
    title: "Sliding window",
    lc: [[3, "longest-substring-without-repeating-characters", "Longest Substring Without Repeating Characters"],
         [340, "longest-substring-with-at-most-k-distinct-characters", "Longest Substring with At Most K Distinct"],
         [424, "longest-repeating-character-replacement", "Longest Repeating Character Replacement"]] },
  { date: "2026-10-05", to: "2026-10-06", track: "dsa",
    title: "Binary search — on answers and rotated arrays",
    lc: [[875, "koko-eating-bananas", "Koko Eating Bananas"],
         [33, "search-in-rotated-sorted-array", "Search in Rotated Sorted Array"],
         [153, "find-minimum-in-rotated-sorted-array", "Find Minimum in Rotated Sorted Array"]] },
  { date: "2026-10-07", track: "dsa",
    title: "Intervals, DP, greedy + heap",
    lc: [[986, "interval-list-intersections", "Interval List Intersections"],
         [322, "coin-change", "Coin Change"],
         [1353, "maximum-number-of-events-that-can-be-attended", "Maximum Number of Events"]] },
  { date: "2026-10-08", track: "dsa",
    title: "Two pointers and grid graphs",
    note: "Re-solved 424 cold. DFS flood fill for islands, multi-source BFS for oranges.",
    lc: [[15, "3sum", "3Sum"],
         [200, "number-of-islands", "Number of Islands"],
         [994, "rotting-oranges", "Rotting Oranges"]] },
  { date: "2026-10-09", track: "dsa",
    title: "Trees",
    lc: [[124, "binary-tree-maximum-path-sum", "Binary Tree Maximum Path Sum"]] },
  { date: "2026-10-10", track: "dsa",
    title: "Hashing, plus a tree redo",
    note: "Re-solved 124 a day later.",
    lc: [[128, "longest-consecutive-sequence", "Longest Consecutive Sequence"]] },
  { date: "2026-10-12", track: "dsa",
    title: "Trees and graphs",
    lc: [[98, "validate-binary-search-tree", "Validate BST"],
         [133, "clone-graph", "Clone Graph"],
         [329, "longest-increasing-path-in-a-matrix", "Longest Increasing Path in a Matrix"],
         [297, "serialize-and-deserialize-binary-tree", "Serialize and Deserialize Binary Tree"]] },
  { date: "2026-10-13", track: "dsa",
    title: "Topological sort — Kahn's algorithm",
    note: "Also redid Clone Graph.",
    lc: [[207, "course-schedule", "Course Schedule"]] },
  { date: "2026-10-14", track: "dsa",
    title: "Dijkstra, and cycle detection with 3-state DFS",
    note: "Solved Course Schedule a second way: white/grey/black DFS.",
    lc: [[743, "network-delay-time", "Network Delay Time"]] },
  { date: "2026-10-18", track: "dsa",
    title: "Variable-size sliding window",
    note: "First instinct was to sort, which breaks contiguity. A shrinking window is the fix.",
    lc: [[209, "minimum-size-subarray-sum", "Minimum Size Subarray Sum"]] }
];

window.LEARNING_NEXT = [
  { track: "hld", title: "Zanzibar-style authorization" },
  { track: "hld", title: "Video streaming — end-to-end design on top of the CloudFront lab" },
  { track: "genai", title: "Agent infrastructure and agent-to-agent protocols" }
];
