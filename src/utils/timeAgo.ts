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