import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, Trash2 } from "lucide-react";

interface LeadSource {
  id?: number;
  source_name: string;
  url: string;
  tags: string;
  active: boolean;
}

interface SKU {
  sku: string;
  description: string;
  stock_available: number;
  rack_id: string;
}

interface RecentLead {
  rfp_id: string;
  title: string;
  buyer: string;
  deadline: string;
}

const SettingsPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [businessSegment, setBusinessSegment] = useState("wires-cables");
  const [region, setRegion] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [skuList, setSkuList] = useState<SKU[]>([]);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  
  // Manual lead form
  const [manualLead, setManualLead] = useState({
    rfpId: "",
    title: "",
    buyer: "",
    deadline: "",
    url: "",
    sourceName: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettingsData();
  }, []);

  const fetchSettingsData = async () => {
    try {
      setLoading(true);
      
      // Fetch company profile
      const profileRes = await fetch("/api/settings/company-profile");
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.data) {
          setCompanyName(profileData.data.company_name || "");
          setBusinessSegment(profileData.data.segment || "wires-cables");
          setRegion(profileData.data.region || "");
          setContactEmail(profileData.data.contact_email || "");
        }
      }

      // Fetch lead sources
      const sourcesRes = await fetch("/api/settings/lead-sources");
      if (sourcesRes.ok) {
        const sourcesData = await sourcesRes.json();
        if (sourcesData.data) {
          setLeadSources(sourcesData.data);
        }
      }

      // Fetch SKU stock
      const skuRes = await fetch("/api/settings/sku-stock");
      if (skuRes.ok) {
        const skuData = await skuRes.json();
        if (skuData.data) {
          setSkuList(skuData.data);
        }
      }

      // Fetch recent leads
      const leadsRes = await fetch("/api/leads/manual?limit=5");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.data) {
          setRecentLeads(leadsData.data.map((l: any) => ({
            rfp_id: l.rfp_id || l.id,
            title: l.title || "",
            buyer: l.buyer || "",
            deadline: l.deadline || "",
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching settings data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await fetch("/api/settings/company-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          segment: businessSegment,
          region,
          contact_email: contactEmail,
        }),
      });
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSources = async () => {
    try {
      setSaving(true);
      await fetch("/api/settings/lead-sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sources: leadSources }),
      });
      alert("Lead sources saved successfully!");
    } catch (error) {
      console.error("Error saving sources:", error);
      alert("Error saving lead sources");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLead = async () => {
    try {
      setSaving(true);
      await fetch("/api/leads/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rfp_id: manualLead.rfpId,
          title: manualLead.title,
          buyer: manualLead.buyer,
          deadline: manualLead.deadline,
          url: manualLead.url,
          source_name: manualLead.sourceName,
        }),
      });
      alert("Lead saved successfully!");
      setManualLead({ rfpId: "", title: "", buyer: "", deadline: "", url: "", sourceName: "" });
      await fetchSettingsData(); // Refresh recent leads
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Error saving lead");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStock = async () => {
    try {
      setSaving(true);
      await fetch("/api/settings/sku-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skus: skuList }),
      });
      alert("Stock saved successfully!");
    } catch (error) {
      console.error("Error saving stock:", error);
      alert("Error saving stock");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleSource = (index: number) => {
    setLeadSources(sources =>
      sources.map((s, i) => i === index ? { ...s, active: !s.active } : s)
    );
  };

  const handleAddSource = () => {
    setLeadSources([...leadSources, { source_name: "", url: "", tags: "", active: true }]);
  };

  const handleAddSKU = () => {
    setSkuList([...skuList, { sku: "", description: "", stock_available: 0, rack_id: "" }]);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="text-center py-8 text-muted-foreground">Loading settings...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>
        
        <div className="space-y-8">
          {/* Company Profile */}
          <section className="card-rfp">
            <h2 className="text-xl font-bold text-foreground mb-6">Company Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="businessSegment">Business Segment</Label>
                <Select value={businessSegment} onValueChange={setBusinessSegment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wires-cables">Wires & Cables</SelectItem>
                    <SelectItem value="fmcg">FMCG</SelectItem>
                    <SelectItem value="fmeg">FMEG</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Your operating region"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="admin@company.com"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="magic-primary" onClick={handleSaveProfile} disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </section>

          {/* Lead Sources */}
          <section className="card-rfp">
            <h2 className="text-xl font-bold text-foreground mb-6">Lead Sources</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Configure the RFP listing pages that the Sales Agent will scan for new opportunities.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Source Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">URL</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Tags</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Active</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadSources.map((source, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <Input
                          value={source.source_name}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map((s, i) => i === index ? { ...s, source_name: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={source.url}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map((s, i) => i === index ? { ...s, url: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={source.tags}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map((s, i) => i === index ? { ...s, tags: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Switch
                          checked={source.active}
                          onCheckedChange={() => handleToggleSource(index)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setLeadSources(sources => sources.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button variant="magic-secondary" onClick={handleAddSource}>
                <Plus className="w-4 h-4 mr-2" />
                Add Source
              </Button>
              <Button variant="magic-primary" onClick={handleSaveSources} disabled={saving}>
                {saving ? "Saving..." : "Save Sources"}
              </Button>
            </div>
          </section>

          {/* Manual Lead Upload */}
          <section className="card-rfp">
            <h2 className="text-xl font-bold text-foreground mb-6">Manual Lead Upload</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="rfpId">RFP ID</Label>
                <Input
                  id="rfpId"
                  value={manualLead.rfpId}
                  onChange={(e) => setManualLead({ ...manualLead, rfpId: e.target.value })}
                  placeholder="RFP-2024-XXXX"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadTitle">Title</Label>
                <Input
                  id="leadTitle"
                  value={manualLead.title}
                  onChange={(e) => setManualLead({ ...manualLead, title: e.target.value })}
                  placeholder="RFP title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadBuyer">Buyer / Agency</Label>
                <Input
                  id="leadBuyer"
                  value={manualLead.buyer}
                  onChange={(e) => setManualLead({ ...manualLead, buyer: e.target.value })}
                  placeholder="Buyer name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadDeadline">Submission Deadline</Label>
                <Input
                  id="leadDeadline"
                  type="date"
                  value={manualLead.deadline}
                  onChange={(e) => setManualLead({ ...manualLead, deadline: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leadSource">Source Name</Label>
                <Input
                  id="leadSource"
                  value={manualLead.sourceName}
                  onChange={(e) => setManualLead({ ...manualLead, sourceName: e.target.value })}
                  placeholder="Source name"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="leadUrl">Link / URL</Label>
                <Input
                  id="leadUrl"
                  value={manualLead.url}
                  onChange={(e) => setManualLead({ ...manualLead, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mb-8">
              <Button variant="magic-secondary">
                <Upload className="w-4 h-4 mr-2" />
                Upload JSON
              </Button>
              <Button variant="magic-primary" onClick={handleSaveLead} disabled={saving}>
                {saving ? "Saving..." : "Save Lead"}
              </Button>
            </div>
            
            {/* Recently Added Leads */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Recently Added Leads</h3>
              <div className="space-y-2">
                {recentLeads.length === 0 ? (
                  <div className="text-sm text-muted-foreground py-2">No recent leads</div>
                ) : (
                  recentLeads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-foreground">{lead.rfp_id}</span>
                        <span className="text-sm text-muted-foreground mx-2">•</span>
                        <span className="text-sm text-muted-foreground">{lead.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{lead.deadline}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Stock & SKU Settings */}
          <section className="card-rfp">
            <h2 className="text-xl font-bold text-foreground mb-6">Stock & SKU Settings</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">SKU</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Stock Available</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Rack / Warehouse ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skuList.map((item, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <Input
                          value={item.sku}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, sku: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={item.description}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, description: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          type="number"
                          value={item.stock_available}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, stock_available: parseInt(e.target.value) || 0 } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={item.rack_id}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, rack_id: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSkuList(list => list.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button variant="magic-secondary" onClick={handleAddSKU}>
                <Plus className="w-4 h-4 mr-2" />
                Add SKU
              </Button>
              <Button variant="magic-primary" onClick={handleSaveStock} disabled={saving}>
                {saving ? "Saving..." : "Save Stock"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;





