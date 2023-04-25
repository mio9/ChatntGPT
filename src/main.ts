import { Client, Events, GatewayIntentBits} from 'discord.js'
import { commandMap } from 'commands'
import * as dotenv from 'dotenv'
const env = dotenv.config().parsed


const client = new Client({intents:[GatewayIntentBits.Guilds]})



client.once(Events.ClientReady, (client)=>{
  console.log(`yep client is up, i am ${client.user.tag}`)
})

client.on(Events.InteractionCreate, (interaction)=>{
  if (!interaction.isCommand()) return
  // commandMap.get(interaction.commandName)
  console.log(interaction.commandName)
})

client.login(env.TOKEN)