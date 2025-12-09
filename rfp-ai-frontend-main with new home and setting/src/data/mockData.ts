export interface RFP {
  id: string;
  rfpNumber: string;
  buyer: string;
  createdDate: string;
  winProbability: number;
  stockStatus: "healthy" | "low" | "out";
  quantity: number;
  basePrice: number;
  category?: string;
  status?: "draft" | "in-progress" | "submitted";
}

export interface HistoryItem {
  id: string;
  date: string;
  rfpId: string;
  buyer: string;
  primarySku: string;
  winProbability: number;
  stockStatus: "in-stock" | "out-of-stock";
  feedback: "win" | "loss";
  score: number;
}

export interface RFPDetail {
  id: string;
  buyerName: string;
  rfpId: string;
  quantity: string;
  basePrice: string;
  createdDate: string;
  winProbability: number;
  recommendedSku: string;
  skuName: string;
  recommendedScenario: string;
  recommendedPrice: number;
  margin: string;
  competitivePosition: string;
  stockLevel: { current: number; required: number };
  location: string;
  stockStatus: "in-stock" | "out-of-stock";
  readyToShip: boolean;
  rationale: string;
  whySku: string[];
  whyScenario: string[];
  risks: string[];
}

export const activeRFPs: RFP[] = [
  {
    id: "1",
    rfpNumber: "84321",
    buyer: "Global Mart",
    createdDate: "Oct 24, 2023",
    winProbability: 92,
    stockStatus: "healthy",
    quantity: 120000,
    basePrice: 4.25,
    category: "beverages",
    status: "in-progress",
  },
  {
    id: "2",
    rfpNumber: "84320",
    buyer: "Costco",
    createdDate: "Oct 22, 2023",
    winProbability: 75,
    stockStatus: "low",
    quantity: 80000,
    basePrice: 3.50,
    category: "snacks",
    status: "draft",
  },
  {
    id: "3",
    rfpNumber: "84319",
    buyer: "Fresh Foods",
    createdDate: "Oct 21, 2023",
    winProbability: 32,
    stockStatus: "out",
    quantity: 50000,
    basePrice: 5.00,
    category: "frozen",
    status: "submitted",
  },
];

export const historyItems: HistoryItem[] = [
  {
    id: "1",
    date: "2023-10-26",
    rfpId: "A4B-9Y-L3P",
    buyer: "Global Mart",
    primarySku: "SKU-789012",
    winProbability: 88,
    stockStatus: "in-stock",
    feedback: "win",
    score: 4.8,
  },
  {
    id: "2",
    date: "2023-10-24",
    rfpId: "C7D-1Z-M5N",
    buyer: "Fresh Foods Inc.",
    primarySku: "SKU-345678",
    winProbability: 55,
    stockStatus: "out-of-stock",
    feedback: "loss",
    score: 2.1,
  },
  {
    id: "3",
    date: "2023-10-22",
    rfpId: "E9F-3X-P7Q",
    buyer: "MegaCorp Retail",
    primarySku: "SKU-901234",
    winProbability: 92,
    stockStatus: "in-stock",
    feedback: "win",
    score: 5.0,
  },
  {
    id: "4",
    date: "2023-10-20",
    rfpId: "G2H-5W-R9S",
    buyer: "Corner Grocers",
    primarySku: "SKU-567890",
    winProbability: 75,
    stockStatus: "in-stock",
    feedback: "win",
    score: 4.2,
  },
];

export const rfpDetail: RFPDetail = {
  id: "1",
  buyerName: "Costco Wholesale",
  rfpId: "#C-845-21B",
  quantity: "120,000 units",
  basePrice: "$4.25 / unit",
  createdDate: "Dec 5, 2023",
  winProbability: 89,
  recommendedSku: "1024-B",
  skuName: "Gourmet Coffee Blend",
  recommendedScenario: "Aggressive Growth",
  recommendedPrice: 495000,
  margin: "22.5%",
  competitivePosition: "Strong competitive position",
  stockLevel: { current: 145000, required: 120000 },
  location: "Warehouse #4, Rack B-12",
  stockStatus: "in-stock",
  readyToShip: true,
  rationale:
    'The "Aggressive Growth" scenario is recommended due to a high probability of securing the contract while maintaining a healthy margin. This bid leverages our surplus inventory of the Gourmet Coffee Blend, minimizing new production costs and capitalizing on a product with historically strong performance in this market segment. The pricing is competitive enough to undercut key competitors while signaling premium quality.',
  whySku: [
    "High surplus inventory",
    "Proven market fit with buyer",
    "Excellent production efficiency",
  ],
  whyScenario: [
    "Maximizes win probability",
    "Positions us as a price leader",
    "Protects target margin of >20%",
  ],
  risks: [
    "Potential competitor price match",
    "Lower margin than conservative bids",
    "Assumes stable logistics costs",
  ],
};

export const kpiData = {
  totalRFPs: 1204,
  winRate: 72,
  avgWinProbability: 88,
  feedbackScore: 4.8,
  historyWinRate: 78,
  historyFeedbackScore: 4.6,
};
