import { useMemo, useState } from "react";
import {
  Send,
  Mail,
  Play,
  Pause,
  Plus,
  Search,
  TrendingUp,
  BarChart3,
  UserCheck,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import type { Campaign, OutboundContact } from "../../types/outbound";

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-01",
    name: "Sponsorship Outreach - Q3 Enterprise",
    target_audience: "VP of Engineering / AI Leads",
    status: "ACTIVE",
    sent_count: 142,
    open_rate: 68.4,
    reply_rate: 22.1,
    last_activity: new Date().toISOString(),
  },
  {
    id: "camp-02",
    name: "Consulting Advisory - AI Strategy",
    target_audience: "Mid-Market Founders & CTOs",
    status: "PAUSED",
    sent_count: 89,
    open_rate: 54.2,
    reply_rate: 11.5,
    last_activity: new Date(Date.now() - 86400000).toISOString(),
  },
];

const MOCK_CONTACTS: OutboundContact[] = [
  {
    id: "cont-101",
    campaign_id: "camp-01",
    name: "David Miller",
    company: "Apex Digital Solutions",
    email: "d.miller@apexdigital.com",
    stage: "REPLIED",
    last_touch: "2 hours ago",
    notes: "Requested call to discuss enterprise sponsorship pricing.",
  },
  {
    id: "cont-102",
    campaign_id: "camp-01",
    name: "Elena Rostova",
    company: "Vanguard Systems",
    email: "elena@vanguard.io",
    stage: "OPENED",
    last_touch: "5 hours ago",
    notes: "Opened email 3 times.",
  },
];

export function OutboundView() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [contacts] = useState<OutboundContact[]>(MOCK_CONTACTS);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(MOCK_CAMPAIGNS[0]);
  const [query, setQuery] = useState("");

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((campaign) => {
        if (campaign.id === id) {
          const nextStatus = campaign.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
          return { ...campaign, status: nextStatus };
        }
        return campaign;
      }),
    );
  };

  const filteredContacts = useMemo(() => {
    const current = contacts.filter((contact) => contact.campaign_id === selectedCampaign.id);
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return current;
    }
    return current.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(normalized) ||
        contact.company.toLowerCase().includes(normalized) ||
        contact.email.toLowerCase().includes(normalized) ||
        contact.stage.toLowerCase().includes(normalized)
      );
    });
  }, [contacts, selectedCampaign.id, query]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>ACTIVE CAMPAIGNS</span>
            <Send className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">{campaigns.filter((campaign) => campaign.status === "ACTIVE").length}</div>
          <div className="text-xs text-neutral-500 mt-1">Sequence engine active</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>TOTAL EMAILS SENT</span>
            <Mail className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">{campaigns.reduce((accumulator, current) => accumulator + current.sent_count, 0)}</div>
          <div className="text-xs text-emerald-400 mt-1">+14% vs last week</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>AVG OPEN RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">61.3%</div>
          <div className="text-xs text-neutral-500 mt-1">Benchmark: 45%</div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>RESPONSE CONVERSIONS</span>
            <UserCheck className="w-4 h-4 text-fuchsia-500" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">16.8%</div>
          <div className="text-xs text-emerald-400 mt-1">High conversion batch</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>SponcerFlow Sequences</span>
            </h3>
            <button className="flex items-center space-x-1 text-xs bg-amber-500 text-black px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-400 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              <span>New Sequence</span>
            </button>
          </div>

          <div className="divide-y divide-neutral-800 overflow-y-auto max-h-[600px]">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => setSelectedCampaign(campaign)}
                className={`p-4 cursor-pointer transition-colors space-y-3 ${
                  selectedCampaign.id === campaign.id ? "bg-amber-500/10 border-l-4 border-amber-500" : "hover:bg-neutral-800/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm text-white">{campaign.name}</div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleCampaignStatus(campaign.id);
                    }}
                    className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 ${
                      campaign.status === "ACTIVE"
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700"
                    }`}
                  >
                    {campaign.status === "ACTIVE" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span>{campaign.status}</span>
                  </button>
                </div>

                <div className="text-xs text-neutral-400">{campaign.target_audience}</div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/60 text-center font-mono text-xs">
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">SENT</div>
                    <div className="text-white font-bold">{campaign.sent_count}</div>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">OPEN %</div>
                    <div className="text-emerald-400 font-bold">{campaign.open_rate}%</div>
                  </div>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800">
                    <div className="text-neutral-500 text-[10px]">REPLY %</div>
                    <div className="text-amber-400 font-bold">{campaign.reply_rate}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col space-y-4">
          <div className="border-b border-neutral-800 pb-4 flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-white">{selectedCampaign.name}</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Active Contact Triage & Open Activity</p>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
              ID: {selectedCampaign.id}
            </span>
          </div>

          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search contacts, company, email, or stage"
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 outline-none focus:border-amber-500"
            />
          </label>

          <div className="space-y-3 overflow-y-auto max-h-[500px]">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm text-white">{contact.name}</div>
                    <div className="text-xs text-neutral-400">
                      {contact.company} - <span className="font-mono">{contact.email}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      contact.stage === "REPLIED"
                        ? "bg-amber-950 text-amber-400 border-amber-800"
                        : "bg-neutral-900 text-neutral-400 border-neutral-800"
                    }`}
                  >
                    {contact.stage}
                  </span>
                </div>

                {contact.notes && (
                  <p className="text-xs text-neutral-300 bg-neutral-900 p-2 rounded border border-neutral-800/80">{contact.notes}</p>
                )}

                <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-1">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Last Activity: {contact.last_touch}</span>
                  </span>
                  <button className="text-amber-500 hover:underline flex items-center space-x-0.5">
                    <span>Open Thread</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
