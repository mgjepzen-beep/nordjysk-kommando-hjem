import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const UserMenu = () => {
  // Since auth is removed, this component now just shows a disabled state
  // or can be removed entirely if not needed
  return (
    <Button variant="outline" size="sm" disabled>
      <User className="mr-2 h-4 w-4" />
      Ikke tilgængelig
    </Button>
  );
};

export default UserMenu;