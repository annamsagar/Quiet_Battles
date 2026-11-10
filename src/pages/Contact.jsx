import React, { useState } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { CheckCircle2, Send, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Contact = () => {
  useDocumentTitle('Contact Atelier');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate frontend asynchronous dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <PageTransition className="pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionHeading
          number="COMMUNICATION / ATELIER"
          tag="GET IN TOUCH"
          title="CONTACT & INQUIRIES"
          subtitle="Direct dialogue with our studio regarding bespoke inquiries, collaborations, or order queries."
          className="border-b border-[#222222] pb-12 mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Atelier Coordinates & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest-xl text-[#A88B65] font-mono block">
                ATELIER CORRESPONDENCE
              </span>
              <h3 className="font-serif text-3xl font-light text-[#F5F1EA]">
                CONNECT WITH OUR TEAM
              </h3>
              <p className="text-sm text-[#A7A29B] leading-relaxed font-light">
                Whether inquiring about archival piece sizing or discussing editorial alignment, we respond to all thoughtful inquiries within 24–48 hours.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#222222]">
              <div className="flex items-start gap-4 text-xs font-mono">
                <Mail size={16} className="text-[#A88B65] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F1EA] block font-semibold mb-0.5">DIRECT ATELIER EMAIL</span>
                  <a href="mailto:concierge@quietbattles.demo" className="text-[#A7A29B] hover:text-[#A88B65] transition-colors">
                    concierge@quietbattles.demo
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs font-mono">
                <MapPin size={16} className="text-[#A88B65] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F1EA] block font-semibold mb-0.5">HEADQUARTERS</span>
                  <p className="text-[#A7A29B]">
                    Pholus Globos Facility Service Pvt. Ltd.<br />
                    Studio Archive, New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-xs font-mono">
                <Clock size={16} className="text-[#A88B65] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#F5F1EA] block font-semibold mb-0.5">STUDIO HOURS</span>
                  <p className="text-[#A7A29B]">Mon – Sat / 10:00 – 19:00 IST</p>
                </div>
              </div>
            </div>

            {/* Assessment Disclaimer Box */}
            <div className="p-4 bg-[#151515] border border-[#2B2B2B] space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#A88B65]">
                <AlertCircle size={14} />
                <span className="font-bold uppercase tracking-wider">ASSESSMENT DEMONSTRATION</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                This contact form implements client-side validation and state updates. Because this is a frontend-only project, no real SMTP or backend dispatch is initiated.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#151515] border border-[#2B2B2B] p-8 sm:p-12">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-[#0A0A0A] border border-[#A88B65] rounded-full mx-auto flex items-center justify-center text-[#A88B65]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-3xl font-light text-[#F5F1EA]">
                  INQUIRY RECORDED
                </h3>
                <p className="text-sm text-[#A7A29B] font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your correspondence regarding "<strong>{formData.subject}</strong>" has been validated on the client side.
                </p>
                <div className="p-4 bg-[#0A0A0A] border border-[#333333] text-xs font-mono text-[#A88B65] max-w-sm mx-auto">
                  Demo confirmation: Message stored in temporary browser state.
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#F5F1EA] text-[#0A0A0A] text-xs uppercase tracking-widest font-mono font-semibold hover:bg-[#A88B65] hover:text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest font-mono text-[#F5F1EA]">
                      YOUR NAME <span className="text-[#A88B65]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-[#0A0A0A] border px-4 py-3 text-sm text-[#F5F1EA] font-mono placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 font-mono mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-mono text-[#F5F1EA]">
                      EMAIL ADDRESS <span className="text-[#A88B65]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full bg-[#0A0A0A] border px-4 py-3 text-sm text-[#F5F1EA] font-mono placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 font-mono mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs uppercase tracking-widest font-mono text-[#F5F1EA]">
                    SUBJECT <span className="text-[#A88B65]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Sizing Advice / Press Inquiry"
                    className={`w-full bg-[#0A0A0A] border px-4 py-3 text-sm text-[#F5F1EA] font-mono placeholder:text-neutral-600 focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 font-mono mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest font-mono text-[#F5F1EA]">
                    MESSAGE <span className="text-[#A88B65]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your thoughts with our studio..."
                    className={`w-full bg-[#0A0A0A] border px-4 py-3 text-sm text-[#F5F1EA] font-mono placeholder:text-neutral-600 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500' : 'border-[#333333] focus:border-[#A88B65]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 font-mono mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#F5F1EA] text-[#0A0A0A] hover:bg-[#A88B65] hover:text-white text-xs uppercase tracking-widest-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>DISPATCHING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT INQUIRY</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
export default Contact;
