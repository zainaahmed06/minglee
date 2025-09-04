/**
 * Format a date string to a chat-friendly time display
 * @param dateString - ISO date string
 * @returns Formatted time string (e.g., "10:45 AM", "Yesterday", "Monday")
 */
export const formatChatTime = (dateString: string): string => {
  const messageDate = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - messageDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  // If message is from today, show time
  if (diffInDays === 0) {
    return messageDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // If message is from yesterday
  if (diffInDays === 1) {
    return "Yesterday";
  }

  // If message is from this week (within 7 days)
  if (diffInDays < 7) {
    return messageDate.toLocaleDateString("en-US", {weekday: "long"});
  }

  // If message is older, show date
  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

/**
 * Get display name from a profile
 * @param profile - User profile object
 * @returns Display name string
 */
export const getDisplayName = (profile: any): string => {
  if (profile.first_name && profile.last_name) {
    return `${profile.first_name} ${profile.last_name}`;
  }
  if (profile.first_name) {
    return profile.first_name;
  }
  if (profile.email) {
    return profile.email.split("@")[0]; // Use email username as fallback
  }
  return "Unknown User";
};

/**
 * Get profile image URL with fallback
 * @param profile - User profile object
 * @returns Image URL string
 */
export const getProfileImageUrl = (profile: any): string => {
  return (
    profile.profile_image_url ||
    "https://randomuser.me/api/portraits/lego/1.jpg"
  );
};

/**
 * Calculate age from birth date
 * @param birthDate - Birth date string (YYYY-MM-DD)
 * @returns Age number
 */
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Calculate distance display text
 * @param distance - Distance in kilometers
 * @returns Formatted distance string
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return "< 1 km away";
  }
  return `${Math.round(distance)} km away`;
};
