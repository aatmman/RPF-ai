import { useState } from "react";
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

// Mock data
const mockLeadSources = [
  { id: 1, name: "MESB Portal", url: "https://mesb.gov.my/rfp", tags: "Government", active: true },
  { id: 2, name: "ePerolehan", url: "https://eperolehan.gov.my", tags: "Government", active: true },
  { id: 3, name: "MyProcurement", url: "https://myprocurement.com", tags: "Private", active: false },
];

const mockRecentLeads = [
  { id: "RFP-2024-0901", title: "Cable Supply Q1", buyer: "TNB Berhad", deadline: "2025-12-25" },
  { id: "RFP-2024-0902", title: "Wiring Installation", buyer: "Petronas", deadline: "2025-12-30" },
];

const mockSKUs = [
  { sku: "SKU-1124", description: "XLPE Cable 33kV", stock: 1500, warehouse: "WH-A01" },
  { sku: "SKU-1125", description: "PVC Cable 11kV", stock: 2200, warehouse: "WH-A02" },
  { sku: "SKU-1126", description: "Armoured Cable 66kV", stock: 800, warehouse: "WH-B01" },
];

const Settings = () => {
  const [companyName, setCompanyName] = useState("Acme Cables Sdn Bhd");
  const [businessSegment, setBusinessSegment] = useState("wires-cables");
  const [region, setRegion] = useState("Southeast Asia");
  const [contactEmail, setContactEmail] = useState("admin@acmecables.com");
  
  const [leadSources, setLeadSources] = useState(mockLeadSources);
  const [skuList, setSkuList] = useState(mockSKUs);
  
  // Manual lead form
  const [manualLead, setManualLead] = useState({
    rfpId: "",
    title: "",
    buyer: "",
    deadline: "",
    url: "",
  });

  const handleToggleSource = (id: number) => {
    setLeadSources(sources =>
      sources.map(s => s.id === id ? { ...s, active: !s.active } : s)
    );
  };

  const handleAddSource = () => {
    const newId = Math.max(...leadSources.map(s => s.id)) + 1;
    setLeadSources([...leadSources, { id: newId, name: "", url: "", tags: "", active: true }]);
  };

  const handleAddSKU = () => {
    setSkuList([...skuList, { sku: "", description: "", stock: 0, warehouse: "" }]);
  };

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
              <Button variant="magic-primary">Save Profile</Button>
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
                  {leadSources.map((source) => (
                    <tr key={source.id} className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <Input
                          value={source.name}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map(s => s.id === source.id ? { ...s, name: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={source.url}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map(s => s.id === source.id ? { ...s, url: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={source.tags}
                          onChange={(e) => setLeadSources(sources =>
                            sources.map(s => s.id === source.id ? { ...s, tags: e.target.value } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Switch
                          checked={source.active}
                          onCheckedChange={() => handleToggleSource(source.id)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setLeadSources(sources => sources.filter(s => s.id !== source.id))}
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
              <Button variant="magic-primary">Save Sources</Button>
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
              <Button variant="magic-primary">Save Lead</Button>
            </div>
            
            {/* Recently Added Leads */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Recently Added Leads</h3>
              <div className="space-y-2">
                {mockRecentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-foreground">{lead.id}</span>
                      <span className="text-sm text-muted-foreground mx-2">•</span>
                      <span className="text-sm text-muted-foreground">{lead.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lead.deadline}</span>
                  </div>
                ))}
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
                          value={item.stock}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, stock: parseInt(e.target.value) || 0 } : s)
                          )}
                          className="h-9"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <Input
                          value={item.warehouse}
                          onChange={(e) => setSkuList(list =>
                            list.map((s, i) => i === index ? { ...s, warehouse: e.target.value } : s)
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
              <Button variant="magic-primary">Save Stock</Button>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
