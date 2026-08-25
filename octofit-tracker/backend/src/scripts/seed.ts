import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/resources';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    console.log('Seed the octofit_db database with test data');
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
        totalPoints: 860
      },
      {
        username: 'jon-bell',
        email: 'jon.bell@example.com',
        displayName: 'Jon Bell',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        totalPoints: 720
      },
      {
        username: 'priya-shah',
        email: 'priya.shah@example.com',
        displayName: 'Priya Shah',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
        totalPoints: 640
      }
    ]);

    await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on consistent outdoor miles.',
        members: [users[0]._id, users[1]._id],
        totalPoints: 1580
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility sessions for a balanced routine.',
        members: [users[2]._id],
        totalPoints: 640
      }
    ]);

    const completedAt = new Date('2026-08-24T07:30:00.000Z');
    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        distanceKilometers: 6.4,
        points: 320,
        completedAt
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 55,
        distanceKilometers: 18.2,
        points: 280,
        completedAt: new Date('2026-08-23T16:00:00.000Z')
      },
      {
        user: users[2]._id,
        type: 'Strength',
        durationMinutes: 35,
        points: 210,
        completedAt: new Date('2026-08-22T18:15:00.000Z')
      }
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, rank: 1, points: 860, activitiesCompleted: 8, weekStarting: new Date('2026-08-24') },
      { user: users[1]._id, rank: 2, points: 720, activitiesCompleted: 6, weekStarting: new Date('2026-08-24') },
      { user: users[2]._id, rank: 3, points: 640, activitiesCompleted: 5, weekStarting: new Date('2026-08-24') }
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        category: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: [
          { name: 'Easy warm-up', sets: 1, reps: 5 },
          { name: 'Tempo intervals', sets: 4, reps: 3 },
          { name: 'Cool-down', sets: 1, reps: 5 }
        ]
      },
      {
        title: 'Full Body Foundation',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, reps: 30 }
        ]
      }
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 2 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
