export class Utils {
   public isToday(date: Date): boolean {
      const currentDate = new Date();
      return (
         date.getDate() === currentDate.getDate() &&
         date.getMonth() === currentDate.getMonth() &&
         date.getFullYear() === currentDate.getFullYear()
      );
   }
}
