import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
}

export default function ForgotPasswordDialog({ open, onOpenChange, onPasswordReset }: ForgotPasswordDialogProps) {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Real backend integration
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      console.log('Sending OTP to:', email);
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setStep("otp");
    } catch (err: any) {
      console.error('OTP Send Error:', err);
      setError(err.message || "Failed to send OTP. Please check if backend server is running.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      setStep("reset");
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    try {
      console.log('Resetting password for:', email);
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });
      console.log('Reset password response status:', res.status);
      const data = await res.json();
      console.log('Reset password response data:', data);
      
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setStep("done");
      
      // Auto close dialog after 3 seconds and reset form
      setTimeout(() => {
        onPasswordReset();
        onOpenChange(false);
        // Reset form state
        setStep("email");
        setEmail("");
        setOtp("");
        setNewPassword("");
        setError("");
      }, 3000);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || "Failed to reset password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            {step === "email" && "Enter your registered email to receive an OTP."}
            {step === "otp" && "Enter the OTP sent to your email."}
            {step === "reset" && "Set your new password."}
            {step === "done" && "Your password has been changed successfully!"}
          </DialogDescription>
        </DialogHeader>
        {step === "email" && (
          <div className="space-y-4">
            <Label htmlFor="fp-email">Email</Label>
            <Input id="fp-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
            {error && <div className="text-destructive text-sm">{error}</div>}
            <Button className="w-full" onClick={handleSendOtp} disabled={loading || !email}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        )}
        {step === "otp" && (
          <div className="space-y-4">
            <Label htmlFor="fp-otp">OTP</Label>
            <Input id="fp-otp" type="text" value={otp} onChange={e => setOtp(e.target.value)} required autoFocus maxLength={6} />
            {error && <div className="text-destructive text-xs">{error}</div>}
            <Button className="w-full" onClick={handleVerifyOtp} disabled={loading || !otp}>
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        )}
        {step === "reset" && (
          <div className="space-y-4">
            <Label htmlFor="fp-newpass">New Password</Label>
            <div className="relative">
              <Input
                id="fp-newpass"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-muted-foreground"
                tabIndex={-1}
                onClick={() => setShowNewPassword((v) => !v)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <div className="text-destructive text-xs">{error}</div>}
            <Button className="w-full" onClick={handleResetPassword} disabled={loading || !newPassword}>
              {loading ? "Saving..." : "Change Password"}
            </Button>
          </div>
        )}
        {step === "done" && (
          <div className="text-center py-6 space-y-3">
            <div className="text-green-600 font-medium text-lg">✅ Password Changed Successfully!</div>
            <div className="text-muted-foreground text-sm">
              You can now log in with your new password.
            </div>
            <div className="text-muted-foreground text-xs">
              Dialog will close automatically in 3 seconds...
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
