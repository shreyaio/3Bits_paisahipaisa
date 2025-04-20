import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheck, AlertCircle } from "lucide-react";
import { VerificationStatus } from "@/types/user";

interface VerificationBadgeProps {
  className?: string;
  verified?: boolean; // Add the 'verified' prop
  status: VerificationStatus; // Add the 'status' prop
  showLabel?: boolean; // Add the 'showLabel' prop
}

const VerificationBadge = ({ status, showLabel = false, className = "" }: VerificationBadgeProps) => {
  let color: string;
  let icon: JSX.Element;
  let label: string;
  let description: string;

  switch (status) {
    case "verified":
      color = "bg-green-500";
      icon = <CircleCheck className="h-3 w-3" />;
      label = "Verified";
      description = "This user has verified their identity with a government ID.";
      break;
    case "basic":
      color = "bg-amber-500";
      icon = <AlertCircle className="h-3 w-3" />;
      label = "Basic";
      description = "This user has verified their email but not their identity.";
      break;
    default:
      color = "bg-gray-400";
      icon = <AlertCircle className="h-3 w-3" />;
      label = "Unverified";
      description = "This user has not completed any verification steps.";
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className={`${color} text-white ${className}`}>
            {icon}
            {showLabel && <span className="ml-1">{label}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
