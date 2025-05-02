import React, { useState } from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

import.meta.env.VITE_RAZORPAY_KEY_ID

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        'Up to 5,000 books',
        'Basic cataloging',
        'User management',
        'Email support',
        'Basic reporting'
      ]
    },
    {
      name: 'Professional',
      monthlyPrice: 99,
      annualPrice: 79,
      popular: true,
      features: [
        'Up to 50,000 books',
        'Advanced cataloging',
        'User & role management',
        'Priority support',
        'Advanced analytics',
        'AI recommendations',
        'Custom branding'
      ]
    },
    {
      name: 'Enterprise',
      monthlyPrice: 199,
      annualPrice: 159,
      features: [
        'Unlimited books',
        'Full API access',
        'White-label solution',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced AI features',
        'Multi-branch support'
      ]
    }
  ];

  const handlePayment = async (plan) => {
    try {
      const amount = isAnnual ? plan.annualPrice * 100 : plan.monthlyPrice * 100;
      
      const options = {
        key: 'rzp_test_tzYfBPKGbrzTPi',
        amount: amount,
        currency: 'USD',
        name: 'BookNest',
        description: `${plan.name} Plan - ${isAnnual ? 'Annual' : 'Monthly'} Subscription`,
        handler: function (response) {
          alert('Payment successful! Thank you for subscribing.');
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#2a6496'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="pricing-header">
          <h2 className="pricing-title">Simple, Transparent Pricing</h2>
          <p className="pricing-description">
            Choose the perfect plan for your library. All plans include our core features
            with no hidden fees.
          </p>
        </div>

        <div className="pricing-toggle">
          <button
            className={`toggle-button ${!isAnnual ? 'active' : ''}`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`toggle-button ${isAnnual ? 'active' : ''}`}
            onClick={() => setIsAnnual(true)}
          >
            Annual (20% off)
          </button>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                <span>/ month</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <Check size={18} style={{ marginRight: '8px', color: 'var(--success-color)' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="plan-button"
                onClick={() => handlePayment(plan)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;