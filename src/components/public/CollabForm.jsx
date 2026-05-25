'use client';

import React, { useState } from 'react';

const COLLAB_TYPES = [
  'Freelance Writing / Reporting',
  'Editorial Consulting',
  'Investigative Journalism',
  'Speaking Engagements / Panels',
  'Media Training / Workshops',
  'Documentary / Audio Production',
  'Fact-Checking / Research',
  'Guest Column / Op-Ed Writing',
];

const NICHES = [
  'Politics & Governance',
  'Social Issues & Human Rights',
  'Science & Environment',
  'Business & Economics',
  'Culture & Arts',
  'Journalism & Media',
  'Education & Tech',
  'Other',
];

const BUDGET_OPTIONS = [
  'Under ₹10K',
  '₹10K–50K',
  '₹50K–1.5L',
  '₹1.5L+',
  'Negotiable',
];

const TIMELINE_OPTIONS = [
  '< 1 week',
  '2–4 weeks',
  '1–2 months',
  'Flexible',
];

export default function CollabForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brand: '',
    website: 'https://',
    contactName: '',
    contactRole: '',
    contactPhone: '',
    collabTypes: [],
    niches: [],
    budget: '',
    timeline: '',
    goals: '',
    website_bot: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const validateStep = (currentStep) => {
    const stepErrors = {};

    if (currentStep === 1) {
      if (!formData.brand.trim()) stepErrors.brand = 'Brand name is required';
      if (!formData.website.trim() || formData.website === 'https://') {
        stepErrors.website = 'Website URL is required';
      } else if (!formData.website.startsWith('https://')) {
        stepErrors.website = 'URL must start with https://';
      }
      if (!formData.contactName.trim()) stepErrors.contactName = 'Your name is required';
      if (!formData.contactRole.trim()) stepErrors.contactRole = 'Your role is required';
      if (!formData.contactPhone.trim()) stepErrors.contactPhone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (formData.collabTypes.length === 0) {
        stepErrors.collabTypes = 'Please select at least one collaboration type';
      }
      if (formData.niches.length === 0) {
        stepErrors.niches = 'Please select at least one niche';
      }
    }

    if (currentStep === 3) {
      if (!formData.budget) stepErrors.budget = 'Please select a budget range';
      if (!formData.timeline) stepErrors.timeline = 'Please select a timeline';
      if (!formData.goals.trim()) {
        stepErrors.goals = 'Campaign goals description is required';
      } else if (formData.goals.trim().length < 20) {
        stepErrors.goals = 'Please describe your goals in at least 20 characters';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const toggleCollabType = (type) => {
    setFormData((prev) => {
      const types = prev.collabTypes.includes(type)
        ? prev.collabTypes.filter((t) => t !== type)
        : [...prev.collabTypes, type];

      if (errors.collabTypes) {
        setErrors((err) => ({ ...err, collabTypes: '' }));
      }
      return { ...prev, collabTypes: types };
    });
  };

  const toggleNiche = (niche) => {
    setFormData((prev) => {
      const niches = prev.niches.includes(niche)
        ? prev.niches.filter((n) => n !== niche)
        : [...prev.niches, niche];

      if (errors.niches) {
        setErrors((err) => ({ ...err, niches: '' }));
      }
      return { ...prev, niches };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      if (result.ok) {
        setReferenceId(result.referenceId || 'RECEIVED');
        setStep(5); // Success step
      }
    } catch (err) {
      setSubmitError(err.message || 'Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cms-card">
      {step < 5 && (
        <>
          <div className="collab-form-header">
            <div className="cms-title-gradient collab-form-title">
              Work With Me
            </div>
          </div>

          <div className="stepper-progress">
            <div
              className="stepper-progress-fill"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            <div className={`stepper-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              1
            </div>
            <div className={`stepper-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              2
            </div>
            <div className={`stepper-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
              3
            </div>
            <div className={`stepper-step ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
              4
            </div>
          </div>
        </>
      )
      }

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="website_bot"
          value={formData.website_bot}
          onChange={handleInputChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {step === 1 && (
          <div>

            <div className="form-group">
              <label className="form-label" htmlFor="brand">Brand Name *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={`form-input ${errors.brand ? 'form-input-error' : ''}`}
                placeholder="e.g. Acme Corp"
              />
              {errors.brand && <p className="error-text">{errors.brand}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="website">Website Url *</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className={`form-input ${errors.website ? 'form-input-error' : ''}`}
                placeholder="https://example.com"
              />
              {errors.website && <p className="error-text">{errors.website}</p>}
            </div>

            <div className="collab-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">Contact Name *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.contactName ? 'form-input-error' : ''}`}
                  placeholder="Your full name"
                />
                {errors.contactName && <p className="error-text">{errors.contactName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contactRole">Your Role *</label>
                <input
                  type="text"
                  id="contactRole"
                  name="contactRole"
                  value={formData.contactRole}
                  onChange={handleInputChange}
                  className={`form-input ${errors.contactRole ? 'form-input-error' : ''}`}
                  placeholder="e.g. Marketing Manager"
                />
                {errors.contactRole && <p className="error-text">{errors.contactRole}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contactPhone">Phone Number *</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className={`form-input ${errors.contactPhone ? 'form-input-error' : ''}`}
                placeholder="e.g. +91 98765 43210"
              />
              {errors.contactPhone && <p className="error-text">{errors.contactPhone}</p>}
            </div>

            <div className="form-buttons collab-form-btn-right">
              <button type="button" onClick={handleNext} className="btn primary-btn">
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>

            <div className="form-group">
              <label className="form-label">Collaboration Types (Select all that apply) *</label>
              <div className="chip-container">
                {COLLAB_TYPES.map((type) => (
                  <div
                    key={type}
                    className={`chip ${formData.collabTypes.includes(type) ? 'selected' : ''}`}
                    onClick={() => toggleCollabType(type)}
                  >
                    {type}
                  </div>
                ))}
              </div>
              {errors.collabTypes && <p className="error-text collab-form-error-msg">{errors.collabTypes}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Brand Niches (Select all that apply) *</label>
              <div className="chip-container">
                {NICHES.map((niche) => (
                  <div
                    key={niche}
                    className={`chip ${formData.niches.includes(niche) ? 'selected' : ''}`}
                    onClick={() => toggleNiche(niche)}
                  >
                    {niche}
                  </div>
                ))}
              </div>
              {errors.niches && <p className="error-text collab-form-error-msg">{errors.niches}</p>}
            </div>

            <div className="form-buttons">
              <button type="button" onClick={handlePrev} className="btn btn-secondary">
                Back
              </button>
              <button type="button" onClick={handleNext} className="btn primary-btn">
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>

            <div className="collab-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="budget">Estimated Budget *</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`form-input ${errors.budget ? 'form-input-error' : ''}`}
                >
                  <option value="">Select budget range...</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budget && <p className="error-text">{errors.budget}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="timeline">Timeline *</label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={`form-input ${errors.timeline ? 'form-input-error' : ''}`}
                >
                  <option value="">Select project timeline...</option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.timeline && <p className="error-text">{errors.timeline}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="goals">Campaign Goals & Pitch (Min 20 characters) *</label>
              <textarea
                id="goals"
                name="goals"
                rows={5}
                value={formData.goals}
                onChange={handleInputChange}
                className={`form-input collab-form-textarea ${errors.goals ? 'form-input-error' : ''}`}
                placeholder="Tell us what you want to build or promote. What are your key goals?"
              />
              {errors.goals && <p className="error-text">{errors.goals}</p>}
            </div>

            <div className="form-buttons">
              <button type="button" onClick={handlePrev} className="btn btn-secondary">
                Back
              </button>
              <button type="button" onClick={handleNext} className="btn primary-btn">
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>

            <div className="collab-form-review-box">
              <div>
                <strong className="collab-form-review-label">Brand & Contact:</strong>
                <p className="collab-form-review-text">
                  {formData.brand} ({formData.website})
                </p>
                <p className="collab-form-review-subtext">
                  Pitch by {formData.contactName} ({formData.contactRole})
                </p>
                {formData.contactPhone && (
                  <p className="collab-form-review-subtext">
                    Phone: {formData.contactPhone}
                  </p>
                )}
              </div>

              <hr className="collab-form-review-hr" />

              <div>
                <strong className="collab-form-review-label">Collaboration & Niches:</strong>
                <p className="collab-form-review-text-normal">
                  <strong>Types:</strong> {formData.collabTypes.join(', ')}
                </p>
                <p className="collab-form-review-text-normal">
                  <strong>Niches:</strong> {formData.niches.join(', ')}
                </p>
              </div>

              <hr className="collab-form-review-hr" />

              <div className="collab-form-review-grid">
                <div>
                  <strong className="collab-form-review-label">Budget:</strong>
                  <p className="collab-form-review-budget">{formData.budget}</p>
                </div>
                <div>
                  <strong className="collab-form-review-label">Timeline:</strong>
                  <p className="collab-form-review-timeline">{formData.timeline}</p>
                </div>
              </div>

              <hr className="collab-form-review-hr" />

              <div>
                <strong className="collab-form-review-label">Campaign Goals:</strong>
                <p className="collab-form-review-goals">
                  {formData.goals}
                </p>
              </div>
            </div>

            {submitError && (
              <div className="collab-form-submit-error">
                {submitError}
              </div>
            )}

            <div className="form-buttons">
              <button type="button" onClick={handlePrev} className="btn btn-secondary" disabled={isSubmitting}>
                Back
              </button>
              <button
                type="submit"
                className="btn primary-btn"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? 'Submitting Pitch...' : 'Submit Pitch!'}
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2 className="collab-form-success-title">
              Pitch Submitted Successfully!
            </h2>
            <p className="collab-form-success-desc">
              Thank you for pitching a collaboration! Your pitch has been recorded. Write down your reference ID to track your application status.
            </p>
            <div className="ref-code-box">{referenceId}</div>
            <div className="collab-form-success-btn-wrap">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    brand: '',
                    website: 'https://',
                    contactName: '',
                    contactRole: '',
                    contactPhone: '',
                    collabTypes: [],
                    niches: [],
                    budget: '',
                    timeline: '',
                    goals: '',
                    website_bot: '',
                  });
                  setStep(1);
                  setReferenceId('');
                }}
                className="btn primary-btn collab-form-success-btn"
              >
                Submit Another Pitch
              </button>
            </div>
          </div>
        )}
      </form>
    </div >
  );
}
