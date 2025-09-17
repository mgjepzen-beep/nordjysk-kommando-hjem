import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle } from "lucide-react";

interface SecurityAlertProps {
  type: 'info' | 'warning';
  title: string;
  description: string;
  className?: string;
}

export const SecurityAlert = ({ type, title, description, className }: SecurityAlertProps) => {
  const Icon = type === 'warning' ? AlertTriangle : Shield;
  
  return (
    <Alert className={`border-2 ${type === 'warning' ? 'border-yellow-500' : 'border-blue-500'} ${className}`}>
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default SecurityAlert;