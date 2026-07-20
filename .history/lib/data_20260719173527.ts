export type PartyRole = "Defendant" | "Witness" | "Victim" | "Person of Interest";

export interface Party {
  id: string;
  name: string;
  role: PartyRole;
  notes: { id: string; body: string; createdAt: string }[];
}

export interface ExhibitPage {
  id: string;
  number: number;
  title?: string;
  body: string; // rendered as document text
}

export interface Exhibit {
  id: string;
  label: string; // "Exhibit A"
  title: string;
  description: string;
  kind: "Police Report" | "Witness Statement" | "Medical Record" | "Text Messages" | "Photograph" | "Contract";
  pages: ExhibitPage[];
}

export interface CaseRecord {
  id: string;
  number: string; // "2024-CV-01847"
  title: string;
  client: string;
  court: string;
  status: "Active" | "Discovery" | "Pretrial" | "Closed";
  updatedAt: string;
  exhibits: Exhibit[];
  parties: Party[];
}

const lorem = (seed: string) =>
  `On the date in question, the affiant states that they were present at the location described in paragraph 3 of the incident report. The affiant further attests, under penalty of perjury, that the following observations were made in the ordinary course of duty. ${seed} All statements herein are made to the best of the affiant's recollection and are supported by contemporaneous notes taken at the scene.\n\nThe undersigned counsel has reviewed the accompanying documentation and finds no material inconsistency with prior statements of record. Cross-references to Exhibit A, page 4, and Exhibit C, pages 11–14, are appended for the court's convenience.`;

