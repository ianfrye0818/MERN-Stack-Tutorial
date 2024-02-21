import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from './button';
export default function WorkoutCard() {
  return (
    <Card className='w-[350px] mx-auto'>
      <CardHeader>
        <CardTitle>Workout One</CardTitle>
        <CardDescription>This was a Great workout!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Reps</p>
            <p>15</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Sets</p>
            <p>15</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Weight</p>
            <p>15</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Rest</p>
            <p>15</p>
          </div>
          <div className='flex flex-col border border-gray-300 p-2'>
            <p>Date</p>
            <p>Feb 21, 2024</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button className='bg-red-600 hover:bg-red-700 p-2 rounded-md text-white'>Delete</Button>
      </CardFooter>
    </Card>
  );
}
