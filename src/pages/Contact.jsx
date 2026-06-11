import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

const reassuranceItems = [
  'Free first consultation',
  'Response within 24 hours',
  'No pressure, no spam',
  'Fixed pricing, no surprises',
];

const CONTACT_EMAIL = 'awesomeakokayo@gmail.com';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    projectDetails: '',
    budgetRange: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectBrief: formData.projectDetails,
          budget: formData.budgetRange,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          serviceType: '',
          projectDetails: '',
          budgetRange: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="py-[5rem] md:py-[7.5rem]">
        <div className="max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-[12px] font-[600] tracking-[0.15em] uppercase text-[#2563EB] mb-4 block">
                GET IN TOUCH
              </span>
              <h1 className="font-['Fraunces'] text-[36px] md:text-[48px] font-[700] text-[#1D1D1F] leading-[1.1] mb-4">
                Let's build something that works.
              </h1>
              <p className="font-['Manrope'] text-[17px] text-[#6E6E73] mb-8 leading-relaxed">
                Tell me about your project. I'll respond within 24 hours with my
                initial thoughts — no sales pitch, just clarity.
              </p>

              {/* Reassurance List */}
              <div className="space-y-3 mb-10">
                {reassuranceItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check size={18} style={{ color: "#2563EB" }} />
                    <span className="font-['Manrope'] text-[15px] text-[#6E6E73]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Alternatives */}
              <div>
                <h4 className="font-['Manrope'] text-[12px] font-[600] uppercase tracking-[0.15em] text-[#A1A1A6] mb-3">
                  OR REACH ME DIRECTLY
                </h4>
                <div className="space-y-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-['Manrope'] text-[14px] text-[#2563EB] hover:opacity-70 transition-opacity block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  <a
                    href="www.linkedin.com/in/awesome-stephens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Manrope'] text-[14px] text-[#2563EB] hover:opacity-70 transition-opacity block"
                  >
                    LinkedIn →
                  </a>
                  <a
                    href="https://github.com/awesomeakokayo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Manrope'] text-[14px] text-[#2563EB] hover:opacity-70 transition-opacity block"
                  >
                    GitHub →
                  </a>
                  <a
                    href="https://twitter.com/awesomeakokayo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Manrope'] text-[14px] text-[#2563EB] hover:opacity-70 transition-opacity block"
                  >
                    Twitter/X →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] mb-1.5 block"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3.5 text-[16px] font-[400] text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition font-['Manrope']"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] mb-1.5 block"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3.5 text-[16px] font-[400] text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition font-['Manrope']"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] mb-1.5 block"
                  >
                    What do you need? *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3.5 text-[16px] font-[400] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition bg-white font-['Manrope'] appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: "40px",
                    }}
                  >
                    <option value="">Please select...</option>
                    <option value="business-website">Business Website</option>
                    <option value="web-application">Web Application</option>
                    <option value="redesign">
                      Redesign / Fix Existing Site
                    </option>
                    <option value="not-sure">Not Sure Yet — Let's Talk</option>
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label
                    htmlFor="projectDetails"
                    className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] mb-1.5 block"
                  >
                    Tell me about your project
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows="4"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3.5 text-[16px] font-[400] text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition resize-none font-['Manrope']"
                    placeholder="Tell me about your goals, timeline, and any specific requirements..."
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label
                    htmlFor="budgetRange"
                    className="font-['Manrope'] text-[14px] font-[500] text-[#1D1D1F] mb-1.5 block"
                  >
                    Budget range (optional)
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3.5 text-[16px] font-[400] text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition bg-white font-['Manrope'] appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                      paddingRight: "40px",
                    }}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="1k-3k">$1,000 – $3,000</option>
                    <option value="3k-5k">$3,000 – $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="above-10k">
                      Above $10,000 / Let's discuss
                    </option>
                  </select>
                </div>

                {/* Submit Status */}
                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl text-center font-['Manrope'] bg-[#10B981] text-white">
                    Message sent successfully! I'll be in touch within 24 hours.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl text-center font-['Manrope'] bg-[#EF4444] text-white">
                    Something went wrong. Please email me directly at{" "}
                    {CONTACT_EMAIL}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-[600] py-4 rounded-xl transition-colors duration-200 text-[16px] font-['Manrope']"
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>

                <p className="font-['Manrope'] text-[13px] text-center mt-3 text-[#A1A1A6]">
                  I read every message personally and respond within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
