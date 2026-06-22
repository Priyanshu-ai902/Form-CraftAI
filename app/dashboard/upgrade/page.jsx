"use client"
import React, { useState } from 'react'
import { Check, HelpCircle, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const plans = [
  {
    name: 'Free',
    price: '$0',
    frequency: 'forever',
    description: 'Essential features for hobbyists and personal forms.',
    features: [
      'Up to 5 forms',
      '50 responses per form',
      'Standard template builder',
      'Basic themes',
      'Email response notifications',
    ],
    buttonText: 'Current Plan',
    popular: false,
    color: 'slate',
  },
  {
    name: 'Pro',
    price: '$19',
    frequency: 'per month',
    description: 'Unlimited capacity and advanced analytics for scaling brands.',
    features: [
      'Unlimited forms',
      'Unlimited responses',
      'File uploads (up to 10GB)',
      'Custom branding & logos',
      'High-fidelity analytics dashboard',
      'CSV / Excel export utilities',
      'Priority email support',
    ],
    buttonText: 'Upgrade to Pro',
    popular: true,
    color: 'emerald',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: 'contract basis',
    description: 'Corporate features, SLAs, and security controls for large teams.',
    features: [
      'Everything in Pro plan',
      'SSO & SAML authentication',
      'Dedicated account manager',
      'Custom domain form hosting',
      'Unlimited upload space',
      '99.9% uptime SLA guarantee',
      'Custom webhook integrations',
    ],
    buttonText: 'Contact Sales',
    popular: false,
    color: 'indigo',
  }
]

const comparison = [
  { feature: 'Number of forms', free: '5 forms', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Monthly Responses', free: '50/form', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'File Upload Support', free: '✗', pro: '✓ (Up to 10GB)', enterprise: '✓ (Unlimited)' },
  { feature: 'Branding Customization', free: 'Form-Craft Logo', pro: 'Remove branding', enterprise: 'White-labeled' },
  { feature: 'Analytics Export', free: '✗', pro: '✓ CSV / Excel', enterprise: '✓ CSV / Excel / Custom API' },
  { feature: 'Integrations & Webhooks', free: '✗', pro: 'Standard', enterprise: 'Custom & API Access' },
  { feature: 'Support Speed', free: 'Email (48h)', pro: 'Priority (24h)', enterprise: 'Dedicated (under 1h)' }
]

export default function Upgrade() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const handleUpgrade = (planName) => {
    if (planName === 'Free') return;
    toast.success(`Redirecting to checkout for ${planName} plan...`);
  }

  return (
    <div className="min-h-screen bg-[#0B1020] text-slate-100 p-6 lg:p-10 transition-all duration-300">
      {/* Hero section */}
      <div className="mx-auto max-w-4xl text-center mt-6 mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-450 border border-emerald-500/20 mb-4">
          <Sparkles className="h-3 w-3" /> Subscription Plans
        </span>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          Scale Your Forms Without Limits
        </h1>
        <p className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Create unlimited high-converting forms, collect submissions anywhere, and analyze results instantly with premium integrations.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`group relative bg-[#111827] border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
              plan.popular 
                ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-xl shadow-emerald-500/5' 
                : 'border-slate-800/80 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 right-6 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black shadow-sm">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-slate-400 min-h-[35px] leading-relaxed mb-6">{plan.description}</p>
              
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-xs text-slate-500 font-semibold">{plan.frequency}</span>
                )}
              </div>

              <hr className="border-slate-800/80 mb-6" />

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-300">
                    <Check className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${
                      plan.popular ? 'text-emerald-400' : 'text-slate-400'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.name === 'Free'}
              className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-350 active:scale-[0.98] ${
                plan.name === 'Free'
                  ? 'bg-slate-800/50 text-slate-550 border border-slate-800 cursor-default hover:bg-slate-800/50'
                  : plan.popular
                    ? 'bg-emerald-600 hover:bg-emerald-550 text-white shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20'
                    : 'bg-transparent border border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mx-auto max-w-4xl border border-slate-800/80 bg-[#111827]/40 rounded-2xl overflow-hidden mb-16 shadow-lg">
        <div className="p-6 border-b border-slate-800/80">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Detailed Comparison Table <HelpCircle className="h-4 w-4 text-slate-500" />
          </h3>
          <p className="text-xs text-slate-500 mt-1">Cross-check specs to choose the plan that best fits your workflow.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#0F172A]/80 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4 lg:p-5">Feature</th>
                <th className="p-4 lg:p-5 text-center">Free</th>
                <th className="p-4 lg:p-5 text-center text-emerald-400">Pro</th>
                <th className="p-4 lg:p-5 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 lg:p-5 font-medium text-slate-200">{row.feature}</td>
                  <td className="p-4 lg:p-5 text-center text-slate-400">{row.free}</td>
                  <td className="p-4 lg:p-5 text-center text-slate-200 font-semibold">{row.pro}</td>
                  <td className="p-4 lg:p-5 text-center text-slate-350">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

