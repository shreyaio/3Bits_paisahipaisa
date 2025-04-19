
import { Progress } from "@/components/ui/progress";

interface ProfileCompletionProps {
  percentage: number;
}

const ProfileCompletion = ({ percentage }: ProfileCompletionProps) => {
  // Determine color based on completion percentage
  const determineColor = () => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Profile Completion</h3>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" style={{ ['--theme-primary' as any]: determineColor() }} />
      {percentage < 100 && (
        <p className="text-xs text-gray-500">
          Complete your profile to increase trust and get more bookings.
        </p>
      )}
    </div>
  );
};

export default ProfileCompletion;
