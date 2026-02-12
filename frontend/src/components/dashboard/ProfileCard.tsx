import type { User } from "../../types/auth.type";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="w-full bg-white border border-black/10 rounded-xl shadow-sm p-6">
      
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {user.name}
          </h3>
          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100"></div>

      <div className="mt-4 text-xs text-gray-400 uppercase tracking-wide">
        Account Overview
      </div>
    </div>
  );
};

export default ProfileCard;
