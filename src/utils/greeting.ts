/**
 * Utility to get a time-based greeting.
 * Time Logic:
 * - 5 AM–11:59 AM → Good Morning 👋
 * - 12 PM–4:59 PM → Good Afternoon 👋
 * - 5 PM–8:59 PM → Good Evening 👋
 * - 9 PM–4:59 AM → Good Night 🌙
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good Morning! 👋';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon! 👋';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening! 👋';
  } else {
    return 'Good Night! 🌙';
  }
};
