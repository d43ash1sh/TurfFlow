import type { TimeSlot } from '../data/mockData';

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 6; hour <= 22; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    slots.push({
      time: `${formattedHour}:00`,
      status: 'available',
    });
  }
  return slots;
};

export const getEndTime = (startTime: string, duration: number): string => {
  const hour = parseInt(startTime.split(':')[0]);
  const endHour = hour + duration;
  return `${endHour.toString().padStart(2, '0')}:00`;
};

export const isRangeAvailable = (
  slots: TimeSlot[],
  startIndex: number,
  duration: number
): boolean => {
  return slots
    .slice(startIndex, startIndex + duration)
    .every(slot => slot.status === 'available');
};
