
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { Shield, FileText, AlertTriangle, HelpCircle } from "lucide-react";

const AdminPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Policies & Guidelines</h1>
          
          <Tabs defaultValue="rental" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="rental">Rental Terms</TabsTrigger>
              <TabsTrigger value="safety">Safety & Trust</TabsTrigger>
              <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rental" className="bg-white rounded-lg shadow p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-brand-blue mr-3" />
                <h2 className="text-2xl font-bold">Rental Terms & Conditions</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Booking Process</h3>
                  <p className="text-gray-700 mb-3">
                    Our booking process is designed to be transparent and secure for both parties:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Browse available items and select your desired rental dates</li>
                    <li>Submit a booking request to the owner</li>
                    <li>The owner will approve or decline your request within 24 hours</li>
                    <li>Once approved, confirm the booking through our secure platform</li>
                    <li>Arrange pickup/delivery with the owner via our messaging system</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Fees & Payments</h3>
                  <p className="text-gray-700 mb-3">
                    Our fee structure is straightforward and transparent:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Rental fees are set by item owners and displayed as a daily rate</li>
                    <li>A service fee of 10% is added to all bookings to maintain our platform</li>
                    <li>Security deposits may be required for high-value items</li>
                    <li>All payments are processed securely through our platform</li>
                    <li>Owners receive payment 24 hours after successful item pickup</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Cancellation Policy</h3>
                  <p className="text-gray-700 mb-3">
                    We understand that plans change. Our cancellation policy is designed to be fair to both parties:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">For Renters:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>Full refund if cancelled 48+ hours before pickup</li>
                          <li>50% refund if cancelled 24-48 hours before pickup</li>
                          <li>No refund if cancelled less than 24 hours before pickup</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">For Owners:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>No penalty if booking is cancelled by renter</li>
                          <li>Minimum 48 hours notice required to cancel a confirmed booking</li>
                          <li>Repeated cancellations may result in account restrictions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Late Returns & Fees</h3>
                  <p className="text-gray-700 mb-3">
                    Prompt returns are essential to maintaining a reliable platform:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Items must be returned by the agreed-upon date and time</li>
                    <li>Late returns incur a fee of 1.5x the daily rate for each day late</li>
                    <li>Owners must report late returns through the platform immediately</li>
                    <li>Renters should communicate any delays immediately via our messaging system</li>
                    <li>Habitual late returners may face account restrictions</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="bg-white rounded-lg shadow p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-brand-blue mr-3" />
                <h2 className="text-2xl font-bold">Safety & Trust Guidelines</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Verification Process</h3>
                  <p className="text-gray-700 mb-3">
                    Our multi-tiered verification system helps ensure a safe community:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Basic Verification (Tier 1)</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Email verification required</li>
                        <li>Phone number validation</li>
                        <li>Rental privileges limited to lower-value items</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="font-medium mb-2">Enhanced Verification (Tier 2)</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Government ID verification</li>
                        <li>Address confirmation</li>
                        <li>Full platform privileges</li>
                        <li>Verified badge displayed on profile</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">User Ratings & Reviews</h3>
                  <p className="text-gray-700 mb-4">
                    Our community is built on trust and transparency:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Both parties rate each other after each rental transaction</li>
                    <li>Reviews must be honest, specific, and respectful</li>
                    <li>Users can report inappropriate reviews for moderation</li>
                    <li>Ratings affect visibility and trust within the platform</li>
                    <li>Multiple negative reviews may result in account review</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Item Condition Guidelines</h3>
                  <p className="text-gray-700 mb-3">
                    Accurate condition reporting is essential for trust:
                  </p>
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
                    <div>
                      <h4 className="font-medium mb-2">For Owners:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Accurately describe item condition</li>
                        <li>Document existing damage with photos</li>
                        <li>Include all accessories in listing</li>
                        <li>Provide usage instructions when needed</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">For Renters:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        <li>Inspect items upon receipt</li>
                        <li>Report any discrepancies immediately</li>
                        <li>Use items as intended and with care</li>
                        <li>Return in same condition as received</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Safety Recommendations</h3>
                  <p className="text-gray-700 mb-3">
                    We recommend these best practices for all users:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Meet in public places for item handoffs when possible</li>
                    <li>Use our in-app messaging for all communications</li>
                    <li>Create a handoff checklist for high-value items</li>
                    <li>Document item condition at pickup and return</li>
                    <li>Never share personal financial information outside our platform</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="disputes" className="bg-white rounded-lg shadow p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-brand-blue mr-3" />
                <h2 className="text-2xl font-bold">Dispute Resolution</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Damage Claims Process</h3>
                  <p className="text-gray-700 mb-3">
                    In the event of item damage, we have a structured resolution process:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Owner must report damage within 48 hours of item return</li>
                    <li>Documentation including photos must be provided</li>
                    <li>Renter will be notified and given 48 hours to respond</li>
                    <li>If both parties agree, damage charges will be processed</li>
                    <li>If disputed, our mediation team will review the case</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Mediation Service</h3>
                  <p className="text-gray-700 mb-3">
                    Our experienced mediation team helps resolve disputes fairly:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Both parties submit evidence and statements</li>
                    <li>Mediators review all documentation within 5 business days</li>
                    <li>Decision is made based on platform policies and evidence</li>
                    <li>Both parties are notified of the outcome</li>
                    <li>Mediation decisions are final in most cases</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Non-Return Protocol</h3>
                  <p className="text-gray-700 mb-3">
                    In the rare case of item non-return, we take the following steps:
                  </p>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-amber-800">Important Process:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-amber-800">
                      <li>Owner reports non-return through the platform</li>
                      <li>Our team attempts to contact the renter (48 hour window)</li>
                      <li>If no response, penalty charges are initiated</li>
                      <li>For high-value items, additional recovery steps may be taken</li>
                      <li>Account suspension for renters who fail to return items</li>
                    </ol>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Refund Requests</h3>
                  <p className="text-gray-700 mb-3">
                    Refund requests are handled through our structured process:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Requests must be submitted within 24 hours of item pickup</li>
                    <li>Valid reasons include item not as described or non-functional</li>
                    <li>Documentation including photos/videos required</li>
                    <li>Owner has 24 hours to respond to refund request</li>
                    <li>If disputed, mediation team will review the case</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="bg-white rounded-lg shadow p-8">
              <div className="flex items-center mb-6">
                <HelpCircle className="h-6 w-6 text-brand-blue mr-3" />
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">General Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">How does TrustShare work?</h4>
                      <p className="text-gray-700">
                        TrustShare is a peer-to-peer rental platform that connects people who have items with those who need them. Owners list their items with daily rates, and renters can browse, book, and pay securely through our platform.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Is my personal information secure?</h4>
                      <p className="text-gray-700">
                        Yes, we take data security seriously. We use industry-standard encryption and never share your personal information with other users without your consent. Your payment information is processed through secure third-party providers.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">How do I get verified on the platform?</h4>
                      <p className="text-gray-700">
                        Verification happens in tiers. Basic verification requires email and phone confirmation. For enhanced verification, you'll need to submit a government ID through our secure verification process in your account settings.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">For Renters</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">What happens if I return an item late?</h4>
                      <p className="text-gray-700">
                        Late returns incur a fee of 1.5x the daily rate for each day the item is late. If you know you'll be late, contact the owner immediately through our messaging system to discuss options.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">What if the item I receive is not as described?</h4>
                      <p className="text-gray-700">
                        If an item doesn't match its description, take photos and report the issue immediately through the platform. You can request a refund within 24 hours of pickup if the item isn't as described or is non-functional.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">Do I need insurance to rent items?</h4>
                      <p className="text-gray-700">
                        Standard rentals don't require separate insurance, but high-value items may require proof of insurance or an additional security deposit. Check the specific listing requirements before booking.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">For Owners</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">How do I price my items?</h4>
                      <p className="text-gray-700">
                        Research similar items on our platform and consider factors like item value, condition, and demand. As a general rule, daily rates typically range from 1-5% of the item's retail value, depending on category.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">When do I get paid for my rentals?</h4>
                      <p className="text-gray-700">
                        Payment is released to your account 24 hours after the renter picks up your item. You can withdraw funds to your linked bank account at any time after that.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">What if my item is damaged or not returned?</h4>
                      <p className="text-gray-700">
                        Report any damage within 48 hours of return with photos. For non-returned items, file a report immediately. Our dispute resolution team will guide you through the process of getting compensated.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technical Support</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-1">How do I contact support?</h4>
                      <p className="text-gray-700">
                        You can reach our support team through the Help section in your account, by email at support@trustshare.com, or by live chat during business hours.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">My account is locked, what do I do?</h4>
                      <p className="text-gray-700">
                        Account locks usually occur for security reasons or policy violations. Contact our support team immediately with your account details for assistance in resolving the issue.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-1">How do I update my payment information?</h4>
                      <p className="text-gray-700">
                        You can update your payment methods in the Payment section of your account settings. We support most major credit cards and select payment services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPolicy;
