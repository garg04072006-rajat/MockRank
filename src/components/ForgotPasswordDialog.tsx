import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mocked backend logic for demo
  const handleSendOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setTimeout(() => {
      if (otp === "123456") {
        setStep("reset");
        setError("");
      } else {
        setError("Invalid OTP. Try 123456 for demo.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setTimeout(() => {
      setStep("done");
      setLoading(false);
      onPasswordReset();
    }, 1000);
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
            <Input id="fp-newpass" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required autoFocus />
            <Button className="w-full" onClick={handleResetPassword} disabled={loading || !newPassword}>
              {loading ? "Saving..." : "Change Password"}
            </Button>
          </div>
        )}
        {step === "done" && (
          <div className="text-center text-green-600 font-medium py-4">Password changed! You can now log in.</div>
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
