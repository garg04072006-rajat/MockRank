import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, LogOut, User, X, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SettingsDialog from "@/components/SettingsDialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await signOut();
      // Force navigation to home page after sign out
      navigate("/", { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate(user ? "/?home=true" : "/")}
          >
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">MockRank</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth scroll-smooth">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth scroll-smooth">
              Pricing
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:inline-flex">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <SettingsDialog>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Settings className="h-5 w-5" />
              </Button>
            </SettingsDialog>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden md:inline-flex">
                    <User className="h-4 w-4 mr-2" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="hidden md:inline-flex" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button className="gradient-primary text-white border-0 hover:shadow-glow transition-smooth" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
              </>
            )}
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Header Logo in Mobile Menu */}
                  <div 
                    className="flex items-center space-x-2 px-2 cursor-pointer" 
                    onClick={() => handleNavigation(user ? "/?home=true" : "/")}
                  >
                    <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <span className="text-xl font-bold text-foreground">MockRank</span>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    <SheetClose asChild>
                      <a 
                        href="#features" 
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-smooth px-2 py-2 hover:bg-accent rounded-md"
                      >
                        Features
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a 
                        href="#pricing" 
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-smooth px-2 py-2 hover:bg-accent rounded-md"
                      >
                        Pricing
                      </a>
                    </SheetClose>
                  </div>

                  {/* Theme Toggle & Settings */}
                  <div className="px-2 space-y-2">
                    <Button 
                      variant="ghost" 
                      onClick={toggleTheme} 
                      className="w-full justify-start text-lg font-medium"
                    >
                      {theme === "dark" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                    
                    <SettingsDialog>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-lg font-medium"
                      >
                        <Settings className="h-5 w-5 mr-2" />
                        Settings
                      </Button>
                    </SettingsDialog>
                  </div>

                  {/* User Actions */}
                  {user ? (
                    <div className="flex flex-col space-y-2 px-2">
                      <div className="flex items-center space-x-2 px-2 py-2 bg-accent/10 rounded-md">
                        <User className="h-4 w-4" />
                        <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={handleSignOut} 
                        className="w-full justify-start text-lg font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3 px-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleNavigation('/login')} 
                        className="w-full justify-start text-lg font-medium"
                      >
                        Sign In
                      </Button>
                      <Button 
                        className="gradient-primary text-white border-0 hover:shadow-glow transition-smooth w-full" 
                        onClick={() => handleNavigation('/login')}
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;