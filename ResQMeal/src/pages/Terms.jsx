import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Terms and Conditions</h1>
            <p className="mt-2 text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-green max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Leftover Hero ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our
              website and services. By accessing or using our platform, you agree to be bound by these Terms.
            </p>

            <h2>2. Definitions</h2>
            <ul>
              <li>
                <strong>Platform:</strong> Our website, mobile applications, and related services that connect food
                providers with recipients.
              </li>
              <li>
                <strong>Food Providers:</strong> Restaurants, cafes, and other establishments that list surplus food on
                our platform.
              </li>
              <li>
                <strong>Recipients:</strong> NGOs, charities, and individuals who receive food through our platform.
              </li>
            </ul>

            <h2>3. User Responsibilities</h2>
            <h3>3.1 Food Providers</h3>
            <p>
              You agree to provide accurate information about the food you list, including ingredients, preparation time,
              and storage conditions. You are responsible for complying with all applicable food safety laws and
              regulations.
            </p>

            <h3>3.2 Recipients</h3>
            <p>
              You agree to use the food only for its intended purpose and to handle it according to food safety
              guidelines. You must not resell food obtained through our platform.
            </p>

            <h2>4. Food Safety and Liability</h2>
            <p>
              While we encourage safe food handling practices, we do not guarantee the quality or safety of food listed on
              our platform. Users assume all risks associated with the consumption of food obtained through our services.
            </p>

            <h2>5. Account Registration</h2>
            <p>
              You must provide accurate and complete information when creating an account. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities that occur under your
              account.
            </p>

            <h2>6. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the platform for any illegal purpose</li>
              <li>Misrepresent food items or their condition</li>
              <li>Harass other users or platform staff</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or interact with our platform</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on our platform, including logos, text, and software, is our property or licensed to us and is
              protected by intellectual property laws. You may not use our content without express written permission.
            </p>

            <h2>8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for
              any other reason at our sole discretion.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. We will notify users of significant changes, and continued use of the
              platform constitutes acceptance of the modified Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              without regard to its conflict of law provisions.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us at legal@leftoverhero.com or at our mailing address:
              123 Food Rescue Ave, San Francisco, CA 94107.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;