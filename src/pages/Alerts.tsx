
import { useState } from "react";
import { Link } from "react-router-dom";
import { useListings } from "@/contexts/ListingContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Heart, Search, X, Clock } from "lucide-react";

const Alerts = () => {
  const { listings } = useListings();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("saved");
  
  // Mock saved items and alerts
  const [savedItems, setSavedItems] = useState([
    ...listings.slice(0, Math.min(3, listings.length)),
  ]);
  
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      query: "Camera equipment",
      category: "Electronics",
      notificationEnabled: true,
      maxPrice: 50,
      created: new Date().toISOString(),
    },
    {
      id: "2",
      query: "Camping gear",
      category: "Sports & Outdoors",
      notificationEnabled: true,
      maxPrice: 100,
      created: new Date().toISOString(),
    },
  ]);
  
  // Remove saved item
  const removeSavedItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };
  
  // Remove alert
  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  // Toggle notification for alert
  const toggleNotification = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, notificationEnabled: !alert.notificationEnabled } 
        : alert
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-8">Your Alerts</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="saved">
              <Heart className="h-4 w-4 mr-2" />
              Saved Items
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell className="h-4 w-4 mr-2" />
              Search Alerts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-6">Items You've Saved</h2>
              
              {savedItems.length > 0 ? (
                <div className="space-y-4">
                  {savedItems.map(item => (
                    <div key={item.id} className="flex items-center border-b pb-4">
                      <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <Link to={`/item/${item.id}`} className="font-medium hover:text-brand-blue">
                          {item.title}
                        </Link>
                        <div className="text-sm text-gray-500">${item.pricePerDay}/day</div>
                        <div className="text-sm text-gray-500">{item.location}</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Link to={`/item/${item.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeSavedItem(item.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Saved Items</h3>
                  <p className="text-gray-500 mb-4">
                    Items you save will appear here for quick access.
                  </p>
                  <Link to="/browse">
                    <Button>Browse Items</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Your Search Alerts</h2>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Create New Alert
                </Button>
              </div>
              
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{alert.query}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Category: {alert.category} • Max Price: ${alert.maxPrice}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Created {new Date(alert.created).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={alert.notificationEnabled}
                              onCheckedChange={() => toggleNotification(alert.id)}
                            />
                            <span className="text-sm text-gray-500">
                              {alert.notificationEnabled ? "Notifications on" : "Notifications off"}
                            </span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAlert(alert.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Search Alerts</h3>
                  <p className="text-gray-500 mb-4">
                    Create alerts for items you're looking for and get notified when they become available.
                  </p>
                  <Button>Create Your First Alert</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Alerts;
