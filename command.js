import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];


const rest = new REST({ version: '10' }).setToken("MTUxMjQxNzI5Mzg0ODU0MzQwNQ.GJm1gT.R98ezDMPbF6dfqByrbcDu7eJR5YJCHIzRmnvK0");

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1512417293848543405"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

