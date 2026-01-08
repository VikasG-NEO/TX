import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building, BookOpen, Phone, Mail, Calendar, Users, Plus, Minus, CreditCard, CheckCircle, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NeonButton from './NeonButton';
import { toast } from 'sonner';
import { registerForEvent } from '@/lib/api';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
  eventFee?: number;
  eventDescription?: string;
  whatsappLink?: string;
}

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  courseYear: string;
}

const EventRegistrationModal = ({ isOpen, onClose, eventName, eventId, eventFee = 0, eventDescription = '', whatsappLink }: EventRegistrationModalProps) => {
  // Enhanced check: logic looks at both title and description for keywords implying team event
  // Enhanced check: logic looks at both title and description for keywords implying team event
  // Extract team size text from description if available
  const teamSizeMatch = eventDescription.match(/Team Size: ([^.|]+)/i);
  const teamSizeText = teamSizeMatch ? teamSizeMatch[1].trim() : 'refer to event details';

  // Logic:
  // 1. Check for explicit "Solo" in description to force Individual.
  // 2. Otherwise, check for keywords or "Team Size" in description.

  const rawSize = teamSizeText.split(' ')[0].toLowerCase().replace(/[^a-z0-1]/g, '');
  const isExplicitlySolo = rawSize === 'solo' || rawSize === '1';

  const isTeamEvent = !isExplicitlySolo && (
    ['hackathon', 'exhibition', 'escape', 'e-sports', 'esports', 'techstar', 'squad', 'group', 'team', 'tournament', 'hunt'].some(k => eventName.toLowerCase().includes(k)) ||
    eventDescription.toLowerCase().includes('team size')
  );

  console.log('EventModal Debug:', { eventName, isTeamEvent, teamSizeText, isExplicitlySolo });

  // Individual form data
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    department: '',
    courseYear: '',
    phone: '',
    email: '',
  });

  // Team form data
  const [teamData, setTeamData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    department: '',
    courseYear: '',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Auto-fill Individual Form
        setFormData(prev => ({
          ...prev,
          name: parsedUser.username || '',
          email: parsedUser.email || '',
          college: parsedUser.college || '',
        }));

        // Auto-fill Team Leader Form
        setTeamData(prev => ({
          ...prev,
          leaderName: parsedUser.username || '',
          leaderEmail: parsedUser.email || '',
          college: parsedUser.college || '',
        }));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  // Reset team members when modal opens
  useEffect(() => {
    if (isOpen) {
      setTeamMembers([]);
      setIsSuccess(false);
    }
  }, [isOpen, eventName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMember = () => {
    // Parse max team size from the text (e.g. "2-4" -> 4, "4" -> 4)
    // Default to 4 if not found or complex string
    const numbers = teamSizeText.match(/\d+/g);
    const maxSize = numbers ? parseInt(numbers[numbers.length - 1]) : 4;
    // Current total = Leader (1) + teamMembers.length

    if (teamMembers.length + 1 < maxSize) {
      setTeamMembers(prev => [...prev, { name: '', email: '', phone: '', college: '', department: '', courseYear: '' }]);
    } else {
      toast.error(`Maximum team size is ${maxSize}`);
    }
  };

  const removeMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isTeamEvent) {
      // Team validation
      if (!teamData.teamName || !teamData.leaderName || !teamData.leaderEmail || !teamData.leaderPhone || !teamData.college || !teamData.department || !teamData.courseYear) {
        toast.error('Please fill in all team leader details');
        return;
      }
      if (!validateEmail(teamData.leaderEmail)) {
        toast.error('Please enter a valid email for team leader');
        return;
      }
      if (!validatePhone(teamData.leaderPhone)) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }
      for (let i = 0; i < teamMembers.length; i++) {
        if (!teamMembers[i].name || !teamMembers[i].email || !teamMembers[i].phone || !teamMembers[i].college || !teamMembers[i].department || !teamMembers[i].courseYear) {
          toast.error(`Please fill in all details for Member ${i + 2}`); // i+2 because i=0 is Member 2 in UI, Leader is Member 1
          return;
        }
        if (!validateEmail(teamMembers[i].email)) {
          toast.error(`Please enter a valid email for Member ${i + 2}`);
          return;
        }
      }
    } else {
      // Individual validation
      if (!formData.name || !formData.college || !formData.department || !formData.courseYear || !formData.phone || !formData.email) {
        toast.error('Please fill in all fields');
        return;
      }
      if (!validateEmail(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (!validatePhone(formData.phone)) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }
    }

    if (eventFee > 0 && !transactionId) {
      toast.error('Please pay the fee and enter Transaction ID');
      return;
    }

    setIsSubmitting(true);

    try {
      const commonPayload = {
        eventId,
        eventName,
        userId: user?._id || user?.id,
        transactionId: eventFee > 0 ? transactionId : `FREE-${Date.now()}`
      };

      if (isTeamEvent) {
        await registerForEvent({
          ...commonPayload,
          type: 'TEAM',
          teamName: teamData.teamName,
          leaderName: teamData.leaderName,
          email: teamData.leaderEmail,
          phone: teamData.leaderPhone,
          college: teamData.college,
          department: teamData.department,
          courseYear: teamData.courseYear,
          members: teamMembers.filter(m => m.name && m.email)
        });
      } else {
        await registerForEvent({
          ...commonPayload,
          type: 'INDIVIDUAL',
          leaderName: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          department: formData.department,
          courseYear: formData.courseYear
        });
      }

      toast.success(`Successfully registered for ${eventName}!`);
      // Reset forms
      setFormData({ name: user?.username || '', college: user?.college || '', department: '', courseYear: '', phone: '', email: user?.email || '' });
      setTeamData({ teamName: '', leaderName: user?.username || '', leaderEmail: user?.email || '', leaderPhone: '', college: user?.college || '', department: '', courseYear: '' });
      setTeamMembers([{ name: '', email: '', phone: '', college: '', department: '', courseYear: '' }, { name: '', email: '', phone: '', college: '', department: '', courseYear: '' }]);
      setTransactionId('');

      // Show success screen
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-md my-8 bg-card border border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                // Success View
                <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500" />
                  </motion.div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-stranger text-primary">REGISTRATION SUCCESSFUL</h2>
                    <p className="text-muted-foreground">You have successfully registered for <span className="text-primary font-bold">{eventName}</span>.</p>
                  </div>

                  {whatsappLink && (
                    <div className="w-full space-y-3 pt-4 border-t border-border">
                      <p className="text-sm font-medium animate-pulse">Join the official WhatsApp group for updates:</p>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Join WhatsApp Group
                      </a>
                    </div>
                  )}

                  <div className="pt-4 w-full">
                    <NeonButton onClick={handleClose} className="w-full">
                      Close
                    </NeonButton>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="relative p-6 border-b border-border">
                    <div className="pr-8">
                      <h2 className="text-2xl font-display text-primary neon-text-subtle">
                        {isTeamEvent ? 'TEAM REGISTRATION' : 'REGISTER'}
                      </h2>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground font-stranger tracking-wider">
                          {eventName}
                        </p>
                        <p className="text-[10px] text-gray-500">Mode: {isTeamEvent ? 'Team' : 'Solo'} | Size: {teamSizeText}</p>
                        {eventFee !== undefined && eventFee > 0 && (
                          <span className="text-primary font-bold">₹{eventFee}</span>
                        )}
                      </div>
                      {isTeamEvent && (
                        <p className="text-xs text-primary/70 mt-2">Team size: {teamSizeText}</p>
                      )}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="relative p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    {isTeamEvent ? (
                      <>
                        {/* Team Name */}
                        <div className="space-y-2">
                          <Label htmlFor="teamName" className="text-sm text-muted-foreground flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            Team Name
                          </Label>
                          <Input
                            id="teamName"
                            name="teamName"
                            value={teamData.teamName}
                            onChange={handleTeamChange}
                            placeholder="Enter your team name"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        {/* Team Leader Section */}
                        <div className="border border-primary/20 rounded-lg p-4 space-y-3">
                          <h3 className="text-sm font-stranger text-primary tracking-wider">TEAM LEADER</h3>

                          <div className="space-y-2">
                            <Label htmlFor="leaderName" className="text-sm text-muted-foreground flex items-center gap-2">
                              <User className="w-4 h-4 text-primary" />
                              Name
                            </Label>
                            <Input
                              id="leaderName"
                              name="leaderName"
                              value={teamData.leaderName}
                              onChange={handleTeamChange}
                              placeholder="Team leader name"
                              className="bg-background/50 border-border focus:border-primary"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="leaderEmail" className="text-sm text-muted-foreground flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email
                              </Label>
                              <Input
                                id="leaderEmail"
                                name="leaderEmail"
                                type="email"
                                value={teamData.leaderEmail}
                                onChange={handleTeamChange}
                                placeholder="Email"
                                className="bg-background/50 border-border focus:border-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="leaderPhone" className="text-sm text-muted-foreground flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                Phone
                              </Label>
                              <Input
                                id="leaderPhone"
                                name="leaderPhone"
                                value={teamData.leaderPhone}
                                onChange={handleTeamChange}
                                placeholder="10-digit"
                                className="bg-background/50 border-border focus:border-primary"
                              />
                            </div>
                          </div>
                        </div>

                        {/* College & Course & Department */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="college" className="text-sm text-muted-foreground flex items-center gap-2">
                              <Building className="w-4 h-4 text-primary" />
                              College
                            </Label>
                            <Input
                              id="college"
                              name="college"
                              value={teamData.college}
                              onChange={handleTeamChange}
                              placeholder="College name"
                              className="bg-background/50 border-border focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department" className="text-sm text-muted-foreground flex items-center gap-2">
                              <Building className="w-4 h-4 text-primary" />
                              Department
                            </Label>
                            <Input
                              id="department"
                              name="department"
                              value={teamData.department}
                              onChange={handleTeamChange}
                              placeholder="Dept"
                              className="bg-background/50 border-border focus:border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="courseYear" className="text-sm text-muted-foreground flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-primary" />
                              Course/Year
                            </Label>
                            <Input
                              id="courseYear"
                              name="courseYear"
                              value={teamData.courseYear}
                              onChange={handleTeamChange}
                              placeholder="e.g., CSE 3rd"
                              className="bg-background/50 border-border focus:border-primary"
                            />
                          </div>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-stranger text-primary tracking-wider">TEAM MEMBERS</h3>
                            {teamMembers.length < 3 && (
                              <button
                                type="button"
                                onClick={addMember}
                                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                                Add Member
                              </button>
                            )}
                          </div>

                          {teamMembers.map((member, index) => (
                            <div key={index} className="border border-border/50 rounded-lg p-3 space-y-2">
                              <div className="flex items-center justify-between border-b border-border/30 pb-2 mb-2">
                                <span className="text-sm font-stranger text-primary tracking-wider">MEMBER {(index + 2).toString().padStart(2, '0')}</span> {/* index+2 because index 0 is Member 2 in UI, Leader is Member 1 */}
                                {teamMembers.length > 0 && ( /* Always allow removing added members if needed, logic adjustment below */
                                  <button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* Full Name */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">Full Name</Label>
                                  <Input
                                    value={member.name}
                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                    placeholder="Full Name"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>

                                {/* College Name */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">College Name</Label>
                                  <Input
                                    value={member.college}
                                    onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                                    placeholder="College Name"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>

                                {/* Department */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">Department</Label>
                                  <Input
                                    value={member.department}
                                    onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                                    placeholder="Department"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>

                                {/* Year / Semester */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">Year / Semester</Label>
                                  <Input
                                    value={member.courseYear}
                                    onChange={(e) => handleMemberChange(index, 'courseYear', e.target.value)}
                                    placeholder="Year / Semester"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>

                                {/* Contact Number */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">Contact Number</Label>
                                  <Input
                                    value={member.phone}
                                    onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                                    placeholder="Contact Number"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>

                                {/* Email ID */}
                                <div className="space-y-1">
                                  <Label className="text-xs text-muted-foreground">Email ID</Label>
                                  <Input
                                    type="email"
                                    value={member.email}
                                    onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                                    placeholder="Email ID"
                                    className="bg-background/50 border-border focus:border-primary text-sm h-9"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Individual Registration Form */}
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm text-muted-foreground flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="college" className="text-sm text-muted-foreground flex items-center gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            College
                          </Label>
                          <Input
                            id="college"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            placeholder="Enter your college name"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-sm text-muted-foreground flex items-center gap-2">
                            <Building className="w-4 h-4 text-primary" />
                            Department
                          </Label>
                          <Input
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="courseYear" className="text-sm text-muted-foreground flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            Course/Year
                          </Label>
                          <Input
                            id="courseYear"
                            name="courseYear"
                            value={formData.courseYear}
                            onChange={handleChange}
                            placeholder="e.g., B.Tech CSE - 3rd Year"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm text-muted-foreground flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                        </div>
                      </>
                    )}

                    {/* Event Name (readonly) */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Event
                      </Label>
                      <Input
                        value={eventName}
                        disabled
                        className="bg-primary/10 border-primary/30 text-primary"
                      />
                    </div>

                    {/* Payment Section - QR Code and Transaction ID */}
                    {eventFee > 0 && (
                      <div className="space-y-4 pt-4 border-t border-primary/20">
                        <h3 className="text-lg font-stranger text-primary tracking-wider">PAYMENT DETAILS</h3>

                        <div className="flex flex-col items-center gap-4 bg-black/40 p-4 rounded-xl border border-primary/30">
                          <p className="text-sm text-muted-foreground">Scan to Pay: <span className="text-primary font-bold">₹{eventFee}</span></p>
                          <div className="w-48 h-48 bg-white p-2 rounded-lg">
                            <img src="/QR.jpeg" alt="Payment QR Code" className="w-full h-full object-contain" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="transactionId" className="text-sm text-muted-foreground flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            Transaction ID
                          </Label>
                          <Input
                            id="transactionId"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter UPI/Bank Transaction ID"
                            className="bg-background/50 border-border focus:border-primary"
                          />
                          <p className="text-xs text-muted-foreground">Required for registration confirmation.</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <NeonButton
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Registering...' : isTeamEvent ? 'Register Team' : 'Submit Registration'}
                      </NeonButton>
                    </div>
                  </form>

                  {/* Bottom glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventRegistrationModal;
