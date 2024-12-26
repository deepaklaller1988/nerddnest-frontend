export const timeAgo = (date: any): string => {
    const now: number = new Date().getTime(); 
    const timeDifference: number = now - new Date(date).getTime(); 
    const seconds: number = Math.floor(timeDifference / 1000);
    const minutes: number = Math.floor(seconds / 60);
    const hours: number = Math.floor(minutes / 60);
    const days: number = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return 'Just updated now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  export const DateFormatter = ( date:any) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    return formattedDate
  }

  export const  logLocalTime=(time:any) =>{
    const date = new Date(time);
    const options:any = { hour: 'numeric', minute: 'numeric', hour12: true };
    const localTime = date.toLocaleString('en-US', options);

   return localTime
}


export const formatDate=(date: string)=> {
  const parsedDate = new Date(date);
  const now = new Date();

  // Check if the date is today
  const isToday = parsedDate.toDateString() === now.toDateString();

  // Check if the date is yesterday
  const isYesterday =
    parsedDate.getDate() === now.getDate() - 1 &&
    parsedDate.getMonth() === now.getMonth() &&
    parsedDate.getFullYear() === now.getFullYear();

  // Check if the date is older than a week
  const daysDifference = Math.floor((now.getTime() - parsedDate.getTime()) / (1000 * 3600 * 24));
  const isOlderThanWeek = daysDifference > 7;

  if (isToday) {
    return "Today";
  }

  if (isYesterday) {
    return "Yesterday";
  }

  if (isOlderThanWeek) {
    return parsedDate.toISOString().split('T')[0]; // Return YYYY-MM-DD
  }

  // Default format for dates within the last week (e.g., Dec 26, 2024)
  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}

export const formatTime=(date: string)=> {
  const parsedDate = new Date(date);

  let hours = parsedDate.getHours();
  let minutes :any= parsedDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; 
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes; 

  return `${hours}:${minutes} ${ampm}`;
}

