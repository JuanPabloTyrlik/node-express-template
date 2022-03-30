import { connect } from 'mongoose';

export const setupDatabase = async () => {
  console.log(`Connecting to ${process.env.MONGO_URI}`);
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await connect(process.env.MONGO_URI!);
    console.log('Connection to DB successful');
  } catch (error) {
    console.log('Connection to DB failed');
    console.log(error);
  }
};
