import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    website: { type: String, default: '' },
    contactName: { type: String, default: '' },
    contactRole: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    collabTypes: { type: [String], default: [] },
    niches: { type: [String], default: [] },
    goals: { type: String, default: '' },
    score: { type: Number, default: 0 },
    status: { type: String, enum: ['new', 'approved', 'declined'], default: 'new' },
    adminNote: { type: String, default: '' },
    referenceId: { type: String, unique: true },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: 'submittedAt', updatedAt: 'updatedAt' },
  }
);

LeadSchema.pre('save', async function () {
  // Auto-calculate score
  let budgetScore = 0;
  const b = this.budget || '';
  if (b.includes('Under ₹10K')) budgetScore = 5;
  else if (b.includes('10K') && b.includes('50K')) budgetScore = 12;
  else if (b.includes('50K') && b.includes('1.5L')) budgetScore = 28;
  else if (b.includes('1.5L')) budgetScore = 35;
  else if (b.includes('Negotiable')) budgetScore = 20;
  else budgetScore = 15;

  let timelineScore = 0;
  const t = this.timeline || '';
  if (t.includes('< 1 week') || t.includes('<1week') || t.includes('1 week')) timelineScore = 8;
  else if (t.includes('2–4 weeks') || t.includes('2-4 weeks') || t.includes('4 weeks')) timelineScore = 15;
  else if (t.includes('1–2 months') || t.includes('1-2 months') || t.includes('months')) timelineScore = 25;
  else if (t.includes('Flexible')) timelineScore = 22;
  else timelineScore = 15;

  let goalsScore = 10;
  const goalsLength = this.goals ? this.goals.length : 0;
  if (goalsLength > 100) goalsScore = 20;
  else if (goalsLength > 50) goalsScore = 15;

  const hasNicheMatch = (this.niches || []).some((n) =>
    ['Education', 'Tech', 'Journalism', 'Productivity'].some(
      (match) => n.toLowerCase().includes(match.toLowerCase())
    )
  );
  const nicheScore = hasNicheMatch ? 20 : 10;

  this.score = Math.min(100, budgetScore + timelineScore + goalsScore + nicheScore);

  // Auto-generate reference ID
  if (!this.referenceId) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.referenceId = `LEAD-${code}`;
  }
});

if (mongoose.models.Lead) {
  delete mongoose.models.Lead;
}

const Lead = mongoose.model('Lead', LeadSchema);

export default Lead;
