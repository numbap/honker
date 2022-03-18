import { Command } from 'commander'
import {updateChannel} from './utils/channelUpdate.js'
import connectDB from './db/connect.js'
import dotenv from 'dotenv'

dotenv.config()
const program = new Command();



let start = async () => {

    program
    .option('--first')
    .option('-s, --separator <char>');

    program.parse();
    const options = program.opts();

    try{
        await connectDB(process.env.MONGO_URL)
        console.log(program.args[0]);
        await updateChannel(program.args[0], 'admin', true)
    }catch(error){
        console.log(error)
    }
}






start()
