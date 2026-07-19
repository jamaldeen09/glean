import { SearchExhibitResult } from "@/agent/tools/search-exhibit";
import { PartyNotesSearchResult } from "@/agent/tools/search-party-notes";

interface ScoreResult {
  hybridScore: number,
  vectorScore: number,
  keywordScore: number,
}

export function exhibitPageChunksApplyRFF(args: {
  vectorDocs: SearchExhibitResult[],
  keywordDocs: SearchExhibitResult[],
  finalLimit: number
}) {
  const RRF_CONSTANT = 60;
  const combinedMap = new Map<string, (Omit<SearchExhibitResult, "score"> & ScoreResult)>();

  const processRankings = (docs: SearchExhibitResult[], isVector: boolean) => {
    docs.forEach((doc, index) => {
      const rank = index + 1;
      const rrfScore = 1 / (RRF_CONSTANT + rank);

      const existing = combinedMap.get(doc.id);
      if (existing) {
        existing.hybridScore += rrfScore;
        if (isVector) existing.vectorScore = doc.score;
        else existing.keywordScore = doc.score;
      } else {
        combinedMap.set(doc.id, {
          id: doc.id,
          text: doc.text,
          pageNumber: doc.pageNumber,
          exhibitTitle: doc.exhibitTitle,
          exhibitDescription: doc.exhibitDescription,
          hybridScore: rrfScore,
          vectorScore: isVector ? doc.score : 0,
          keywordScore: isVector ? 0 : doc.score
        });
      }
    });
  };

  processRankings(args.vectorDocs, true);
  processRankings(args.keywordDocs, false);

  return Array.from(combinedMap.values())
    .sort((a, b) => b.hybridScore - a.hybridScore)
    .slice(0, args.finalLimit);
}

export function noteChunksApplyRFF(args: {
    vectorDocs: PartyNotesSearchResult[],
    keywordDocs: PartyNotesSearchResult[],
    finalLimit: number
  }) {
    const RRF_CONSTANT = 60;
    const combinedMap = new Map<string, (Omit<PartyNotesSearchResult, "score"> & ScoreResult)>();
  
    const processRankings = (docs: PartyNotesSearchResult[], isVector: boolean) => {
      docs.forEach((doc, index) => {
        const rank = index + 1;
        const rrfScore = 1 / (RRF_CONSTANT + rank);
  
        const existing = combinedMap.get(doc.id);
        if (existing) {
          existing.hybridScore += rrfScore;
          if (isVector) existing.vectorScore = doc.score;
          else existing.keywordScore = doc.score;
        } else {
          combinedMap.set(doc.id, {
            id: doc.id,
            text: doc.text,
            partyName: doc.partyName,
            partyRole: doc.partyRole,
            hybridScore: rrfScore,
            vectorScore: isVector ? doc.score : 0,
            keywordScore: isVector ? 0 : doc.score
          });
        }
      });
    };

    processRankings(args.vectorDocs, true);
    processRankings(args.keywordDocs, false);
  
    return Array.from(combinedMap.values())
      .sort((a, b) => b.hybridScore - a.hybridScore)
      .slice(0, args.finalLimit);
  }