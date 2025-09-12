import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { 
  Settings, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  Volume2,
  Shield,
  HelpCircle
} from "lucide-react";

interface SettingsDialogProps {
  children?: React.ReactNode;
}

const SettingsDialog = ({ children }: SettingsDialogProps) => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </DialogTitle>
          <DialogDescription>
            Customize your MockRank experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Monitor className="h-4 w-4" />
              <span>Appearance</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="flex items-center space-x-1"
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="flex items-center space-x-1"
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="flex items-center space-x-1"
              >
                <Monitor className="h-4 w-4" />
                <span>Auto</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Notifications Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="text-sm">
                  Push notifications
                </Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sounds" className="text-sm">
                  Sound effects
                </Label>
                <Switch
                  id="sounds"
                  checked={sounds}
                  onCheckedChange={setSounds}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </h4>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics" className="text-sm">
                Performance analytics
              </Label>
              <Switch
                id="analytics"
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </div>
          </div>

          <Separator />

          {/* Help Section */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Feedback
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;