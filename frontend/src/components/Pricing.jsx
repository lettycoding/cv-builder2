import React from 'react';

const cvPricing = [
  {
    type: 'Standard CV',
    price: 2500,
    features: [
      'Professional template',
      'Download as PDF',
      'Email support'
    ]
  },
  {
    type: 'CV with AI Assistance',
    price: 4000,
    features: [
      'Professional template',
      'AI writing help',
      'Unlimited downloads'
    ]
  },
  {
    type: 'CV + Expert Review',
    price: 7000,
    features: [
      'Professional template',
      'AI writing help',
      'Expert review & feedback'
    ]
  }
];



const Pricing = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)',
    padding: '0',
    fontFamily: 'Segoe UI, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ flex: 1, padding: '40px 0', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        color: 'rgb(78,59,149)',
        marginTop: '30px',
        marginBottom: '32px'
      }}>
        CV Pricing (FCFA)
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap'
      }}>
        {cvPricing.map(cv => (
          <div key={cv.type} style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(79,70,229,0.08)',
            padding: '32px',
            minWidth: '260px',
            maxWidth: '320px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'rgb(78,59,149)', fontSize: '1.5rem', marginBottom: '16px' }}>{cv.type}</h2>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981', marginBottom: '16px' }}>
              {cv.price.toLocaleString()} FCFA 
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', color: '#374151' }}>
              {cv.features.map((feature, idx) => (
                <li key={idx} style={{ marginBottom: '8px' }}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '48px', color: '#6B7280' }}>
        All prices are per CV in FCFA. Secure payment by MTN mobile money , ORANGE mobile money or card.
      </div>
    </div>
    
  </div>
);

export default Pricing;