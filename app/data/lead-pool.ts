export type LeadTemplate = {
    name: string;
    industry: string;
    location: string;
    signals: string[];
  };
  
  export const LEAD_POOL: LeadTemplate[] = [
    { name: "Northbound Logistics Co.", industry: "Freight & Transport", location: "Rotterdam, NL", signals: ["expanding fleet", "hiring ops managers", "recent Series B"] },
    { name: "Meridian Health Systems", industry: "Healthcare", location: "Boston, US", signals: ["digital transformation", "new CIO appointed", "RFP open for integration"] },
    { name: "Atlas Manufacturing Group", industry: "Industrial Manufacturing", location: "Stuttgart, DE", signals: ["IoT rollout", "supply chain pain", "factory automation budget"] },
    { name: "Coastline Renewable Partners", industry: "Clean Energy", location: "Lisbon, PT", signals: ["offshore wind expansion", "hiring project finance", "PPA signed"] },
    { name: "Vellum Press", industry: "Publishing", location: "Brooklyn, US", signals: ["print volume declining", "exploring digital distribution", "small team"] },
    { name: "Kestrel Aerospace", industry: "Defense & Aerospace", location: "Bristol, UK", signals: ["compliance audit upcoming", "supplier consolidation", "government contract won"] },
    { name: "Solstice AgroTech", industry: "Agriculture Technology", location: "Davis, US", signals: ["precision farming pilot", "raising Series A", "irrigation sensor deployment"] },
    { name: "Harborline Shipping Ltd.", industry: "Maritime", location: "Singapore", signals: ["port automation RFP", "fuel efficiency initiative", "fleet renewal plan"] },
    { name: "Brightline Dental Partners", industry: "Healthcare", location: "Denver, US", signals: ["multi-site expansion", "practice management software review", "PE-backed"] },
    { name: "Forge & Anvil Steelworks", industry: "Heavy Industry", location: "Pittsburgh, US", signals: ["emissions compliance", "modernization budget approved", "ERP replacement cycle"] },
    { name: "Lumen Education Group", industry: "EdTech", location: "Helsinki, FI", signals: ["district-wide rollout", "learning platform migration", "teacher training budget"] },
    { name: "Cascade Property Management", industry: "Real Estate", location: "Seattle, US", signals: ["portfolio growth 40%", "tenant portal replacement", "maintenance ops scaling"] },
    { name: "Polaris FinTech Advisors", industry: "Financial Services", location: "Zurich, CH", signals: ["regulatory reporting overhaul", "wealth platform migration", "hiring compliance engineers"] },
    { name: "Greenstone BioSciences", industry: "Biotech", location: "Cambridge, UK", signals: ["clinical trial phase 2", "lab automation need", "data platform RFP"] },
    { name: "Terraced Vineyards Coop", industry: "Agriculture", location: "Porto, PT", signals: ["harvest yield tracking", "soil sensor pilot", "small cooperative budget"] },
    { name: "Nimbus Cloud Consulting", industry: "IT Services", location: "Austin, US", signals: ["AWS migration practice", "staff augmentation demand", "MSP contract renewal"] },
    { name: "Ridgeline Construction", industry: "Construction", location: "Oslo, NO", signals: ["project management tool gap", "safety compliance audit", "public infrastructure bid"] },
    { name: "Sable & Stone Architects", industry: "Architecture", location: "Edinburgh, UK", signals: ["BIM workflow upgrade", "sustainability certification push", "mid-size firm"] },
    { name: "Olive Branch Hospitality", industry: "Hospitality", location: "Athens, GR", signals: ["booking system replacement", "guest experience scoring", "seasonal staffing tool"] },
    { name: "Quanta Semiconductor", industry: "Electronics", location: "Hsinchu, TW", signals: ["yield optimization AI", "new fab construction", "equipment vendor evaluation"] },
    { name: "Riverbed Aquaculture", industry: "Aquaculture", location: "Bergen, NO", signals: ["water quality monitoring", "expansion to 3 sites", "sustainability certification"] },
    { name: "Cinder Peak Mining", industry: "Mining", location: "Perth, AU", signals: ["autonomous haulage trial", "safety systems upgrade", "ESG reporting mandate"] },
    { name: "Wellspring Therapeutics", industry: "Pharmaceuticals", location: "Basel, CH", signals: ["cold chain logistics gap", "clinical supply platform", "regulatory submission deadline"] },
    { name: "Brickfield Law LLP", industry: "Legal Services", location: "Dublin, IE", signals: ["document automation search", "matter management review", "partner-level expansion"] },
    { name: "Sunward Solar", industry: "Clean Energy", location: "Jaipur, IN", signals: ["residential install scaling", "CRM replacement", "financing partnership"] },
    { name: "Tidepool Marine Research", industry: "Research", location: "Woods Hole, US", signals: ["data platform grant", "sensor network deployment", "small nonprofit budget"] },
    { name: "Granite State Insurance", industry: "Insurance", location: "Manchester, US", signals: ["claims automation initiative", "legacy system sunset", "actuarial platform RFP"] },
    { name: "Ember Robotics", industry: "Robotics", location: "Tokyo, JP", signals: ["warehouse automation demand", "Series C closing", "vision system partnership"] },
    { name: "BlueHeron Retail Group", industry: "Retail", location: "Portland, US", signals: ["omnichannel platform migration", "inventory accuracy issues", "store count doubling"] },
    { name: "Pampas Grain Trading", industry: "Commodities", location: "Buenos Aires, AR", signals: ["trade flow digitization", "risk system replacement", "regulatory reporting gap"] },
    { name: "Fjordline Ferries", industry: "Transportation", location: "Bergen, NO", signals: ["ticketing platform overhaul", "fleet electrification study", "customer loyalty program"] },
    { name: "Cedarwood Senior Living", industry: "Healthcare", location: "Asheville, US", signals: ["resident care platform search", "3 new facilities", "staff scheduling pain"] },
    { name: "Voltaic Grid Solutions", industry: "Energy Infrastructure", location: "Milan, IT", signals: ["smart meter rollout", "grid analytics platform", "EU funding secured"] },
    { name: "Marigold Foods Distribution", industry: "Food & Beverage", location: "Lyon, FR", signals: ["cold storage expansion", "route optimization need", "ERP migration"] },
    { name: "Ironwood Pharmaceuticals", industry: "Pharmaceuticals", location: "Cambridge, US", signals: ["manufacturing execution system", "FDA audit prep", "capacity expansion"] },
    { name: "Silverline Telecommunications", industry: "Telecom", location: "Stockholm, SE", signals: ["5G small cell deployment", "network monitoring overhaul", "fiber expansion plan"] },
    { name: "Driftwood Brewing Co.", industry: "Food & Beverage", location: "Wellington, NZ", signals: ["production scaling", "distribution management", "quality tracking system"] },
    { name: "Highmeadow Wind Farms", industry: "Clean Energy", location: "Glasgow, UK", signals: ["predictive maintenance pilot", "SCADA upgrade", "curtailment optimization"] },
    { name: "Corundum Materials", industry: "Advanced Materials", location: "Lyon, FR", signals: ["R&D lab expansion", "supply chain visibility", "pilot line automation"] },
    { name: "Stillwater Hydro", industry: "Energy", location: "Reykjavik, IS", signals: ["turbine monitoring system", "environmental reporting", "grid connection upgrade"] },
  ];
  