export const CASES: CaseRecord[] = [
  {
    id: "hollis-v-arden",
    number: "2024-CV-01847",
    title: "Hollis v. Arden Municipal",
    client: "M. Hollis",
    court: "Superior Ct., Dept. 14",
    status: "Discovery",
    updatedAt: "2 days ago",
    exhibits: [
      {
        id: "a",
        label: "Exhibit A",
        title: "Incident Report — 3rd Precinct",
        description: "Original police incident report filed 03/14/2024, including responding officer notes.",
        kind: "Police Report",
        pages: Array.from({ length: 6 }, (_, i) => ({
          id: `a-${i + 1}`,
          number: i + 1,
          title: i === 0 ? "Cover Page" : undefined,
          body: lorem(`Page ${i + 1} details officer badge #4471's narrative concerning the events of March 14.`),
        })),
      },
      {
        id: "a",
        label: "Exhibit A",
        title: "Incident Report — 3rd Precinct",
        description: "Original police incident report filed 03/14/2024, including responding officer notes.",
        kind: "Police Report",
        pages: Array.from({ length: 6 }, (_, i) => ({
          id: `a-${i + 1}`,
          number: i + 1,
          title: i === 0 ? "Cover Page" : undefined,
          body: lorem(`Page ${i + 1} details officer badge #4471's narrative concerning the events of March 14.`),
        })),
      },
      {
        id: "b",
        label: "Exhibit B",
        title: "Witness Statement — J. Ruiz",
        description: "Signed statement from bystander witness taken 03/16/2024.",
        kind: "Witness Statement",
        pages: Array.from({ length: 3 }, (_, i) => ({
          id: `b-${i + 1}`,
          number: i + 1,
          body: lorem(`Witness Ruiz describes the sequence of events from the northeast corner of the intersection.`),
        })),
      },
      {
        id: "c",
        label: "Exhibit C",
        title: "Emergency Room Records — St. Alban's",
        description: "Certified medical records covering admission through discharge, 03/14–03/17.",
        kind: "Medical Record",
        pages: Array.from({ length: 14 }, (_, i) => ({
          id: `c-${i + 1}`,
          number: i + 1,
          body: lorem(`Attending physician's notes and triage summary, admission ID 88-2231.`),
        })),
      },
      {
        id: "d",
        label: "Exhibit D",
        title: "SMS Export — Client Device",
        description: "Extracted text message thread, 02/28–03/14, with metadata.",
        kind: "Text Messages",
        pages: Array.from({ length: 8 }, (_, i) => ({
          id: `d-${i + 1}`,
          number: i + 1,
          body: lorem(`Thread continues between +1-555-0148 and +1-555-0902; timestamps preserved.`),
        })),
      },
    ],
    parties: [
      { id: "p1", name: "Marisol Hollis", role: "Victim", notes: [
        { id: "n1", createdAt: "Mar 20", body: "Client reports ongoing physical therapy twice weekly; ability to return to work remains restricted per attending physician." },
        { id: "n2", createdAt: "Apr 02", body: "Confirmed she retained the original device referenced in Exhibit D; chain-of-custody documented." },
      ]},
      { id: "p2", name: "City of Arden", role: "Defendant", notes: [
        { id: "n3", createdAt: "Mar 22", body: "Defense counsel served initial disclosures. No responsive documents produced yet re: officer disciplinary history." },
      ]},
      { id: "p3", name: "Off. D. Kettering (#4471)", role: "Person of Interest", notes: [
        { id: "n4", createdAt: "Apr 10", body: "Two prior civilian complaints, 2021 and 2022, both closed without discipline. Records request pending." },
      ]},
      { id: "p4", name: "Javier Ruiz", role: "Witness", notes: [
        { id: "n5", createdAt: "Mar 17", body: "Cooperative; willing to testify. Available weekdays after 4:00 PM." },
      ]},
    ],
  },
  {
    id: "estate-of-clemens",
    number: "2023-PR-00922",
    title: "Estate of Clemens",
    client: "R. Clemens (Executor)",
    court: "Probate Div., Rm. 3",
    status: "Pretrial",
    updatedAt: "5 days ago",
    exhibits: [
      { id: "a", label: "Exhibit A", title: "Last Will & Testament", description: "Original notarized will dated 08/2019.", kind: "Contract", pages: Array.from({ length: 9 }, (_, i) => ({ id: `a-${i+1}`, number: i+1, body: lorem("Article " + (i+1)) })) },
      { id: "b", label: "Exhibit B", title: "Trust Amendment (2022)", description: "First amendment to the revocable trust.", kind: "Contract", pages: Array.from({ length: 4 }, (_, i) => ({ id: `b-${i+1}`, number: i+1, body: lorem("Amendment clause") })) },
    ],
    parties: [
      { id: "p1", name: "Ruth Clemens", role: "Witness", notes: [{ id: "n1", createdAt: "Feb 11", body: "Executor of record; keeps original documents in a fireproof safe at the residence." }] },
      { id: "p2", name: "Daniel Clemens", role: "Person of Interest", notes: [] },
    ],
  },
  {
    id: "vega-injury",
    number: "2025-PI-00311",
    title: "Vega — Personal Injury",
    client: "A. Vega",
    court: "Superior Ct., Dept. 6",
    status: "Active",
    updatedAt: "yesterday",
    exhibits: [
      { id: "a", label: "Exhibit A", title: "Collision Diagram", description: "Officer-drawn scene diagram with vehicle positions.", kind: "Police Report", pages: [{ id: "a-1", number: 1, body: lorem("Scene diagram narrative") }] },
      { id: "b", label: "Exhibit B", title: "MRI Results — L4/L5", description: "Imaging report, board-certified radiologist.", kind: "Medical Record", pages: Array.from({ length: 5 }, (_, i) => ({ id: `b-${i+1}`, number: i+1, body: lorem("Imaging finding") })) },
      { id: "c", label: "Exhibit C", title: "Dashcam Timestamp Log", description: "Log of extracted dashcam frames.", kind: "Photograph", pages: Array.from({ length: 12 }, (_, i) => ({ id: `c-${i+1}`, number: i+1, body: lorem("Frame " + (i+1)) })) },
    ],
    parties: [
      { id: "p1", name: "Ana Vega", role: "Victim", notes: [{ id: "n1", createdAt: "Jun 04", body: "Two prior surgeries unrelated to claim; disclosed to opposing counsel." }] },
      { id: "p2", name: "Northshore Freight LLC", role: "Defendant", notes: [] },
      { id: "p3", name: "Ted Marsh (Driver)", role: "Defendant", notes: [{ id: "n2", createdAt: "Jun 12", body: "Logbook irregularities on the day of collision; DOT hours-of-service audit pending." }] },
    ],
  },
  {
    id: "orwell-nda",
    number: "2025-CV-00042",
    title: "Orwell Bioworks — NDA Breach",
    client: "Orwell Bioworks, Inc.",
    court: "Business Court, Div. B",
    status: "Discovery",
    updatedAt: "1 hour ago",
    exhibits: [
      { id: "a", label: "Exhibit A", title: "Mutual NDA (2023)", description: "Executed NDA between the parties.", kind: "Contract", pages: Array.from({ length: 7 }, (_, i) => ({ id: `a-${i+1}`, number: i+1, body: lorem("Clause") })) },
      { id: "b", label: "Exhibit B", title: "Email Thread — R&D Group", description: "Internal communications, 05/2024.", kind: "Text Messages", pages: Array.from({ length: 22 }, (_, i) => ({ id: `b-${i+1}`, number: i+1, body: lorem("Email correspondence") })) },
    ],
    parties: [
      { id: "p1", name: "Orwell Bioworks, Inc.", role: "Victim", notes: [] },
      { id: "p2", name: "Halden Research Group", role: "Defendant", notes: [{ id: "n1", createdAt: "May 30", body: "Received document preservation letter; awaiting response." }] },
      { id: "p3", name: "Dr. Ilya Halden", role: "Person of Interest", notes: [] },
    ],
  },
];

export const findCase = (id: string) => CASES.find((c) => c.id === id);
