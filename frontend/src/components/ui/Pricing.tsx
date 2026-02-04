import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, ArrowRight, Code2 } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'

  const plans = [
    {
      name: "Hobbyist",
      price: "0",
      description: "For individuals and open source maintainers.",
      features: [
        "Unlimited Public Repos",
        "1 Private Repository",
        "Standard Review Persona",
        "Community Support",
      ],
      notIncluded: ["Security Audits", "Team Management", "SLA"],
      cta: "Start Free",
      highlight: false,
    },
    {
      name: "Startup",
      price: billingCycle === "monthly" ? "39" : "29",
      description: "For small teams shipping production code.",
      features: [
        "Unlimited Private Repos",
        "Security & Performance Personas",
        "Blocking CI/CD Integration",
        "Priority Queue",
        "Slack/Discord Webhooks",
      ],
      notIncluded: ["SLA", "VPC Deployment"],
      cta: "Start 14-Day Trial",
      highlight: true, // This is the featured plan
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Compliance, security, and control at scale.",
      features: [
        "Everything in Startup",
        "SAML SSO & Audit Logs",
        "Custom LLM Fine-tuning",
        "Self-Hosted Runners",
        "Dedicated Solutions Engineer",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section className="w-full py-24 bg-zinc-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium text-white mb-3 tracking-tight">
              Simple, transparent pricing.
            </h2>
            <p className="text-zinc-400 text-sm">
              No per-seat fees. Review unlimited lines of code.
            </p>
          </div>

          {/* Segmented Control Toggle */}
          <div className="bg-zinc-950 p-1 rounded-lg border border-white/5 inline-flex">
            {["monthly", "yearly"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  billingCycle === cycle
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {billingCycle === cycle && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-zinc-800 rounded-md shadow-sm border border-white/5"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">{cycle}</span>
                {cycle === "yearly" && (
                  <span className="ml-2 text-[10px] text-emerald-400 font-mono">
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 flex flex-col h-full hover:bg-white/[0.02] transition-colors duration-300 ${plan.highlight ? "bg-white/[0.01]" : ""}`}
            >
              {/* Highlight Top Bar */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-500 via-indigo-500 to-zinc-500" />
              )}

              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base font-medium text-zinc-100 flex items-center gap-2">
                    {plan.name}
                    {plan.highlight && (
                      <span className="px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-400 text-[10px] uppercase font-bold tracking-wider border border-zinc-500/20">
                        Popular
                      </span>
                    )}
                  </h3>
                  <Code2 className="text-zinc-700" size={20} />
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-semibold text-white tracking-tighter">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold text-white tracking-tighter">
                        ${plan.price}
                      </span>
                      <span className="text-zinc-500 text-sm">/mo</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-zinc-500 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all mb-8 ${
                  plan.highlight
                    ? "bg-zinc-600 hover:bg-zinc-500 text-white shadow-lg shadow-zinc-900/20"
                    : "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800"
                }`}
              >
                {plan.cta}
                {plan.highlight && <ArrowRight size={14} />}
              </button>

              {/* Feature List */}
              <div className="space-y-4 flex-1">
                <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
                  Includes
                </span>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <Check className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {/* Grayed out items */}
                  {plan.notIncluded.map((item, nIdx) => (
                    <li
                      key={nIdx}
                      className="flex items-start gap-3 text-sm text-zinc-600"
                    >
                      <Minus className="w-4 h-4 text-zinc-700 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust/Info */}
        <div className="mt-8 flex items-center justify-between text-xs text-zinc-500 px-2">
          <p>Prices in USD. Taxes may apply.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-300 cursor-pointer">
              Refund Policy
            </span>
            <span className="hover:text-zinc-300 cursor-pointer">
              SLA Agreement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
