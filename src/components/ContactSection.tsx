import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  
  const handleRedirect = () => {
    window.open('https://cloudstore.app.n8n.cloud/form-test/86f8d0f8-bb8d-4a2e-bab0-6430b73f1432', '_blank');
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400">Have questions about cybersecurity? Our experts are here to help</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-cyan-600 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400">cybercell.ned@delhipolice.gov.in</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-cyan-600 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-gray-400">011-27344606</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-cyan-600 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-gray-400">Cyber Cell, AU-Block, Pitampura, New Delhi – 110088</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-800 rounded-lg p-6">
              <h4 className="text-white font-semibold mb-4">Emergency Support</h4>
              <p className="text-gray-400 mb-4">
                For urgent security incidents, our 24/7 response team is available to provide immediate assistance.
              </p>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200">
               National Emergency Contact <strong>112</strong>
              </button>
              {/* <p >dial the national emergency number 112</P> */}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Have a Complaint?</h3>
              <p className="text-gray-400 mb-6">If you are a victim of a cybercrime, please register your complaint with us. Our team will get back to you shortly.</p>
              <button
                type="button"
                onClick={handleRedirect}
                className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors duration-200"
              >
                Register Complaint
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;